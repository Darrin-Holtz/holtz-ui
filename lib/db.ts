import { PrismaClient } from "./generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { Pool } from "pg";

const globalForPrisma = globalThis as unknown as {
  prismaGlobal?: PrismaClient;
  pgPoolGlobal?: Pool;
};

const prismaClientSingleton = () => {
  if (!process.env.DATABASE_URL) {
    throw new Error("DATABASE_URL is not set");
  }

  // Keep pool size small in serverless to avoid exhausting DB connections.
  const pool =
    globalForPrisma.pgPoolGlobal ??
    new Pool({
      connectionString: process.env.DATABASE_URL,
      max: Number(process.env.PG_POOL_MAX ?? "3"),
      idleTimeoutMillis: 30_000,
      connectionTimeoutMillis: 10_000,
      allowExitOnIdle: true,
    });

  globalForPrisma.pgPoolGlobal = pool;

  const adapter = new PrismaPg(pool);
  return new PrismaClient({ adapter });
};

const prisma = globalForPrisma.prismaGlobal ?? prismaClientSingleton();

globalForPrisma.prismaGlobal = prisma;

export default prisma;