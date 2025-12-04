"use client";
import React, { useEffect } from "react";
import Image from "next/image";
import Lenis from "@studio-freight/lenis";
import Email from "@/img/email.png";
import Insta from "@/img/insta.png";

function Page() {
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
      className={`flex flex-col md:flex-row items-center justify-center pt-[16vh] md:pt-[22vh] px-6 sm:px-10 md:px-[15vw] gap-8 md:gap-20`}
    >
      <div className="relative w-full h-[50vh] sm:h-[60vh] md:w-[400px] md:h-[500px]">
        <Image
          src="/imgcontact.webp"
          alt="Contact image"
          fill
          sizes="(max-width: 768px) 100vw, 400px"
          className="object-cover transition duration-500 group-hover:[filter:brightness(85%)]"
        />
      </div>
      <div className="flex flex-col mt-6 md:mt-0 items-center md:items-start text-center md:text-left">
        <span className="text-black/90 mb-6 md:mb-14 text-base sm:text-lg md:text-xl">
          freelance photographer
        </span>
        <span className="text-black/80 mb-8 md:mb-14 text-sm sm:text-base">
          {" "}
          Paris - Worldwide
        </span>
        <div className="flex items-center justify-center md:justify-start mb-3 sm:mb-4 space-x-3">
          <img src={Email.src} className="w-4 h-4 sm:w-5 sm:h-5"></img>
          <a
            className="text-black/80 hover:text-black/50"
            href="mailto:contact.alkaaaline@gmail.com"
          >
            contact.alkaaaline@gmail.com
          </a>
        </div>
        <div className="flex items-center justify-center md:justify-start mb-3 sm:mb-4 space-x-3">
          <img src={Insta.src} className="w-5 h-5 sm:w-6 sm:h-6"></img>
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
