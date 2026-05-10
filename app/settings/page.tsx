import { Card } from "@/components/ui/card";
import prisma from "@/lib/db";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { redirect } from "next/navigation";
import { SettingsForm } from "../components/form/SettingsForm";
import { unstable_noStore as noStore } from "next/cache";

export const dynamic = "force-dynamic";

async function getData(userId: string) {
  const data = await prisma.user.findUnique({
    where: {
      id: userId,
    },
    select: {
      firstName: true,
      lastName: true,
      email: true,
    },
  });

  return data;
}

export default async function SettingsPage() {
  noStore();
  const { getUser } = getKindeServerSession();
  const user = await getUser();
  if (!user) {
    redirect("/api/auth/login");
  }

  const data = await getData(user.id);
  return (
    <section className="w-full max-w-7xl mx-auto px-4 md:px-8">
      <Card className="w-full">
        <SettingsForm
          key={`${data?.firstName ?? ""}-${data?.lastName ?? ""}-${data?.email ?? ""}`}
          firstName={data?.firstName as string}
          lastName={data?.lastName as string}
          email={data?.email as string}
        />
      </Card>
    </section>
  );
}