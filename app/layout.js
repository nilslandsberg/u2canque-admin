import { Inter } from "next/font/google";
import "./globals.css";
import NavBar from "./components/NavBar";
import { NavBarContextProvider } from "./contexts/NavBarContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "U 2 Can Que - Admin",
  description: "Order Management",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <NavBarContextProvider>
          <NavBar />
        </NavBarContextProvider>
        {children}
      </body>
    </html>
  );
}
