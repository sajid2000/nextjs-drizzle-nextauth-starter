import React from "react";

import Header from "@/components/Header";

type Props = {
  children: React.ReactNode;
};

const DashboardLayout: React.FC<Props> = async ({ children }) => {
  return (
    <div className="flex min-h-screen w-full flex-col">
      <Header />
      {children}
    </div>
  );
};

export default DashboardLayout;
