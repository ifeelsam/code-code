"use client";
import { ThemeProvider } from "@/components/theme-provider";
import { RecoilRoot } from "recoil";

export const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <RecoilRoot>
      <ThemeProvider>
        {children}
      </ThemeProvider>
    </RecoilRoot>
  )
};
