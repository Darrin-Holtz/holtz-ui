import { ProductCard } from "@/app/components/ProductCard";
import prisma from "@/lib/db";
import { CategoryTypes } from "@/lib/generated/prisma/enums";
import { notFound } from "next/navigation";
import { unstable_noStore as noStore } from "next/cache";

async function getData(category: string) {
  let input: (typeof CategoryTypes)[keyof typeof CategoryTypes] | undefined;

  switch (category) {
    case "templates": {
      input = CategoryTypes.templates;
      break;
    }
    case "uikits": {
      input = CategoryTypes.uikits;
      break;
    }
    case "icons": {
      input = CategoryTypes.icons;
      break;
    }
    case "all": {
      input = undefined;
      break;
    }
    default: {
      return notFound();
    }
  }

  const data = await prisma.product.findMany({
    where: input ? { Category: input } : {},
    select: {
      id: true,
      images: true,
      smallDescription: true,
      name: true,
      price: true,
    },
  });

  return data;
}

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ category: string }>;
}) {
  noStore();
  const { category } = await params;
  const data = await getData(category);
  return (
    <section className="w-full max-w-7xl mx-auto px-4 md:px-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 sm:grid-cols-2 gap-10 mt-4">
        {data.map((product) => (
          <ProductCard
            key={product.id}
            images={product.images}
            price={product.price.toNumber()}
            name={product.name}
            id={product.id}
            smallDescription={product.smallDescription}
          />
        ))}
      </div>
    </section>
  );
}