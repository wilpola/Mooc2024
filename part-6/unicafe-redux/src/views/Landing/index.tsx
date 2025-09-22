// Landing page

import { Button } from "@/components/ui/button";

export default function Landing() {
  return (
    <div className="w-[95%] max-w-screen-md mx-auto pt-10">
      <h1 className="text-2xl font-semibold">Redux</h1>

      <div className="py-4 flex gap-2">
        <Button variant={"outline"} className="hover:cursor-pointer">Good</Button>
        <Button variant={"outline"} className="hover:cursor-pointer">Ok</Button>
        <Button variant={"outline"} className="hover:cursor-pointer">Bad</Button>
        <Button variant={"default"} className="hover:cursor-pointer">Reset</Button>
      </div>


    {/* Show state */}
      <div className="p-4 border rounded-md">
        <code>good: 0</code> <br />
        <code>ok: 0</code> <br />
        <code>bad: 0</code>
      </div>
    </div>
  );
}
