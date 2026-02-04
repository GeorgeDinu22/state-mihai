import type { Metadata } from "next";
import { Open_Sans } from 'next/font/google';

import "../globals.css";

import { config } from "@fortawesome/fontawesome-svg-core";
import "@fortawesome/fontawesome-svg-core/styles.css";
config.autoAddCss = false;


const openSans = Open_Sans({
  weight: ['400', '600', '700', '800'],
  subsets: ['latin'],
  display: 'swap',
  variable: "--font-open-sans",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://statemihai.ro"),

  title: "Mihai State – Antrenor Personal",
  description: "Transformă-ți corpul și mintea prin coaching personalizat.",
  
icons: {
  icon: "/favicon.ico",
},

openGraph: {
    type: "website",
    title: "Mihai State – Antrenor Personal",
    description: "Transformă-ți corpul și mintea prin coaching personalizat.",
    siteName: "Mihai State",
    images: [
      {
        url: "https://statemihai.ro/profile.jpg", 
        width: 1080,
        height: 1080,
        alt: "Mihai State - Antrenor Personal",
      },
    ],
  },
  
  twitter: {
    card: "summary_large_image",
    title: "Mihai State – Antrenor Personal",
    description: "Transformă-ți corpul și mintea prin coaching personalizat.",
    images: ["https://statemihai.ro/profile.jpg"], 
  },
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ro">
      <body
        className={`${openSans.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
