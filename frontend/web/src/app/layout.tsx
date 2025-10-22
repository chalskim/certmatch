import './styles/globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import ReactQueryProvider from '@/app/providers/ReactQueryProvider';
import ClientLayout from '@/app/components/ClientLayout';

export const metadata: Metadata = {
  title: 'CertMatch - 인증 앱',
  description: 'CertMatch - 인증도 스마트하게',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <head>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" />
      </head>
      <body className="flex flex-col min-h-screen">
        <ReactQueryProvider>
          <ClientLayout>
            {children}
          </ClientLayout>
        </ReactQueryProvider>
      </body>
    </html>
  );
}