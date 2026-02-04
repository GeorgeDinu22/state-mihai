import './checkout.css';
import { Open_Sans } from 'next/font/google';

export const metadata = {
  title: "Finalizare plată – Mihai State",
  description: "Procesare securizată a plății.",
};

const openSans = Open_Sans({
  weight: ['400', '600', '700', '800'],
  subsets: ['latin'],
  display: 'swap',
  variable: "--font-open-sans",
});

export default function CheckoutLayout({ children }) {
  return (
    <html lang="ro">
      <body className={`${openSans.variable} antialiased`}>
        <div>
          {children}
        </div>
      </body>
    </html>
  );
}
