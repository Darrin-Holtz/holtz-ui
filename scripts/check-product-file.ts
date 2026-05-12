import prisma from "../lib/db";

async function main() {
  const purchase = await prisma.purchase.findUnique({
    where: { id: "6452afd3-b155-491d-91e9-8824e71699e9" },
    select: { product: { select: { productFile: true } } },
  });
  console.log("productFile:", purchase?.product?.productFile);
}

main().catch(console.error).finally(() => prisma.$disconnect());
