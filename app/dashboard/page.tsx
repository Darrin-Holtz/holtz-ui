import type { Metadata } from "next";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import prisma from "@/lib/db";
import { unstable_noStore as noStore } from "next/cache";
import { redirect } from "next/navigation";
import { Card } from "@/components/ui/card";

export const metadata: Metadata = {
  title: "Dashboard",
  robots: { index: false, follow: false },
};

async function getData(userId: string) {
  const [totalSales, revenueResult, recentSales, products] = await prisma.$transaction([
    prisma.purchase.count({
      where: { product: { userId } },
    }),
    prisma.purchase.aggregate({
      where: { product: { userId } },
      _sum: { amount: true },
    }),
    prisma.purchase.findMany({
      where: { product: { userId } },
      orderBy: { createdAt: "desc" },
      take: 5,
      select: {
        id: true,
        amount: true,
        currency: true,
        createdAt: true,
        product: { select: { name: true } },
      },
    }),
    prisma.product.findMany({
      where: { userId },
      select: {
        id: true,
        name: true,
        price: true,
        isActive: true,
        _count: { select: { Purchase: true } },
      },
      orderBy: { createdAt: "desc" },
    }),
  ]);

  return {
    totalSales,
    totalRevenue: revenueResult._sum.amount ?? 0,
    recentSales,
    products,
  };
}

export default async function DashboardPage() {
  noStore();
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  if (!user) redirect("/api/auth/login");

  const { totalSales, totalRevenue, recentSales, products } = await getData(user.id);

  const revenueFormatted = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "usd",
  }).format(totalRevenue / 100);

  return (
    <section className="w-full max-w-7xl mx-auto px-4 md:px-8">
      <h1 className="text-2xl font-bold mb-6">Dashboard</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
        <Card className="p-6">
          <p className="text-sm text-muted-foreground">Total Sales</p>
          <p className="text-3xl font-bold mt-1">{totalSales}</p>
        </Card>
        <Card className="p-6">
          <p className="text-sm text-muted-foreground">Total Revenue</p>
          <p className="text-3xl font-bold mt-1">{revenueFormatted}</p>
          <p className="text-xs text-muted-foreground mt-1">Before platform fee</p>
        </Card>
      </div>

      <h2 className="text-lg font-semibold mb-4">Recent Sales</h2>
      {recentSales.length === 0 ? (
        <p className="text-sm text-muted-foreground mb-8">No sales yet.</p>
      ) : (
        <Card className="mb-8 divide-y">
          {recentSales.map((sale) => (
            <div key={sale.id} className="flex items-center justify-between px-4 py-3">
              <div>
                <p className="text-sm font-medium">{sale.product.name}</p>
                <p className="text-xs text-muted-foreground">
                  {new Date(sale.createdAt).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                  })}
                </p>
              </div>
              <span className="text-sm font-medium">
                {new Intl.NumberFormat("en-US", {
                  style: "currency",
                  currency: sale.currency.toUpperCase(),
                }).format(sale.amount / 100)}
              </span>
            </div>
          ))}
        </Card>
      )}

      <h2 className="text-lg font-semibold mb-4">Your Products</h2>
      {products.length === 0 ? (
        <p className="text-sm text-muted-foreground">You haven&apos;t listed any products yet.</p>
      ) : (
        <Card className="divide-y">
          {products.map((product) => (
            <div key={product.id} className="flex items-center justify-between px-4 py-3">
              <div>
                <p className="text-sm font-medium">{product.name}</p>
                <p className="text-xs text-muted-foreground">
                  {product._count.Purchase} sale{product._count.Purchase !== 1 ? "s" : ""}
                  {" · "}
                  <span className={product.isActive ? "text-green-600" : "text-muted-foreground"}>
                    {product.isActive ? "Active" : "Archived"}
                  </span>
                </p>
              </div>
              <span className="text-sm font-medium">
                ${Number(product.price).toFixed(2)}
              </span>
            </div>
          ))}
        </Card>
      )}
    </section>
  );
}
