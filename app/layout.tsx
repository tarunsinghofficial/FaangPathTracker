import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { ThemeProvider } from '@/components/ThemeProvider';
import { Github } from 'lucide-react';
import { ClerkProvider } from '@clerk/nextjs';
const inter = Inter({ subsets: ['latin'] });
import Script from 'next/script';

import { siteConfig } from './metadata';

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: siteConfig.name,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: siteConfig.keywords,
  authors: [
    {
      name: "Tarun Singh",
      url: "https://tarunportfolio.vercel.app/",
    },
  ],
  creator: "Tarun Singh",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteConfig.url,
    title: siteConfig.name,
    description: siteConfig.description,
    siteName: siteConfig.name,
    images: [
      {
        url: `${siteConfig.url}/og.png`,
        width: 1200,
        height: 630,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.name,
    description: siteConfig.description,
    images: [
      {
        url: `${siteConfig.url}/og.png`,
      },
    ],
    creator: "@itsTarun24",
  },
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
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html lang="en" suppressHydrationWarning>
        <head>
          <Script async src="https://cloud.umami.is/script.js" data-website-id={process.env.NEXT_PUBLIC_UMAMI_WEBSITE_ID}></Script>
          <meta name="google-site-verification" content={process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION_CODE} />
        </head>
        <body className={inter.className}>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <div className="relative">
              {children}
              <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t">
                <div className="container mx-auto flex flex-col sm:flex-row w-full items-center justify-between gap-4">
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    © {new Date().getFullYear()} FaangPrepTracker.
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Built with ❤️ by <span className="text-blue-500">Tarun Singh</span>
                  </p>
                  <a
                    href="https://github.com/tarunsinghofficial"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-500 dark:text-gray-400 hover:text-blue-500"
                  >
                    <Github className="w-6 h-6 hover:text-blue-500" />
                  </a>
                </div>
              </footer>
              <div className="top-[15rem] md:top-[5rem] left-[0%] z-1 fixed bg-gradient-to-t opacity-50 dark:opacity-100 from-black to-blue-500/50 blur-[5em] rounded-xl transition-all translate-x-[-50%] duration-700 ease-out w-[10rem] md:w-[10rem] h-[20rem] md:h-[60rem] rotate-[40deg]"></div>
              <div className="top-[15rem] md:top-[5rem] right-[0%] z-1 fixed bg-gradient-to-t opacity-50 dark:opacity-100 from-black to-blue-500/50 blur-[5em] rounded-xl transition-all translate-x-[50%] duration-700 ease-out w-[10rem] md:w-[10rem] h-[20rem] md:h-[60rem] rotate-[-40deg]"></div>
            </div>
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}