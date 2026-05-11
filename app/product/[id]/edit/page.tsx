import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { notFound, redirect } from "next/navigation";
import prisma from "@/lib/db";
import { Card } from "@/components/ui/card";
import { EditProductForm } from "@/app/components/form/EditProductForm";
import { unstable_noStore as noStore } from "next/cache";
import { repairDescription } from "@/lib/repairDescription";

async function getData(productId: string, userId: string) {
  const data = await prisma.product.findUnique({
    where: { id: productId },
    select: {
      id: true,
      name: true,
      price: true,
      smallDescription: true,
      description: true,
      images: true,
      productFile: true,
      Category: true,
      userId: true,
    },
  });

  if (!data) notFound();
  if (data.userId !== userId) notFound();

  return data;
}

export default async function EditProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  noStore();
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  if (!user) {
    redirect("/api/auth/login");
  }

  const { id } = await params;
  const product = await getData(id, user.id);

  // Repair any double-serialization corruption from previous bad saves.
  const description = repairDescription(product.description);

  return (
    <section className="w-full max-w-7xl mx-auto px-4 md:px-8">
      <Card>
        <EditProductForm
          product={{
            id: product.id,
            name: product.name,
            price: Number(product.price),
            smallDescription: product.smallDescription,
            description,
            images: product.images,
            productFile: product.productFile,
            Category: product.Category,
          }}
        />
      </Card>
    </section>
  );
}
