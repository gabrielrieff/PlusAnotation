import { Provider } from '~/components/Provider/Provider';
import { Header } from '~/components/Header';
import type { Metadata } from 'next';

import './globals.css';

export const metadata: Metadata = {
  title: 'Plus+'
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <body className="h-screen">
        <Provider>
          <Header />
          {children}
        </Provider>
      </body>
    </html>
  );
}
