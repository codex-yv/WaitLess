import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Queue Eliminator - Skip the Line, Own Your Time | Smart Digital Queuing System",
  description: "Eliminate long waiting lines at banks, hospitals, and government offices. Scan a QR code to join queues digitally, get real-time updates, and reclaim your time. Perfect for businesses and customers.",
  keywords: "queue management, digital queuing, virtual waiting room, QR code check-in, bank queue system, hospital waiting room, government office queue, appointment scheduling, customer flow management, reduce wait times",
  authors: [{ name: "Queue Eliminator" }],
  creator: "Queue Eliminator",
  publisher: "Queue Eliminator",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://queueeliminator.com',
    title: 'Queue Eliminator - Skip the Line, Own Your Time',
    description: 'Eliminate long waiting lines at banks, hospitals, and government offices. Scan a QR code to join queues digitally, get real-time updates, and reclaim your time.',
    siteName: 'Queue Eliminator',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Queue Eliminator - Smart Digital Queuing System',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Queue Eliminator - Skip the Line, Own Your Time',
    description: 'Eliminate long waiting lines at banks, hospitals, and government offices. Scan a QR code to join queues digitally.',
    images: ['/twitter-image.jpg'],
    creator: '@queueeliminator',
  },
  verification: {
    google: 'your-google-verification-code',
  },
  alternates: {
    canonical: 'https://queueeliminator.com',
  },
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
