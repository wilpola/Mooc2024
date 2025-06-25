import React from "react";

// import Countries from "@/assets/countries.webp";
import { WireframeSphere } from "./Globe";
import { Button } from "@/components/ui/button";
import { Github } from "lucide-react";

const About: React.FC = () => {
  return (
    <div className="w-full bg-neutral-900 h-[calc(100vh-56px)] overflow-y-scroll">
      <div className="w-full mx-auto max-w-screen-xl rounded-md bg-neutral-900">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 min-h-[80svh] items-center ">
          <div className="mt-4 text-neutral-100">
            <h1 className="text-4xl font-semibold">About</h1>
            <p className="text-lg mt-2 max-w-[55ch] mx-auto max-md:container">
              Countries is a Part-2 assignment, where we were tasked to create
              an application where users can search for countries and view their
              details. The application is built using React, TypeScript, and
              Tailwind CSS.
            </p>
            <div className="flex items-center gap-2 mt-4">
              <Button
                variant={"outline"}
                className="bg-neutral-900"
                onClick={() =>
                  window.open(
                    "https://github.com/wilpola/Mooc2024/tree/main/part-2"
                  )
                }
              >
                <Github /> Code
              </Button>
              <Button
                variant={"default"}
                className="bg-neutral-900"
                onClick={() =>
                  window.open(
                    "https://fullstackopen.com/en/part2/adding_styles_to_react_app#exercises-2-18-2-20"
                  )
                }
              >
                Check assignment
              </Button>
            </div>
          </div>

          <div className="h-full max-md:row-start-1">
            {/* <img src={Globe} alt="Globe" className="w-full h-full object-cover rounded-md" /> */}
            <WireframeSphere />
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
