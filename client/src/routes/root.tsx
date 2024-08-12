import { Button } from "@/components/ui/button";
import { Link, Outlet } from "react-router-dom";
import tufLogo from "/tuf-logo.svg";

export default function Root() {
  return (
    <>
      <div className="min-h-dvh grid grid-rows-[auto_1fr]">
        <div className="px-2 py-4 flex gap-2 items-center">
          <div>
            <img src={tufLogo} />
          </div>
          <Button variant={"ghost"} asChild>
            <Link to="/" className="[&.active]:text-primary">
              Home
            </Link>
          </Button>
          <Button variant={"ghost"} asChild>
            <Link to="/admin" className="[&.active]:text-primary">
              Admin
            </Link>
          </Button>
        </div>
        <Outlet />
      </div>
    </>
  );
}
