import type { Metadata } from "next";
import { SpeedInsights } from '@vercel/speed-insights/next';
import { Poppins, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import Navbar from "./sections/Navbar";
import Footer from "./sections/Footer";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
});

const plusJakartaSans = Plus_Jakarta_Sans({
  variable: "--font-plus-jakarta-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL('https://www.acetutorsglobal.com'),
  title: {
    template: '%s | Ace Tutors Global',
    default: 'Ace Tutors Global - Expert Online Tutoring for International Curricula'
  },
  description: 'Ace Tutors Global provides expert online tutoring for O Levels, A Levels, IGCSE, IB & more. Get personalized learning with experienced tutors, flexible schedules & proven results.',
  keywords: ['online tutoring', 'O Levels tutoring', 'A Levels tutoring', 'IGCSE tutoring', 'IB tutoring', 'professional tutors', 'online education', 'expert tutoring', 'international curriculum'],
  openGraph: {
    title: 'Ace Tutors Global - Expert Online Tutoring Services',
    description: 'Expert online tutoring for O Levels, A Levels, IGCSE & more. Get personalized learning experience from professional tutors.',
    url: 'https://www.acetutorsglobal.com',
    siteName: 'Ace Tutors Global',
    type: 'website',
    locale: 'en_US',
    images: [
      {
        url: '/assets/Logo-main.svg',
        width: 1200,
        height: 630,
        alt: 'Ace Tutors Global Logo'
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Ace Tutors Global - Expert Online Tutoring Services',
    description: 'Expert online tutoring for O Levels, A Levels, IGCSE & more',
    images: ['/assets/Logo-main.svg']
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large'
    }
  },
  alternates: {
    canonical: 'https://www.acetutorsglobal.com'
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${poppins.variable} ${plusJakartaSans.variable} antialiased`}
      >
        <Navbar />
        {children}
        <SpeedInsights />        
        <Footer />
      </body>
    </html>
  );
}
