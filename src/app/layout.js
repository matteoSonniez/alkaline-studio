"use client";

import { useState, useEffect, useRef } from "react";
import "./globals.css";
import { useRouter } from "next/navigation";
import gsap from "gsap";
import { Geist, Geist_Mono } from "next/font/google";
import { usePathname } from "next/navigation";
import TheHeader from "@/components/Header/index";
import TheHeaderMobile from "@/components/HeaderMobile";
import { Poppins } from "next/font/google";

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
  const router = useRouter();
  const prevScroll = useRef(0);
  const [isDown, setIsDown] = useState(false);
  // Récupère le path courant
  const overlayPathRef = useRef(null); 
  const pathname = usePathname();
  // Vérifie si le path commence par "/production"
  const startsWithProduction = pathname.startsWith("/productions");

  // État pour déterminer si la largeur de l'écran est supérieure ou égale à 640px
  const [isDesktop, setIsDesktop] = useState(false);
  const [isChangePage, setIsChangePage] = useState(false);

  const testMenu = ({path}) => {
    const overlayPath = overlayPathRef.current;
    setTimeout(() => {
      router.push(path);
    }, 1200);
    console.log("test")
    gsap
    .timeline({
    })
      .set(overlayPath, {
        attr: { d: "M 0 100 V 100 Q 50 100 100 100 V 100 z" },
      })
      .to(
        overlayPath,
        {
          duration: 0.8,
          ease: "power4.in",
          attr: { d: "M 0 100 V 50 Q 50 0 100 50 V 100 z" },
        },
        0
      )
      .to(overlayPath, {
        duration: 0.3,
        ease: "power2",
        attr: { d: "M 0 100 V 0 Q 50 0 100 0 V 100 z" },
      })
      //

      .set(overlayPath, {
        attr: { d: "M 0 0 V 100 Q 50 100 100 100 V 0 z" },
      })
      .to(overlayPath, {
        duration: 0.3,
        delay: 0.5,
        ease: "power2.in",
        attr: { d: "M 0 0 V 50 Q 50 0 100 50 V 0 z" },
      })
      .to(overlayPath, {
        duration: 0.8,
        ease: "power4",
        attr: { d: "M 0 0 V 0 Q 50 0 100 0 V 0 z" },
      });
  };

  useEffect(() => {
    const handleResize = () => {
      setIsDesktop(window.innerWidth >= 640);
    };

    // Vérifie dès le montage
    handleResize();
    window.addEventListener("resize", handleResize);

    // Nettoyage de l'event listener
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    // Set initial scroll position
    prevScroll.current = window.pageYOffset;

    const handleScroll = () => {
      const currentScroll = window.pageYOffset;
      const diff = currentScroll - prevScroll.current;

      if (diff > 10) {
        setIsDown(true);
        prevScroll.current = currentScroll;
      } else if (diff < -10) {
        setIsDown(false);
        prevScroll.current = currentScroll;
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${poppins.variable} bg-blanc`}>
      <svg
        className="overlay absolute inset-0 z-40 pointer-events-none h-screen w-screen"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <path
          ref={overlayPathRef}
          vector-effect="non-scaling-stroke"
          d="M 0 100 V 100 Q 50 100 100 100 V 100 z"
          fill="white"
        />
      </svg>
        {/* Affiche le header si le chemin n'est pas /production */}
        {!startsWithProduction &&
          (isDesktop ? <TheHeader navigatAnime={testMenu} isDown={isDown} /> : <TheHeaderMobile />)}
        {children}
      </body>
    </html>
  );
}
