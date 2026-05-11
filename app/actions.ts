"use server";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { z } from "zod";
import {
  getProductFormValues,
  getUpdateProductFormValues,
  productSchema,
  updateProductSchema,
  userSettingsSchema,
} from "@/lib/productSchema";
import { repairDescription } from "@/lib/repairDescription";
import { getAppUrl } from "@/lib/appUrl";
import prisma from "@/lib/db";
import { type CategoryTypes } from "@/lib/generated/prisma/enums";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { stripe } from "@/lib/stripe";

export type State = {
  status: "error" | "success" | undefined;
  errors?: {
    [key: string]: string[];
  };
  message?: string | null;
};

export async function SellProduct(prevState: State | undefined, formData: FormData) {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  if (!user) {
    throw new Error("Something went wrong");
  }

  const validateFields = productSchema.safeParse(getProductFormValues(formData));

  if (!validateFields.success) {
    const state: State = {
      status: "error",
      errors: z.flattenError(validateFields.error).fieldErrors,
      message: "Oops, I think there is a mistake with your inputs.",
    };

    return state;
  }

  const data = await prisma.product.create({
    data: {
      name: validateFields.data.name,
      Category: validateFields.data.category as CategoryTypes,
      smallDescription: validateFields.data.smallDescription,
      price: validateFields.data.price,
      images: validateFields.data.images,
      productFile: validateFields.data.productFile,
      userId: user.id,
      description: JSON.parse(validateFields.data.description),
    },
  });

  return redirect(`/product/${data.id}`);
  
}

export async function UpdateUserSettings(prevState: any, formData: FormData) {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  if (!user) {
    throw new Error("something went wrong");
  }

  const validateFields = userSettingsSchema.safeParse({
    firstName: formData.get("firstName"),
    lastName: formData.get("lastName"),
  });

  if (!validateFields.success) {
    const state: State = {
      status: "error",
      errors: z.flattenError(validateFields.error).fieldErrors,
      message: "Oops, I think there is a mistake with your inputs.",
    };

    return state;
  }

  await prisma.user.update({
    where: {
      id: user.id,
    },
    data: {
      firstName: validateFields.data.firstName,
      lastName: validateFields.data.lastName,
    },
  });

  revalidatePath("/settings");

  const state: State = {
    status: "success",
    message: "Your Settings have been updated",
  };

  return state;
}

export async function BuyProduct(formData: FormData) {
  const id = formData.get("id") as string;
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  if (!user) {
    const returnTo = `/product/${id}?checkout=1`;
    redirect(`/api/auth/login?post_login_redirect_url=${encodeURIComponent(returnTo)}`);
  }

  const data = await prisma.product.findUnique({
    where: {
      id: id,
    },
    select: {
      userId: true,
      name: true,
      smallDescription: true,
      price: true,
      images: true,
      productFile: true,
      User: {
        select: {
          connectedAccountId: true,
          stripeConnectedLinked: true,
        },
      },
    },
  });

  if (!data) {
    redirect(`/product/${id}?error=product_not_found`);
  }

  if (data.userId && data.userId === user.id) {
    redirect(`/product/${id}?error=self_purchase`);
  }

  const amountInCents = Math.round(Number(data.price.toString()) * 100);
  const destinationAccountId = data.User?.connectedAccountId;
  const shouldUseConnectTransfer =
    Boolean(destinationAccountId) &&
    destinationAccountId!.startsWith("acct_") &&
    data.User?.stripeConnectedLinked === true;

  const sessionPayload: Parameters<typeof stripe.checkout.sessions.create>[0] = {
    mode: "payment",
    line_items: [
      {
        price_data: {
          currency: "usd",
          unit_amount: amountInCents,
          product_data: {
            name: data.name,
            description: data.smallDescription,
            images: data.images,
          },
        },
        quantity: 1,
      },
    ],
    metadata: {
      productId: id,
      buyerId: user.id,
    },
    customer_email: user.email ?? undefined,
    success_url: `${getAppUrl()}/payment/success`,
    cancel_url: `${getAppUrl()}/payment/cancel`,
  };

  if (shouldUseConnectTransfer) {
    sessionPayload.payment_intent_data = {
      application_fee_amount: Math.round(amountInCents * 0.1),
      transfer_data: {
        destination: destinationAccountId!,
      },
    };
  }

  const session = await stripe.checkout.sessions.create(sessionPayload);

  return redirect(session.url as string);
}

export async function CreateStripeAccountLink() {
  const { getUser } = getKindeServerSession();

  const user = await getUser();

  if (!user) {
    throw new Error();
  }

  const data = await prisma.user.findUnique({
    where: {
      id: user.id,
    },
    select: {
      connectedAccountId: true,
    },
  });

  const accountLink = await stripe.accountLinks.create({
    account: data?.connectedAccountId as string,
    refresh_url:
      process.env.NODE_ENV === "development"
        ? `https://musical-space-guacamole-jjrjxgp465w4h5vq6-3000.app.github.dev/billing`
        : `https://holtz-ui.vercel.app/billing`,
    return_url:
      process.env.NODE_ENV === "development"
        ? `https://musical-space-guacamole-jjrjxgp465w4h5vq6-3000.app.github.dev/return/${data?.connectedAccountId}`
        : `https://holtz-ui.vercel.app/return/${data?.connectedAccountId}`,
    type: "account_onboarding",
  });

  return redirect(accountLink.url);
}

export async function GetStripeDashboardLink() {
  const { getUser } = getKindeServerSession();

  const user = await getUser();

  if (!user) {
    throw new Error();
  }

  const data = await prisma.user.findUnique({
    where: {
      id: user.id,
    },
    select: {
      connectedAccountId: true,
    },
  });

  const loginLink = await stripe.accounts.createLoginLink(
    data?.connectedAccountId as string
  );

  return redirect(loginLink.url);
}

export async function UpdateProduct(prevState: State | undefined, formData: FormData) {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  if (!user) {
    throw new Error("Unauthorized");
  }

  const productId = formData.get("productId") as string;
  if (!productId) {
    return { status: "error", message: "Product ID is missing." } satisfies State;
  }

  // Confirm ownership before update.
  const existing = await prisma.product.findUnique({
    where: { id: productId },
    select: { userId: true },
  });

  if (!existing || existing.userId !== user.id) {
    return { status: "error", message: "Product not found or access denied." } satisfies State;
  }

  const validateFields = updateProductSchema.safeParse(getUpdateProductFormValues(formData));

  if (!validateFields.success) {
    return {
      status: "error",
      errors: z.flattenError(validateFields.error).fieldErrors,
      message: "Oops, I think there is a mistake with your inputs.",
    } satisfies State;
  }

  await prisma.product.update({
    where: { id: productId },
    data: {
      name: validateFields.data.name,
      Category: validateFields.data.category as CategoryTypes,
      smallDescription: validateFields.data.smallDescription,
      price: validateFields.data.price,
      images: validateFields.data.images,
      productFile: validateFields.data.productFile,
      description: repairDescription(JSON.parse(validateFields.data.description)) as object,
    },
  });

  revalidatePath(`/product/${productId}`);
  revalidatePath("/my-products");
  return redirect(`/product/${productId}`);
}