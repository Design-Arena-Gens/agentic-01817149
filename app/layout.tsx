import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Ritam Reviews Dashboard',
  description: 'Unified hotel review intelligence for Indian hoteliers',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
