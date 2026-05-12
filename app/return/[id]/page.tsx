import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import prisma from "@/lib/db";
import { redirect } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Check } from "lucide-react";
import Link from "next/link";

export default async function ReturnUrlStripe({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  if (!user) redirect("/api/auth/login");

  const userRecord = await prisma.user.findUnique({
    where: { id: user.id },
    select: { connectedAccountId: true },
  });

  if (!userRecord || userRecord.connectedAccountId !== id) {
    redirect("/billing");
  }

  return (
    <section className="w-full min-h-[80vh] flex items-center justify-center">
      <Card className="w-[350px]">
        <div className="p-6">
          <div className="w-full flex justify-center">
            <Check className="w-12 h-12 rounded-full bg-green-500/30 text-green-500 p-2" />
          </div>
          <div className="mt-3 text-center sm:mt-5 w-full">
            <h3 className="text-lg leading-6 font-medium">
              Linking was Successful
            </h3>
            <p className="mt-2 text-sm text-muted-foreground">
              Congrats on linking your account to Holtz UI. You can now start
              selling your products!
            </p>

            <Button className="mt-5 sm:mt-6 w-full" asChild>
              <Link href="/">Back to Homepage</Link>
            </Button>
          </div>
        </div>
      </Card>
    </section>
  );
}