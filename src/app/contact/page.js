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
    <div
      className={`${ral.className} flex items-center pt-[22vh] px-[15vw] space-x-20 justify-center`}
    >
      <div className="w-[30vw] h-[64vh] relative">
        <Image
          src="/imgcontact.webp"
          alt="Image 2"
          fill
          className="object-cover transition duration-500 group-hover:[filter:brightness(85%)]"
        />
      </div>
      <div className="flex flex-col">
        <span className="text-black/90 mb-12">
          freelance photographer & producer assistant
        </span>
        <span className="text-black/80 mb-12">Paris - marseille</span>
        <a className="text-black/80 mb-3 hover:text-black/50" href="mailto:contact.alkaaaline@gmail.com">contact.alkaaaline@gmail.com</a>
        <a
          className="text-black/80 hover:text-black/50"
          href="https://www.instagram.com/alkaline.studio/"
          target="_blank"
          rel="noopener noreferrer"
        >
          @alkaline.studio
        </a>
      </div>
    </div>
  );
}

export default Page;
