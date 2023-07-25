import './globals.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Templete Next App'
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <body className="h-screen bg-zinc-200">{children}</body>
    </html>
  );
}
