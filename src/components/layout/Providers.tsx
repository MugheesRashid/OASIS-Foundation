"use client";

import { ReactNode } from "react";
import { ThemeProvider } from "next-themes";
//  import { useSmoothScroll } from "@/hooks/useSmoothScroll";

function SmoothScrollBridge() {
  // useSmoothScroll();
  return null;
}

export function Providers({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider
      attribute="data-theme"
      defaultTheme="dark"
      enableSystem={false}
      disableTransitionOnChange={false}
    >
      <SmoothScrollBridge />
      {children}
    </ThemeProvider>
  );
}
