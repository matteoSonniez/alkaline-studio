"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import {
  Freehand,
  Poiret_One,
} from "next/font/google";
import Insta from "@/img/insta.png";

const poppins = Freehand({
  subsets: ["latin"],
  weight: ["400"],
  display: "swap",
});

const poiret = Poiret_One({
  subsets: ["latin"],
  weight: ["400"],
  display: "swap",
});

const Index = () => {
  const [showHeader, setShowHeader] = useState(true);

  useEffect(() => {
    let lastScrollPos = window.pageYOffset; // Position de scroll initiale
    const threshold = 20;                   // Seuil de 20px pour déclencher l'action
    let ticking = false;                    // Pour éviter de trop déclencher la callback

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const currentScrollPos = window.pageYOffset;
          const diff = currentScrollPos - lastScrollPos;

          // Si on a descendu de >= 20px depuis lastScrollPos => on masque le header
          if (diff > threshold) {
            setShowHeader(false);
            lastScrollPos = currentScrollPos; // On met à jour la position de référence
          }
          // Si on est remonté de >= 20px depuis lastScrollPos => on ré-affiche le header
          else if (diff < -threshold) {
            setShowHeader(true);
            lastScrollPos = currentScrollPos; // On met à jour la position de référence
          }
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

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
        ${showHeader ? "translate-y-0" : "-translate-y-full"}
      `}
    >
      <Link href="/">
        <span className={`text-black text-[15px] tracking-wider ${poppins.className}`}>
          alkaline studio
        </span>
      </Link>
      <div
        className={`flex space-x-8 text-gray-700 text-[12px] items-center tracking-wider ${poiret.className}`}
      >
        <Link href="/production">
          <span>production</span>
        </Link>
        <Link href="/contact">
          <span>contact</span>
        </Link>
        <img src={Insta.src} alt="insta" className="w-5 h-5" />
      </div>
    </div>
  );
};

export default Index;
