import { ProductCard } from "@/app/components/ProductCard";
import prisma from "@/lib/db";
import { CategoryTypes } from "@/lib/generated/prisma/enums";
import { notFound } from "next/navigation";
import { unstable_noStore as noStore } from "next/cache";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import type { Metadata } from "next";

const ITEMS_PER_PAGE = 12;
const APP_URL = "https://holtzdigitalui.com";

const CATEGORY_META: Record<string, { label: string; description: string }> = {
  templates: {
    label: "Tailwind CSS Templates",
    description:
      "Browse premium Tailwind CSS website templates. Ready-to-use, fully responsive designs for your next project.",
  },
  uikits: {
    label: "Tailwind UI Kits",
    description:
      "Explore Tailwind CSS UI kits packed with components, layouts, and design systems to accelerate your workflow.",
  },
  icons: {
    label: "Tailwind Icon Sets",
    description:
      "Find beautiful icon sets optimized for Tailwind CSS projects. SVG, JSX, and more formats available.",
  },
  all: {
    label: "All Products",
    description:
      "Browse all Tailwind CSS templates, UI kits, and icon sets on HoltzDigitalUI.",
  },
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ category: string }>;
}): Promise<Metadata> {
  const { category } = await params;
  const meta = CATEGORY_META[category];
  if (!meta) return {};

  const url = `${APP_URL}/products/${category}`;
  return {
    title: meta.label,
    description: meta.description,
    alternates: { canonical: url },
    openGraph: { url, title: meta.label, description: meta.description },
  };
}

function getCategoryInput(category: string) {
  switch (category) {
    case "templates": return CategoryTypes.templates;
    case "uikits":    return CategoryTypes.uikits;
    case "icons":     return CategoryTypes.icons;
    case "all":       return undefined;
    default:          return null;
  }
}

async function getData(category: string, page: number) {
  const input = getCategoryInput(category);
  if (input === null) return notFound();

  const where = {
    isActive: true,
    ...(input ? { Category: input } : {}),
  };

  const [data, total] = await prisma.$transaction([
    prisma.product.findMany({
      where,
      select: { id: true, images: true, smallDescription: true, name: true, price: true },
      orderBy: { createdAt: "desc" },
      skip: (page - 1) * ITEMS_PER_PAGE,
      take: ITEMS_PER_PAGE,
    }),
    prisma.product.count({ where }),
  ]);

  return { data, total };
}

export default async function CategoryPage({
  params,
  searchParams,
}: {
  params: Promise<{ category: string }>;
  searchParams: Promise<{ page?: string }>;
}) {
  noStore();
  const { category } = await params;
  const { page: pageParam } = await searchParams;
  const page = Math.max(1, parseInt(pageParam ?? "1", 10) || 1);

  const result = await getData(category, page);
  const { data, total } = result as { data: typeof result extends null ? never : Awaited<ReturnType<typeof getData>> extends null ? never : NonNullable<Awaited<ReturnType<typeof getData>>>["data"]; total: number };
  const totalPages = Math.ceil(total / ITEMS_PER_PAGE);

  return (
    <section className="w-full max-w-7xl mx-auto px-4 md:px-8">
      {data.length === 0 ? (
        <div className="text-center py-20 text-muted-foreground">
          <p className="text-lg">No products found in this category.</p>
          <Link href="/products/all" className="mt-4 inline-block text-sm underline underline-offset-4">
            Browse all products
          </Link>
        </div>
      ) : (
        <>
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

          {totalPages > 1 && (
            <div className="flex items-center justify-center gap-2 mt-12">
              <Button variant="outline" size="sm" asChild disabled={page <= 1}>
                <Link href={`/products/${category}?page=${page - 1}`}>Previous</Link>
              </Button>
              <span className="text-sm text-muted-foreground">
                Page {page} of {totalPages}
              </span>
              <Button variant="outline" size="sm" asChild disabled={page >= totalPages}>
                <Link href={`/products/${category}?page=${page + 1}`}>Next</Link>
              </Button>
            </div>
          )}
        </>
      )}
    </section>
  );
}