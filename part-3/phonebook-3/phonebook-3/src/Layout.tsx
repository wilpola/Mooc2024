import React from "react";
import { Outlet } from "react-router-dom";
import { Toaster } from "@/components/ui/sonner";

const Layout: React.FC = () => {
  return (
    <>
      <Toaster />
      <Outlet />
    </>
  );
};

export default Layout;
