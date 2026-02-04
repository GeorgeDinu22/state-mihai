import {Open_Sans } from 'next/font/google';

export const metadata = {
  title: "Autentificare Panou Admin",
  robots: {
    index: false,
    follow: false,
    nocache: true,
    googleBot: {
      index: false,
      follow: false,
    },
  },
};

const openSans = Open_Sans({
  weight: ['400', '600', '700', '800'],
  subsets: ['latin'],
  display: 'swap',
  variable: "--font-open-sans",
});

export default function LoginLayout({ children }) {
  return (
    <html lang="ro">
      <body className={`${openSans.variable} antialiased adminBody`}>
        {children}
      </body>
    </html>
  );
}