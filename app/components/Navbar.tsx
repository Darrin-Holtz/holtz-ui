import Link from "next/link";
import { NavbarLinks } from "./NavbarLinks";
import { Button } from "@/components/ui/button";
import { MobileMenu } from "./MobileMenu";
import {
  LoginLink,
  RegisterLink,
} from "@kinde-oss/kinde-auth-nextjs/components";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { UserNav } from "./UserNav";
import { Search } from "lucide-react";
import { LogoIcon } from "./LogoIcon";

export async function Navbar() {
  const { getUser } = getKindeServerSession();
  const user = await getUser();
  return (
    <nav className="relative max-w-7xl w-full flex md:grid md:grid-cols-12 items-center px-4 md:px-8 mx-auto py-7">
      <div className="md:col-span-3">
        <Link href="/" className="flex items-center gap-2.5">
          <LogoIcon className="h-9 w-9 shrink-0" />
          <span className="text-xl font-bold tracking-tight">
            HoltzDigital<span className="text-primary">UI</span>
          </span>
        </Link>
      </div>

      <NavbarLinks />

      <div className="flex items-center gap-x-2 ms-auto md:col-span-3">
        <form action="/search" method="GET" className="hidden md:flex items-center border rounded-lg px-2 gap-1">
          <Search className="w-4 h-4 text-muted-foreground shrink-0" />
          <input
            name="q"
            type="search"
            placeholder="Search..."
            className="bg-transparent outline-none text-sm py-1.5 w-24 focus:w-36 transition-all"
          />
        </form>
        {user ? (
          <UserNav
            email={user.email as string}
            name={user.given_name as string}
            userImage={
              user.picture ?? `https://avatar.vercel.sh/${user.given_name}`
            }
          />
        ) : (
          <div className="hidden md:flex items-center gap-x-2">
            <Button asChild>
              <LoginLink>Login</LoginLink>
            </Button>
            <Button variant="secondary" asChild>
              <RegisterLink>Register</RegisterLink>
            </Button>
          </div>
        )}

        <div className="block md:hidden">
          <MobileMenu />
        </div>
      </div>
    </nav>
  );
}