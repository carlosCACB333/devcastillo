import { Metadata } from 'next';

export default async function DonateLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'Donar',
    description: '¡Ayúdanos a seguir adelante!',
  };
}
