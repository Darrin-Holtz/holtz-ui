import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import GeneratorClient from "./GeneratorClient";
import { DesktopGate } from "./DesktopGate";

export default async function GeneratorPage() {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  return (
    <DesktopGate>
      <GeneratorClient isAuthenticated={Boolean(user)} />
    </DesktopGate>
  );
}
