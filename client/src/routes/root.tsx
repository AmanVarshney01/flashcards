import { Button } from "@/components/ui/button";
import { NavLink, Outlet } from "react-router-dom";
import tufLogo from "/tuf-logo.svg";

export default function Root() {
  return (
    <>
      <div className="grid min-h-dvh grid-rows-[auto_1fr]">
        <div className="flex items-center gap-2 px-2 py-4">
          <div>
            <img src={tufLogo} />
          </div>
          <Button variant={"ghost"} asChild>
            <NavLink to="/" className="[&.active]:text-primary">
              Home
            </NavLink>
          </Button>
          <Button variant={"ghost"} asChild>
            <NavLink to="/admin" className="[&.active]:text-primary">
              Admin
            </NavLink>
          </Button>
        </div>
        <Outlet />
      </div>
    </>
  );
}
