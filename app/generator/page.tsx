import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import GeneratorClient from "./GeneratorClient";

export default async function GeneratorPage() {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  return <GeneratorClient isAuthenticated={Boolean(user)} />;
}
