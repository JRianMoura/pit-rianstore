import Header from "@/components/Header";
import "./globals.css";
import { Rajdhani } from "next/font/google";
import Footer from "@/components/Footer";
import { Toaster } from "react-hot-toast";

const rajdhani = Rajdhani({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-radjhani",
});

export const metadata = {
  title: "Rian Store",
  description: "Rian Store Universidade Cruzeiro do Sul",
};

export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR">
      <body className={`${rajdhani.variable} antialiased`}>
        <Toaster position="top-right" reverseOrder={false} />
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
