import { NavLink as Link, Outlet } from "react-router-dom";
import { Button } from "./ui/button";

export default function Layout() {
  return (
    <div className="w-full min-h-screen">
      <nav className="h-18 flex items-center justify-between max-w-screen-md mx-auto">
        <h1 className="text-2xl font-bold">Anecdotes</h1>
        <div className="">
          <Link end to={"/"} className="p-2 hover:underline">
            Home
          </Link>
          <Link to={"/about"} className="p-2 hover:underline">
            About
          </Link>
          <Button variant={"outline"} className="" asChild>
            <Link to={"/create"} className="p-2">
              Create New
            </Link>
          </Button>
        </div>
      </nav>
      <div className="h-[calc(100vh-72px-54px)]">
        <Outlet />
      </div>
      <footer className="border-t mt-4 py-2 text-center text-sm ">
        <div>
          Anecdote app for{" "}
          <Link
            to="https://fullstackopen.com/"
            target="_blank"
            rel="nonreferrer"
            className={"text-blue-600 underline"}
          >
            Full Stack Open
          </Link>
          . See the source code{" "}
          <Link
            to="https://github.com/fullstack-hy2020/routed-anecdotes/blob/master/src/App.js"
            target="_blank"
            rel="noreferrer"
            className={"text-blue-600 underline"}
          >
            here
          </Link>{" "}
        </div>
      </footer>
    </div>
  );
}
