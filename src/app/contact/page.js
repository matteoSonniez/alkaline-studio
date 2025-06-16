"use client";
import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Lenis from "@studio-freight/lenis";
import { Poppins, Raleway } from "next/font/google";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400"],
  display: "swap",
});

const ral = Raleway({
  subsets: ["latin"],
  weight: ["400"],
  display: "swap",
});

function Page() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Initialize Lenis for smooth scroll
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    return () => lenis.destroy();
  }, []);

  
  return (
    <div className={`${ral.className} flex flex-col items-center pt-[17vh]`}>
      <span className="text-black">test</span>
    </div>
  );
}

export default Page;
