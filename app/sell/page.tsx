import {Card} from "@/components/ui/card";
import { SellForm } from "../components/form/Sellform";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { redirect } from "next/dist/client/components/navigation";
import prisma from "@/lib/db";

async function getData(userId: string) {
  const data = await prisma.user.findUnique({
    where: {
      id: userId,
    },
    select: {
      stripeConnectedLinked: true,
    },
  });

  if (data?.stripeConnectedLinked === false) {
    return redirect("/billing");
  }

  return null;
}

export default async function SellPage() {
  const {getUser} = getKindeServerSession();
  const user = await getUser();
  if (!user) {
    throw new Error("Not Authorized");
  }

  const data = await getData(user.id);

  return (
    <section className="w-full max-w-7xl mx-auto px-4 md:px-8">
      <Card>
        <SellForm />
      </Card>
    </section>
  );
}
