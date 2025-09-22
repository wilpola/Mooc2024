import React, { useEffect } from "react";
import { Input } from "./components/ui/input";

const About: React.FC = () => {
  const [value, setValue] = React.useState<string>("");

  //   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //     if (value.length >= 10) {
  //       e.preventDefault();
  //       return;
  //     } else {
  //       setValue(e.target.value);
  //     }
  //   };

  useEffect(() => {
    // key listener for number keys
    const handleKeyDown = (event: KeyboardEvent) => {
      const key = event.key;
      if (key >= "0" && key <= "9") {
        if (value.length < 10) {
          setValue((prev) => prev + key);
        }

        console.log(`Key pressed: ${key}`);
        document.getElementById(`num-${key}`)?.classList.add("bg-neutral-600");
      } else if (key === "Backspace") {
        setValue((prev) => prev.slice(0, -1));
      }
    };
    document.addEventListener("keydown", handleKeyDown);
  }, []);

  const numbers = ["7", "8", "9", "4", "5", "6", "1", "2", "3", "0"];
  return (
    <div className="w-full bg-neutral-900 h-[calc(100svh-56px)] text-neutral-100 overflow-y-overlay">
      <div className="pt-10 max-w-screen-lg mx-auto grid grid-cols-1 gap-5 w-[95%] md:grid-cols-2 h-[80%]  overflow-y-auto justify-items-center place-items-center">
        <div className="">
          <h1 className="text-2xl font-semibold mb-5">
            About FullStack Phonebook
          </h1>
          <p>
            This is a simple phonebook application built with React and
            TypeScript. It allows users to add, view, and manage their contacts.
          </p>
          <p>
            The application uses a mock API to simulate server interactions. It
            demonstrates the use of React hooks for state management and side
            effects.
          </p>
        </div>
        <div className="max-md:row-start-1">
          <div className="grid grid-cols-3 grid-rows-5 border rounded-md p-4 border-neutral-800">
            <div className="col-span-full my-auto flex items-center justify-center">
              <Input
                type="phone"
                className="col-span-full align-middle my-auto px-2 h-12 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none border border-neutral-800 relative"
                value={value}
                contentEditable={false}
                max={10}
              />
            </div>
            {numbers.map((num, index) => (
              <div
                key={index}
                id={`num-${num}`}
                className="bg-neutral-800 m-2 rounded-lg h-16 w-16 flex items-center justify-center text-neutral-100 last:col-start-2 hover:cursor-pointer hover:bg-neutral-600 transition-colors duration-200 text-xl font-semibold "
              >
                {num}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
