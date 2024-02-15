"use client";

import { Toaster } from "@/components/ui/sonner";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { SessionProvider } from "next-auth/react";
import { PropsWithChildren } from "react";

const queryClient = new QueryClient();

export const Providers = (props: PropsWithChildren) => {
  return (
    <>
      <SessionProvider>
        <QueryClientProvider client={queryClient}>
          <Toaster closeButton position="top-right" />
          {props.children}
        </QueryClientProvider>
      </SessionProvider>
    </>
  );
};
