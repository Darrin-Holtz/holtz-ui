import ProductEmail from "@/app/components/ProductEmail";
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

      const link = session.metadata?.link;

      const { data, error } = await resend.emails.send({
        from: "HoltzUI <onboarding@resend.dev>",
        to: [`darrinholtz@gmail.com`],
        subject: "Your Product from HoltzUI",
        react: ProductEmail({
          link: link as string,
        }),
      });

      break;
    }
    default: {
      console.log("unhandled event");
    }
  }

  return new Response(null, { status: 200 });
}