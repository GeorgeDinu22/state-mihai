import "./admin.css";
import AdminGuard from "./AdminGuard";
import DropDown from "./components/DropDown";
import SideBar from './components/sidebar'
import { Open_Sans } from 'next/font/google';

export const metadata = {
  title: "Panou Admin",
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

export default function AdminLayout({ children }) {
  return (
    <html lang="ro">
      <body className={`${openSans.variable} antialiased adminBody`}>
        <AdminGuard>
            <SideBar/>
            <DropDown/>
            {children}
        </AdminGuard>
      </body>
    </html>
  );
}
