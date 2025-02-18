"use client";
import { useEffect, useState } from "react";
import Link from 'next/link';
import { Poppins, Inter, PT_Mono, Cormorant_SC, Caveat, Freehand, Poiret_One } from 'next/font/google';
import Insta from "@/img/insta.png";

const poppins = Freehand({
  subsets: ['latin'],
  weight: ['400'],
  display: 'swap',
});

const poiret = Poiret_One({
  subsets: ['latin'],
  weight: ['400'],
  display: 'swap',
});

const Index = () => {
  return (
    <div className="fixed w-full top-0 pt-[6vh] px-[25vw] justify-between flex">
      <Link href='/'>
        <span className={`text-black text-[20px] tracking-wider ${poppins.className}`}>
          alkaline studio
        </span>
      </Link>
      <div className={`flex space-x-8 text-gray-700 items-center tracking-wider ${poiret.className}`}>
        {/* Utilisation de Link pour la navigation */}
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
