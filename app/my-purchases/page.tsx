import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import prisma from "@/lib/db";
import { unstable_noStore as noStore } from "next/cache";
import Link from "next/link";
import Image from "next/image";
import { redirect } from "next/navigation";

async function getData(userId: string) {
  return prisma.purchase.findMany({
    where: { buyerId: userId },
    orderBy: { createdAt: "desc" },
    select: {
      id: true,
      amount: true,
      currency: true,
      createdAt: true,
      product: {
        select: {
          name: true,
          images: true,
          smallDescription: true,
        },
      },
    },
  });
}

export default async function MyPurchasesRoute() {
  noStore();
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  if (!user) {
    redirect("/api/auth/login");
  }

  const purchases = await getData(user.id);

  return (
    <section className="w-full max-w-7xl mx-auto px-4 md:px-8">
      <h1 className="text-2xl font-bold mb-6">My Purchases</h1>

      {purchases.length === 0 ? (
        <div className="text-center py-20 text-muted-foreground">
          <p className="text-lg">You haven&apos;t purchased anything yet.</p>
          <Link
            href="/"
            className="mt-4 inline-block text-sm underline underline-offset-4"
          >
            Browse products
          </Link>
        </div>
      ) : (
        <div className="flex flex-col gap-4">
          {purchases.map((purchase) => {
            const image = purchase.product.images[0];
            const amountFormatted = new Intl.NumberFormat("en-US", {
              style: "currency",
              currency: purchase.currency.toUpperCase(),
            }).format(purchase.amount / 100);

            return (
              <div
                key={purchase.id}
                className="flex flex-col sm:flex-row items-start sm:items-center gap-4 border rounded-xl p-4"
              >
                {image && (
                  <div className="relative w-full sm:w-24 h-20 shrink-0 rounded-lg overflow-hidden bg-muted">
                    <Image
                      src={image}
                      alt={purchase.product.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                )}
                <div className="flex-1 min-w-0">
                  <p className="font-medium truncate">{purchase.product.name}</p>
                  <p className="text-sm text-muted-foreground truncate">
                    {purchase.product.smallDescription}
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">
                    {new Date(purchase.createdAt).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}{" "}
                    &middot; {amountFormatted}
                  </p>
                </div>
                <a
                  href={`/download/${purchase.id}`}
                  className="shrink-0 text-sm border rounded-lg px-4 py-2 hover:bg-neutral-50 transition-colors"
                >
                  Download
                </a>
              </div>
            );
          })}
        </div>
      )}
    </section>
  );
}
