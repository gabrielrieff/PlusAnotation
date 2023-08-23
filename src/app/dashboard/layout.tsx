import type { Metadata } from 'next';
import { Header } from '~/components/Header';

export const metadata: Metadata = {
  title: 'Dashboard'
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html>
      <body >
        {children}
      </body>
    </html>
  );
}
