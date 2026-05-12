import prisma from "@/lib/db";
import { ProductCard } from "@/app/components/ProductCard";
import { unstable_noStore as noStore } from "next/cache";
import { Search } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Search Products",
  robots: { index: false, follow: false },
};

async function getData(q: string) {
  if (!q.trim()) return [];

  return prisma.product.findMany({
    where: {
      isActive: true,
      OR: [
        { name: { contains: q, mode: "insensitive" } },
        { smallDescription: { contains: q, mode: "insensitive" } },
      ],
    },
    select: { id: true, images: true, name: true, price: true, smallDescription: true },
    orderBy: { createdAt: "desc" },
    take: 48,
  });
}

export default async function SearchPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  noStore();
  const { q = "" } = await searchParams;
  const results = await getData(q);

  return (
    <section className="w-full max-w-7xl mx-auto px-4 md:px-8">
      <form action="/search" method="GET" className="flex items-center border rounded-xl px-4 py-2 gap-2 max-w-lg">
        <Search className="w-4 h-4 text-muted-foreground shrink-0" />
        <input
          name="q"
          type="search"
          defaultValue={q}
          placeholder="Search products..."
          autoFocus
          className="flex-1 bg-transparent outline-none text-sm"
        />
        <button type="submit" className="text-sm font-medium">Search</button>
      </form>

      {q ? (
        <p className="mt-4 text-sm text-muted-foreground">
          {results.length} result{results.length !== 1 ? "s" : ""} for &ldquo;{q}&rdquo;
        </p>
      ) : (
        <p className="mt-4 text-sm text-muted-foreground">Enter a term above to search products.</p>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 sm:grid-cols-2 gap-10 mt-6">
        {results.map((product) => (
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
