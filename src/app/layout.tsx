
import type { Metadata } from 'next';
import './globals.css';
import "@solana/wallet-adapter-react-ui/styles.css";
import { Toaster } from "@/components/ui/toaster";
import Sidebar from '@/components/layout/sidebar';
import WalletContextProvider from '@/components/providers/wallet-provider';

export const metadata: Metadata = {
  title: 'Jupiter Ultra Wallet',
  description: 'The Speed-First DAO-Friendly Solana Wallet',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet" />
      </head>
      <body className="font-body antialiased">
        <WalletContextProvider>
          <div className="relative flex min-h-screen flex-col md:flex-row bg-background">
            <Sidebar />
            <div className="flex-1 flex flex-col">
              <main className="flex-1 p-6 lg:p-8">
                <div className="animate-fade-in-up">
                  {children}
                </div>
              </main>
            </div>
          </div>
          <Toaster />
        </WalletContextProvider>
      </body>
    </html>
  );
}
