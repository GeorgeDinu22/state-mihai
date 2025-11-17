import type { Metadata } from "next";
import { Fugaz_One, Open_Sans } from 'next/font/google';
import "./globals.css";
import { config } from "@fortawesome/fontawesome-svg-core";
import "@fortawesome/fontawesome-svg-core/styles.css";
config.autoAddCss = false;

import Header from '../localComponents/Header';
import Footer from '../localComponents/Footer';

const fugaz = Fugaz_One({
  weight: '400',
  subsets: ['latin'],
  display: 'swap',
  variable: "--font-fugaz",
});

const openSans = Open_Sans({
  weight: ['400', '600', '700', '800'],
  subsets: ['latin'],
  display: 'swap',
  variable: "--font-open-sans",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://mihaistate.ro"),

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
        url: "/profile.png", 
        width: 1080,
        height: 1080,
      },
    ],
  },
  
  twitter: {
    card: "summary_large_image",
    title: "Mihai State – Antrenor Personal",
    description: "Transformă-ți corpul și mintea prin coaching personalizat.",
    images: ["/profile.png"],
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
        className={`${fugaz.variable} ${openSans.variable} antialiased`}
      >
        <Header/>
        {children}
        <Footer/>
      </body>
    </html>
  );
}
