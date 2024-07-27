"use client";

import { Poppins } from "next/font/google";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";

import Social from "./Social";

const font = Poppins({
  subsets: ["latin"],
  weight: ["600"],
});

interface Props {
  children: React.ReactNode;
  headerLabel: React.ReactNode;
  bottomButtonLabel: string;
  bottomButtonHref: string;
  showSocial?: boolean;
}

const AuthCard = ({ children, headerLabel, bottomButtonLabel, bottomButtonHref, showSocial }: Props) => {
  return (
    <Card className="min-w-[400px] max-w-xl shadow-md">
      <CardHeader className="items-center justify-center">{headerLabel}</CardHeader>
      <CardContent>
        {showSocial && <Social />}
        {children}
      </CardContent>
      <CardFooter className="justify-center">
        <Button variant="link" className="font-normal" size="sm" asChild>
          <Link href={bottomButtonHref}>{bottomButtonLabel}</Link>
        </Button>
      </CardFooter>
    </Card>
  );
};

export default AuthCard;
