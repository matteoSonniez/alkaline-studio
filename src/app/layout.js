"use client";

import "./globals.css";
import { Geist, Geist_Mono } from "next/font/google";
import { usePathname } from "next/navigation";
import TheHeader from "@/components/Header/index";
import TheHeaderMobile from "@/components/HeaderMobile";
import { Inter, Roboto, Poppins } from "next/font/google";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  display: "swap",
});


export default function RootLayout({ children }) {
  // Récupère le path courant
  const pathname = usePathname();

  // Vérifie si le path commence par "/production"
  const startsWithProduction = pathname.startsWith("/production");

  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${poppins.variable} bg-blanc`}>
        {/* N'affiche pas le header si on est sur /production */}
        {!startsWithProduction && <TheHeaderMobile />}
        {children}
      </body>
    </html>
  );
}
