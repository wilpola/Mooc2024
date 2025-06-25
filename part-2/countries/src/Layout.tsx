import React from "react";
import { Outlet } from "react-router-dom";
import { NavLink as Link } from "react-router-dom";

import { Button } from "@/components/ui/button";
import { Github } from "lucide-react";

const Layout: React.FC = () => {
  return (
    <div className="w-full bg-gray-100 h-screen">
      <header className="h-14 bg-neutral-800 text-white ">
        <div className="max-w-screen-lg mx-auto w-[95%] flex items-center justify-between h-full">
          <h1 className="text-2xl font-semibold">Countries</h1>
          <div className="flex items-center">
            <Button
              variant="ghost"
              className=" hover:bg-neutral-700 text-white hover:text-white"
              asChild
            >
              <Link to="/">Home</Link>
            </Button>
            <Button
              variant="ghost"
              className=" hover:bg-neutral-700 text-white hover:text-white"
              asChild
            >
              <Link to="/about">About</Link>
            </Button>
            <Button
              variant="ghost"
              className=" hover:bg-neutral-700 text-white hover:text-white"
              size={"icon"}
              onClick={() =>
                  window.open(
                    "https://github.com/wilpola/Mooc2024/tree/main/part-2"
                  )
                }
            >
              <Github />
            </Button>
          </div>
        </div>
      </header>
      <main className="h-[calc(100vh-56px)] overflow-y-scroll">
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
