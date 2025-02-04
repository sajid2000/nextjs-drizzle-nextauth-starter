import { Menu, Package2, Search } from "lucide-react";
import Link from "next/link";

import { AUTH_URI } from "@/app/(auth)/constants";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { getCurrentUser } from "@/lib/session";

import ThemeToggle from "./ThemeToggle";
import UserMenu from "./UserMenu";

const Header: React.FC = async ({}) => {
  const user = await getCurrentUser();

  return (
    <header className="sticky top-0 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6">
      <nav className="hidden flex-col gap-6 text-lg font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6">
        <Link href="/" className="flex items-center gap-2 text-lg font-semibold md:text-base">
          <Package2 className="size-6" />
          <span className="sr-only">Acme Inc</span>
        </Link>
        {!user && (
          <Link href={AUTH_URI.signIn} className="text-nowrap text-foreground transition-colors hover:text-foreground">
            Sign in
          </Link>
        )}
        <Link href="/dashboard" className="text-foreground transition-colors hover:text-foreground">
          Dashboard
        </Link>
        {user && (
          <>
            <Link href="/dashboard" className="text-foreground transition-colors hover:text-foreground">
              Dashboard
            </Link>
            <Link href="#" className="text-muted-foreground transition-colors hover:text-foreground">
              Orders
            </Link>
          </>
        )}
      </nav>
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="outline" size="icon" className="shrink-0 md:hidden">
            <Menu className="size-5" />
            <span className="sr-only">Toggle navigation menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left">
          <nav className="grid gap-6 text-lg font-medium">
            <Link href="/" className="flex items-center gap-2 text-lg font-semibold">
              <Package2 className="size-6" />
              <span className="sr-only">Acme Inc</span>
            </Link>
            {!user && (
              <Link href={AUTH_URI.signIn} className="text-nowrap hover:text-foreground">
                Dashboard
              </Link>
            )}
            {user && (
              <>
                <Link href="/dashboard" className="hover:text-foreground">
                  Dashboard
                </Link>
                <Link href="#" className="text-muted-foreground hover:text-foreground">
                  Orders
                </Link>
              </>
            )}
          </nav>
        </SheetContent>
      </Sheet>
      <div className="flex w-full items-center gap-4 md:ml-auto md:gap-2 lg:gap-4">
        <form className="ml-auto flex-1 sm:flex-initial">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 size-4 text-muted-foreground" />
            <Input type="search" placeholder="Search products..." className="pl-8 sm:w-[300px] md:w-[200px] lg:w-[300px]" />
          </div>
        </form>
        {user && <UserMenu />}
        <ThemeToggle />
      </div>
    </header>
  );
};

export default Header;
