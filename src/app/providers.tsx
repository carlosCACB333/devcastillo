'use client';
import { AuthorProvider } from '@/context';
import { Author } from '@/generated/graphql';
import { HeroUIProvider } from '@heroui/system';
import { ThemeProvider as NextThemesProvider, useTheme } from 'next-themes';
import { useRouter } from 'next/navigation';
import { ReactNode } from 'react';
import { Toaster } from 'sonner';

export interface ProvidersProps {
  children: ReactNode;
  author: Author;
}

declare module '@react-types/shared' {
  interface RouterConfig {
    routerOptions: NonNullable<Parameters<ReturnType<typeof useRouter>['push']>[1]>;
  }
}

export function Providers({ children, author }: ProvidersProps) {
  const router = useRouter();
  return (
    <HeroUIProvider navigate={router.push}>
      <AuthorProvider author={author}>
        <NextThemesProvider attribute='class' defaultTheme='dark'>
          <ProvidersChild>{children}</ProvidersChild>
        </NextThemesProvider>
      </AuthorProvider>
    </HeroUIProvider>
  );
}

const ProvidersChild = ({ children }: { children: ReactNode }) => {
  const { theme } = useTheme();
  return (
    <>
      <Toaster theme={theme === 'dark' ? 'dark' : 'light'} />
      {children}
    </>
  );
};
