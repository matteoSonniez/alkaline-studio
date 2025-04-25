"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import {
  Freehand,
  Poiret_One,
  Inconsolata,
} from "next/font/google";
import Insta from "@/img/insta.png";

const poppins = Freehand({
  subsets: ["latin"],
  weight: ["400"],
  display: "swap",
});

const incon = Inconsolata({
  subsets: ["latin"],
  weight: ["400"],
  display: "swap",
});

const INSTAGRAM_USERNAME = "alkaline.studio"; // ← Remplacez par votre nom d'utilisateur
const APP_URL = `instagram://user?username=${INSTAGRAM_USERNAME}`;
const WEB_URL = `https://instagram.com/${INSTAGRAM_USERNAME}`;

const Index = ({navigatAnime}) => {
  const [showHeader, setShowHeader] = useState(true);

  useEffect(() => {
    let lastScrollPos = window.pageYOffset;
    const threshold = 20;
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const currentScrollPos = window.pageYOffset;
          const diff = currentScrollPos - lastScrollPos;

          if (diff > threshold) {
            setShowHeader(false);
            lastScrollPos = currentScrollPos;
          } else if (diff < -threshold) {
            setShowHeader(true);
            lastScrollPos = currentScrollPos;
          }
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Toujours tenter l'app Instagram, fallback web
  const handleInstaClick = () => {
    window.location.href = APP_URL;
    setTimeout(() => {
      window.open(WEB_URL, "_blank", "noopener,noreferrer");
    }, 600);
  };

  return (
    <div
      className={`
        fixed
        w-full
        top-0
        px-[5vw]
        py-[3vh]
        flex
        justify-between
        transition-transform
        duration-300
        bg-white
        z-50
        items-center
        ${showHeader ? "translate-y-0" : "-translate-y-full"}
      `}
    >
      <Link href="/" className="flex items-center">
        <span className={`text-black text-[13px] tracking-wider ${incon.className}`}>
          alkaline studio
        </span>
      </Link>
      <div
        className={`flex space-x-4 text-gray-700 text-[11px] items-center tracking-wider ${incon.className}`}
      >
        <Link href="/production">
          <span>production</span>
        </Link>
        {/* <button onClick={() => navigatAnime({ path: "/production" })}>
          production
        </button> */}
        <Link href="/contact">
          <span>contact</span>
        </Link>
        <button
          onClick={handleInstaClick}
          className="p-1 cursor-pointer"
          aria-label="Voir notre Instagram"
        >
          <img src={Insta.src} alt="Instagram icon" className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

export default Index;
