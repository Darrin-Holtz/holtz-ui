import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import prisma from "@/lib/db";
import { ProductCard } from "../components/ProductCard";
import { unstable_noStore as noStore } from "next/cache";
import Link from "next/link";
import { ProductActions } from "../components/form/ProductActions";

async function getData(userId: string) {
  const data = await prisma.product.findMany({
    where: {
      userId: userId,
    },
    select: {
      name: true,
      images: true,
      price: true,
      smallDescription: true,
      id: true,
      isActive: true,
      _count: { select: { Purchase: true } },
    },
    orderBy: { createdAt: "desc" },
  });

  return data;
}

export default async function MyProductsRoute() {
  noStore();
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  if (!user) {
    throw new Error("Unauthorized");
  }

  const data = await getData(user.id);
  return (
    <section className="w-full max-w-7xl mx-auto px-4 md:px-8">
      <h1 className="text-2xl font-bold">My Products</h1>
      {data.length === 0 ? (
        <p className="mt-8 text-muted-foreground">You haven&apos;t listed any products yet.</p>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 sm:grid-cols-2 mt-4">
          {data.map((item) => (
            <div key={item.id} className="flex flex-col gap-2">
              <div className="relative">
                <ProductCard
                  id={item.id}
                  images={item.images}
                  name={item.name}
                  price={item.price.toNumber()}
                  smallDescription={item.smallDescription}
                />
                {!item.isActive && (
                  <div className="absolute inset-0 bg-background/60 rounded-xl flex items-center justify-center">
                    <span className="text-xs font-medium bg-muted px-2 py-1 rounded">Archived</span>
                  </div>
                )}
              </div>
              <Link
                href={`/product/${item.id}/edit`}
                className="w-full text-center text-sm border rounded-lg px-4 py-2 hover:bg-neutral-50 transition-colors"
              >
                Edit Product
              </Link>
              <ProductActions
                productId={item.id}
                isActive={item.isActive}
                hasPurchases={item._count.Purchase > 0}
              />
            </div>
          ))}
        </div>
      )}
    </section>
  );
}