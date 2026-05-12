import prisma from "@/lib/db";
import { stripe } from "@/lib/stripe";

import { headers } from "next/headers";

export async function POST(req: Request) {
  const body = await req.text();

  const signature = (await headers()).get("Stripe-Signature") as string;

  let event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_CONNECT_WEBHOOK_SECRET as string
    );
  } catch (error: unknown) {
    return new Response("webhook error", { status: 400 });
  }

  switch (event.type) {
    case "account.updated": {
      const account = event.data.object;
      try {
        await prisma.user.update({
          where: { connectedAccountId: account.id },
          data: {
            stripeConnectedLinked: account.capabilities?.transfers === "active",
          },
        });
      } catch {
        // Account not found in our DB — ignore
      }
      break;
    }
    default: {
      console.log("unhandled event");
    }
  }

  return new Response(null, { status: 200 });
}