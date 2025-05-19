'use client';

import { ThemeProvider } from "next-themes";
import React from "react";
import { BackgroundMusic } from "@/components/BackgroundMusic";

interface ClientBodyProps {
  children: React.ReactNode;
}

export function ClientBody({ children }: ClientBodyProps) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <BackgroundMusic />
      {children}
    </ThemeProvider>
  );
}
