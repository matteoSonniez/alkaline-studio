"use client";
import { useEffect, useState } from "react";
import {
  Freehand,
  Inconsolata,
} from "next/font/google";
import Insta from "@/img/insta.png";

const poppins = Freehand({
  subsets: ["latin"],
  weight: ["400"],
  display: "swap",
});

const poiret = Inconsolata({
  subsets: ["latin"],
  weight: ["300"],
  display: "swap",
});

const INSTAGRAM_URL = "https://instagram.com/alkaline.studio";

const Header = ({ navigatAnime, isDown }) => {
  return (
    <div
      className={`fixed w-full top-0 pt-[8vh] px-[25vw] justify-between flex transform transition-transform duration-300 ${
        isDown ? "-translate-y-[15vh]" : "translate-y-0"
      }`}
    >
      <button
        className={`text-black text-[18px] tracking-wider ${poiret.className}`}
        onClick={() => navigatAnime({ path: "/" })}
      >
        alkaline studio.
      </button>
      <div
        className={`flex space-x-8 text-gray-700 items-center tracking-wider ${
          poiret.className
        }`}
      >
        <button onClick={() => navigatAnime({ path: "/production" })}>
          production
        </button>
        <button onClick={() => navigatAnime({ path: "/contact" })}>
          contact
        </button>
        {/* Lien Instagram */}
        <a
          href={INSTAGRAM_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="cursor-pointer"
        >
          <img src={Insta.src} alt="Instagram icon" className="w-5 h-5" />
        </a>
      </div>
    </div>
  );
};

export default Header;
