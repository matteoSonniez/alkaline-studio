"use client";
import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Lenis from "@studio-freight/lenis";
import Email from "@/img/email.png";
import Insta from "@/img/insta.png";
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
      <div className="w-[400px] h-[500px] relative">
        <Image
          src="/imgcontact.webp"
          alt="Image 2"
          fill
          className="object-cover transition duration-500 group-hover:[filter:brightness(85%)]"
        />
      </div>
      <div className="flex flex-col">
        <span className="text-black/90 mb-14">
          freelance photographer & producer assistant
        </span>
        <span className="text-black/80 mb-14">
          {" "}
          Based between Paris - marseille
        </span>
        <div className="flex items-center mb-4 space-x-3">
          <img src={Email.src} className="w-4 h-4"></img>
          <a
            className="text-black/80 hover:text-black/50"
            href="mailto:contact.alkaaaline@gmail.com"
          >
            contact.alkaaaline@gmail.com
          </a>
        </div>
        <div className="flex items-center mb-4 space-x-3">
          <img src={Insta.src} className="w-5 h-5"></img>
          <a
            className="text-black/80 hover:text-black/50"
            href="https://www.instagram.com/alkaline.studio/"
            target="_blank"
            rel="noopener noreferrer"
          >
            alkaline.studio
          </a>
        </div>
      </div>
    </div>
  );
}

export default Page;
