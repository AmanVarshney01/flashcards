import { Button } from "@/components/ui/button";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import {
  createRootRouteWithContext,
  Link,
  Outlet,
} from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";

import type { QueryClient } from "@tanstack/react-query";
import tufLogo from "/tuf-logo.svg";

export const Route = createRootRouteWithContext<{
  queryClient: QueryClient;
}>()({
  component: () => (
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
      <ReactQueryDevtools />
      <TanStackRouterDevtools />
    </>
  ),
  notFoundComponent: () => {
    return (
      <div>
        <p>
          <strong>404:</strong> Page not found
        </p>
        <Link to="/">Go home</Link>
      </div>
    );
  },
});
