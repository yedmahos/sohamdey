import { QueryClient } from "@tanstack/react-query";
import { createRouter } from "@tanstack/react-router";
import { routeTree } from "./routeTree.gen";

export const getRouter = () => {
  const queryClient = new QueryClient();

  const router = createRouter({
    routeTree,
    context: { queryClient },
    // Off: refreshes must always start at the hero, not the saved position.
    scrollRestoration: false,
    defaultPreloadStaleTime: 0,
  });

  return router;
};
