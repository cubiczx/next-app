import type { Metadata, Viewport } from "next";
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

export const metadata: Metadata = {
  title: {
    default: "Next.js Movies App | Modern Movie Catalog",
    template: "%s | Next.js Movies App",
  },
  description: "Modern movie catalog application built with Next.js 16 App Router, featuring static site generation, dynamic routes with SEO-friendly slugs, and streaming service inspired design with glassmorphism effects.",
  keywords: ["Next.js", "React", "Movies", "TypeScript", "SCSS", "Sass", "Tailwind CSS", "Static Site Generation", "SSG", "App Router", "Movie Catalog", "Streaming Service"],
  authors: [{ name: "Xavier Palacín Ayuso", url: "https://github.com/cubiczx" }],
  creator: "Xavier Palacín Ayuso",
  publisher: "Xavier Palacín Ayuso",
  metadataBase: new URL("https://next-app-cubiczx.netlify.app"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://next-app-cubiczx.netlify.app",
    title: "Next.js Movies App | Modern Movie Catalog",
    description: "Modern movie catalog with Next.js 16, App Router, SSG and streaming service design",
    siteName: "Next.js Movies App",
    images: [
      {
        url: "/og-image.jpg",
        width: 1000,
        height: 734,
        alt: "Next.js Movies App Preview",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Next.js Movies App | Modern Movie Catalog",
    description: "Modern movie catalog with Next.js 16, App Router, SSG and streaming service design",
    creator: "@cubiczx",
    images: ["/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#0f0c29" },
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
