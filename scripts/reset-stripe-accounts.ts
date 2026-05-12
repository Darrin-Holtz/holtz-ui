import prisma from "../lib/db";

async function main() {
  const updated = await prisma.user.updateMany({
    where: { stripeConnectedLinked: true },
    data: { stripeConnectedLinked: false },
  });
  console.log("Updated users:", updated.count);
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
