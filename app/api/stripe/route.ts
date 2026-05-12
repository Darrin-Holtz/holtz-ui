import ProductEmail from "@/app/components/ProductEmail";
import prisma from "@/lib/db";
import { stripe } from "@/lib/stripe";
import { headers } from "next/headers";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  const body = await req.text();

  const signature = (await headers()).get("Stripe-Signature");
  const webhookSecret =
    process.env.STRIPE_SECRET_WEBHOOK ?? process.env.STRIPE_WEBHOOK_SECRET;

  if (!signature) {
    console.error("Stripe webhook missing Stripe-Signature header");
    return new Response("missing stripe signature", { status: 400 });
  }

  if (!webhookSecret) {
    console.error("Stripe webhook secret is not configured");
    return new Response("webhook secret not configured", { status: 500 });
  }

  let event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      webhookSecret
    );
  } catch (error: unknown) {
    console.error("Stripe webhook verification failed", error);
    return new Response("webhook verification failed", { status: 400 });
  }

  switch (event.type) {
    case "checkout.session.completed": {
      const session = event.data.object;

      if (session.payment_status !== "paid") {
        console.error("Checkout session completed without paid status", {
          id: session.id,
          payment_status: session.payment_status,
        });
        return new Response("session not paid", { status: 400 });
      }

      const productId = session.metadata?.productId;
      const buyerId = session.metadata?.buyerId;
      const email = session.customer_details?.email ?? session.customer_email;

      if (!productId || !buyerId) {
        console.error("Stripe webhook missing productId or buyerId metadata");
        return new Response("invalid checkout metadata", { status: 400 });
      }

      if (!email) {
        console.error("Stripe webhook missing buyer email");
        return new Response("missing buyer email", { status: 400 });
      }

      const purchase = await prisma.purchase.upsert({
        where: {
          stripeSessionId: session.id,
        },
        create: {
          stripeSessionId: session.id,
          buyerId,
          productId,
          amount: session.amount_total ?? 0,
          currency: session.currency ?? "usd",
        },
        update: {},
      });

      const { error } = await resend.emails.send({
        from: "HoltzDigitalUI <onboarding@resend.dev>",
        to: [email],
        subject: "Your Product from HoltzDigitalUI",
        react: ProductEmail(),
        text: `Hi Friend,\n\nThank you for buying your product at HoltzDigitalUI!\n\nYour purchase is ready to download. Click your avatar in the top-right corner of HoltzDigitalUI and select My Purchases from the dropdown menu.\n\nBest,\nHoltzDigitalUI Team`,
      });

      if (error) {
        console.error("Failed sending product email — purchaseId:", purchase.id, error);
      } else {
        await prisma.purchase.update({
          where: { id: purchase.id },
          data: { emailSent: true },
        });
      }

      break;
    }
    default: {
      console.log("unhandled event");
    }
  }

  return new Response(null, { status: 200 });
}