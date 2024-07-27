import Link from "next/link";

import ThemeToggle from "@/components/ThemeToggle";
import config from "@/config";

const AuthLayout = ({ children }: React.PropsWithChildren) => {
  return (
    <>
      <header className="container flex items-center justify-between py-4">
        <div>
          <Link href="/">
            <h1>{config.appName}</h1>
          </Link>
        </div>
        <div>
          <ThemeToggle className="" />
        </div>
      </header>
      <main className="flex grow items-center justify-center p-10 ">{children}</main>
      <footer className="container mb-6">
        <div className="flex items-center justify-center rounded-md bg-muted py-10">
          Copyright © {config.copywriteYears} {config.appName}®, Inc. • All right reserved
        </div>
      </footer>
    </>
  );
};

export default AuthLayout;
