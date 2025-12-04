"use client";

import { useState, useEffect, useRef } from "react";
import "./globals.css";
import { useRouter } from "next/navigation";
import gsap from "gsap";
import { usePathname } from "next/navigation";
import TheHeader from "@/components/Header/index";
import TheHeaderMobile from "@/components/HeaderMobile";
import localFont from "next/font/local";

const appFont = localFont({
  src: "../../public/font/LiberationSerif-Regular.ttf",
  display: "swap",
});

export default function RootLayout({ children }) {
  const router = useRouter();
  const prevScroll = useRef(0);
  const [isDown, setIsDown] = useState(false);
  const overlayPathRef = useRef(null);
  const pathname = usePathname();
  const startsWithProduction = pathname.startsWith("/productions");
  const [isDesktop, setIsDesktop] = useState(false);

  const testMenu = ({ path }) => {
    const overlayPath = overlayPathRef.current;
    setTimeout(() => router.push(path), 1200);
    gsap.timeline()
      .set(overlayPath, { attr: { d: "M 0 100 V 100 Q 50 100 100 100 V 100 z" } })
      .to(overlayPath, { duration: 0.8, ease: "power4.in", attr: { d: "M 0 100 V 50 Q 50 0 100 50 V 100 z" } }, 0)
      .to(overlayPath, { duration: 0.3, ease: "power2", attr: { d: "M 0 100 V 0 Q 50 0 100 0 V 100 z" } })
      .set(overlayPath, { attr: { d: "M 0 0 V 100 Q 50 100 100 100 V 0 z" } })
      .to(overlayPath, { duration: 0.3, delay: 0.5, ease: "power2.in", attr: { d: "M 0 0 V 50 Q 50 0 100 50 V 0 z" } })
      .to(overlayPath, { duration: 0.8, ease: "power4", attr: { d: "M 0 0 V 0 Q 50 0 100 0 V 0 z" } });
  };

  useEffect(() => {
    const handleResize = () => setIsDesktop(window.innerWidth >= 640);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    prevScroll.current = window.pageYOffset;

    const handleScroll = () => {
      const currentScroll = window.pageYOffset;
      const diff = currentScroll - prevScroll.current;

      if (diff > 10) {
        // On scroll down de plus de 10px → active isDown
        setIsDown(true);
        prevScroll.current = currentScroll;
      } else if (currentScroll < window.innerHeight * 0.03) {
        // Quand on remonte dans les 10vh du haut → désactive isDown
        setIsDown(false);
        prevScroll.current = currentScroll;
      }
      // Sinon on ne touche pas à isDown
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <html lang="en">
      <body className={`${appFont.className} bg-blanc`}>
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
        {!startsWithProduction &&
          (isDesktop ? <TheHeader navigatAnime={testMenu} isDown={isDown} /> : <TheHeaderMobile navigatAnime={testMenu} />)}
        {children}
      </body>
    </html>
  );
}
