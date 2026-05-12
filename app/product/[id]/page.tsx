import { ProductDescription } from "@/app/components/ProductDescription";
import { ProductAutoCheckout } from "@/app/components/ProductAutoCheckout";
import { ProductPurchaseToast } from "@/app/components/ProductPurchaseToast";
import { BuyButton } from "@/app/components/SubmitButtons";
import prisma from "@/lib/db";
import { Button } from "@/components/ui/button";
import { unstable_noStore as noStore } from "next/cache";
import { notFound } from "next/navigation";
import Image from "next/image";
import type { Metadata } from "next";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { JSONContent } from "@tiptap/react";
import { BuyProduct } from "@/app/actions";
import { repairDescription } from "@/lib/repairDescription";

const APP_URL = "https://holtzdigitalui.com";

async function getData(id: string) {
  const data = await prisma.product.findUnique({
    where: {
      id: id,
      isActive: true,
    },
    select: {
      Category: true,
      description: true,
      smallDescription: true,
      name: true,
      images: true,
      price: true,
      createdAt: true,
      updatedAt: true,
      id: true,
      version: true,
      _count: { select: { Purchase: true } },
      User: {
        select: {
          profileImage: true,
          firstName: true,
          lastName: true,
        },
      },
    },
  });
  return data;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const data = await getData(id);
  if (!data) return {};

  const productUrl = `${APP_URL}/product/${id}`;
  const image = data.images[0] as string | undefined;

  return {
    title: data.name,
    description: data.smallDescription,
    alternates: { canonical: productUrl },
    openGraph: {
      type: "website",
      url: productUrl,
      title: data.name,
      description: data.smallDescription,
      images: image ? [{ url: image, width: 1200, height: 630, alt: data.name }] : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title: data.name,
      description: data.smallDescription,
      images: image ? [image] : undefined,
    },
  };
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  noStore();
  const { id } = await params;

  if (!id) {
    notFound();
  }

  const data = await getData(id);

  if (!data) {
    notFound();
  }

  const productJsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: data.name,
    description: data.smallDescription,
    image: data.images as string[],
    url: `${APP_URL}/product/${id}`,
    offers: {
      "@type": "Offer",
      price: data.price.toNumber().toFixed(2),
      priceCurrency: "USD",
      availability: "https://schema.org/InStock",
      seller: {
        "@type": "Organization",
        name: "HoltzDigitalUI",
      },
    },
    ...(data.User && {
      brand: {
        "@type": "Person",
        name: `${data.User.firstName} ${data.User.lastName ?? ""}`.trim(),
      },
    }),
  };

  return (
    <section className="mx-auto px-4 lg:mt-10 w-full max-w-7xl lg:px-8 lg:grid lg:grid-rows-1 lg:grid-cols-7 lg:gap-x-8 lg:gap-y-10 xl:gap-x-16">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productJsonLd) }}
      />
      <ProductPurchaseToast />
      <ProductAutoCheckout formId="product-buy-form" />
      <Carousel className=" lg:row-end-1 lg:col-span-4">
        <CarouselContent>
          {data?.images.map((item, index) => (
            <CarouselItem key={index}>
              <div className="aspect-w-4 aspect-h-3 rounded-lg bg-gray-100 overflow-hidden">
                <Image
                  src={item as string}
                  alt={`${data.name} screenshot ${index + 1}`}
                  fill
                  sizes="(max-width: 1024px) 100vw, 57vw"
                  priority={index === 0}
                  className="object-cover w-full h-full rounded-lg"
                />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="ml-16" />
        <CarouselNext className="mr-16" />
      </Carousel>

      <div className="w-full max-w-2xl mx-auto mt-5 lg:max-w-none lg:mt-0 lg:row-end-2 lg:row-span-2 lg:col-span-3">
        <h1 className="text-2xl font-extrabold tracking-tight text-gray-900 sm:text-3xl">
          {data?.name}
        </h1>

        <p className="mt-2 text-muted-foreground">{data?.smallDescription}</p>
        <form id="product-buy-form" action={BuyProduct}>
          <input type="hidden" name="id" value={data?.id} />
          <BuyButton price={data?.price.toString()} />
        </form>

        <div className="border-t border-gray-200 mt-10 pt-10">
          <div className="grid grid-cols-2 w-full gap-y-3">
            <h3 className="text-sm font-medium text-muted-foreground col-span-1">
              Released:
            </h3>
            <h3 className="text-sm font-medium col-span-1">
              {new Intl.DateTimeFormat("en-US", {
                dateStyle: "long",
              }).format(data?.createdAt)}
            </h3>

            {data.version > 1 && (
              <>
                <h3 className="text-sm font-medium text-muted-foreground col-span-1">
                  Updated:
                </h3>
                <h3 className="text-sm font-medium col-span-1">
                  {new Intl.DateTimeFormat("en-US", {
                    dateStyle: "long",
                  }).format(data.updatedAt)}
                </h3>
              </>
            )}

            <h3 className="text-sm font-medium text-muted-foreground col-span-1">
              Version:
            </h3>
            <h3 className="text-sm font-medium col-span-1">
              v{data?.version}
            </h3>

            <h3 className="text-sm font-medium text-muted-foreground col-span-1">
              Category:
            </h3>

            <h3 className="text-sm font-medium col-span-1">{data.Category}</h3>

            <h3 className="text-sm font-medium text-muted-foreground col-span-1">
              Sold:
            </h3>
            <h3 className="text-sm font-medium col-span-1">
              {data._count.Purchase} {data._count.Purchase === 1 ? "copy" : "copies"}
            </h3>
          </div>
        </div>

        {data.User && (
          <div className="border-t border-gray-200 mt-10 pt-10">
            <h3 className="text-sm font-medium text-muted-foreground mb-3">Seller</h3>
            <div className="flex items-center gap-3">
              <Image
                src={data.User.profileImage}
                alt={data.User.firstName}
                width={40}
                height={40}
                className="rounded-full object-cover"
              />
              <span className="text-sm font-medium">
                {data.User.firstName} {data.User.lastName}
              </span>
            </div>
          </div>
        )}

        <div className="border-t border-gray-200 mt-10"></div>
      </div>

      <div className="w-full max-w-2xl mx-auto mt-16 lg:max-w-none lg:mt-0 lg:col-span-4">
        <ProductDescription content={repairDescription(data?.description) as JSONContent} />
      </div>
    </section>
  );
}