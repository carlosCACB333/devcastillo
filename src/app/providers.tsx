"use client";
import { AuthorProvider } from "@/context";
import { Author } from "@/generated/graphql";
import { NextUIProvider } from "@nextui-org/system";
import { ThemeProvider as NextThemesProvider, useTheme } from "next-themes";
import { useRouter } from "next/navigation";
import { ReactNode } from "react";
import { Toaster } from "sonner";

export interface ProvidersProps {
  children: ReactNode;
  author: Author;
}

export function Providers({ children, author }: ProvidersProps) {
  const router = useRouter();
  return (
    <NextUIProvider navigate={router.push}>
      <AuthorProvider author={author as any}>
        <NextThemesProvider attribute="class" defaultTheme="dark">
          <ProvidersChild>{children}</ProvidersChild>
        </NextThemesProvider>
      </AuthorProvider>
    </NextUIProvider>
  );
}

const ProvidersChild = ({ children }: { children: ReactNode }) => {
  const { theme } = useTheme();
  return (
    <>
      <Toaster theme={theme === "dark" ? "dark" : "light"} />
      {children}
    </>
  );
};
