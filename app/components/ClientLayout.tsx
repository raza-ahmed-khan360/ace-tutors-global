'use client';

import { usePathname } from 'next/navigation';
import Navbar from '@/app/sections/Navbar';
import Footer from '@/app/sections/Footer';
import { Analytics } from "@vercel/analytics/next"
import { SpeedInsights } from '@vercel/speed-insights/next';

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isStudioRoute = pathname.startsWith('/studio');

  return (
    <>
      {!isStudioRoute && <Navbar />}
      {children}
      <SpeedInsights />
      <Analytics />
      {!isStudioRoute && <Footer />}
    </>
  );
}
