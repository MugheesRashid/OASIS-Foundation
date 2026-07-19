"use client";

import { ReactNode } from "react";
import { ThemeProvider } from "next-themes";
 import { useSmoothScroll } from "@/hooks/useSmoothScroll";

function SmoothScrollBridge() {
    useSmoothScroll();
  return null;
}

export function Providers({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider
      attribute="data-theme"
      defaultTheme="light"
      enableSystem={true}
      disableTransitionOnChange={false}
    >
      <SmoothScrollBridge />
      {children}
    </ThemeProvider>
  );
}
