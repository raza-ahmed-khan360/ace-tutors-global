import type { Metadata } from "next";
import { Poppins, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import ClientLayout from "./components/ClientLayout";

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
  description: 'Ace Tutors Global provides expert online tutoring for O Levels, A Levels, IGCSE, IB & more...',
  openGraph: {
    title: 'Ace Tutors Global - Expert Online Tutoring Services',
    description: 'Expert online tutoring for O Levels, A Levels, IGCSE & more...',
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
      <body className={`${poppins.variable} ${plusJakartaSans.variable} antialiased`}>
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}
