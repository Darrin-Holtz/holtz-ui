"use client"

import { Button } from "@/components/ui/button";
import {
    LoginLink,
    LogoutLink,
    RegisterLink,
} from "@kinde-oss/kinde-auth-nextjs/components";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import { navbarLinks } from "./NavbarLinks";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";

export function MobileMenu() {
    const location = usePathname();
    const { isAuthenticated, isLoading } = useKindeBrowserClient();

  return (
    <Sheet>
            <SheetTrigger asChild>
                <Button variant="outline" size="icon">
                    <Menu className="w-4 h-4" />
                </Button>
            </SheetTrigger>
            <SheetContent>
                <SheetHeader>
                    <SheetTitle className="sr-only">Navigation menu</SheetTitle>
                    <SheetDescription className="sr-only">
                        Browse main navigation links for the site.
                    </SheetDescription>
                </SheetHeader>
                <div className="mt-5 flex flex-col space-y-1 px-2">
                    {navbarLinks.map((item) => (
                        <Link
                            href={item.href}
                            key={item.id}
                            className={cn(
                                location === item.href ? "bg-muted" : "hover:bg-muted/75",
                                "group flex items-center rounded-md px-2 py-2 font-medium"
                            )}
                        >
                            {item.name}
                        </Link>
                    ))}

                    {!isLoading && (
                        <div className="mt-4 border-t border-border pt-4">
                            {isAuthenticated ? (
                                <Button asChild className="w-full" variant="secondary">
                                    <LogoutLink>Logout</LogoutLink>
                                </Button>
                            ) : (
                                <div className="flex flex-col gap-2">
                                    <Button asChild className="w-full">
                                        <LoginLink>Login</LoginLink>
                                    </Button>
                                    <Button asChild className="w-full" variant="secondary">
                                        <RegisterLink>Register</RegisterLink>
                                    </Button>
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </SheetContent>
    </Sheet>
    );
}
