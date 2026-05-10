const { PrismaClient } = require("../lib/generated/prisma/client");

const prisma = new PrismaClient();

async function main() {
  // Clear existing data
  await prisma.product.deleteMany();
  await prisma.user.deleteMany();

  // Create a test user
  const user = await prisma.user.create({
    data: {
      id: "test-user-1",
      email: "test@example.com",
      firstName: "Test",
      lastName: "User",
      profileImage: "https://via.placeholder.com/150",
    },
  });

  // Create test products
  await prisma.product.createMany({
    data: [
      {
        id: "product-1",
        name: "Modern Dashboard Template",
        price: 29.99,
        smallDescription: "A modern and responsive dashboard template",
        description: { type: "doc", content: [] },
        images: [
          "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=500&h=500&fit=crop",
        ],
        productFile: "dashboard-template.zip",
        Category: "templates",
        userId: user.id,
      },
      {
        id: "product-2",
        name: "Premium UI Kit",
        price: 49.99,
        smallDescription: "Complete UI kit with all components",
        description: { type: "doc", content: [] },
        images: [
          "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=500&h=500&fit=crop",
        ],
        productFile: "ui-kit.figma",
        Category: "uikits",
        userId: user.id,
      },
      {
        id: "product-3",
        name: "Icon Set",
        price: 19.99,
        smallDescription: "1000+ beautiful icons for your projects",
        description: { type: "doc", content: [] },
        images: [
          "https://images.unsplash.com/photo-1563062810-e5f9a2ddb62c?w=500&h=500&fit=crop",
        ],
        productFile: "icons.zip",
        Category: "icons",
        userId: user.id,
      },
    ],
  });

  console.log("✅ Database seeded successfully");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
