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
  const [isDown, setIsDown] = useState(false);
  const prevScroll = useRef(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 100);
    return () => clearTimeout(timer);
  }, []);

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

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className={`${ral.className} flex flex-col items-center pt-[17vh]`}>
      {/* mobile version */}
      <div className="flex flex-col space-y-6 pb-10 sm:hidden">
        <div className="flex justify-center w-[85vw] h-[66vh] relative">
          <Image
            src="/prodimages/img1.webp"
            alt="Image 2"
            fill
            className="object-cover"
          />
        </div>
        <div className="flex justify-center w-[85vw] h-[66vh] relative">
          <Image
            src="/prodimages/img11.webp"
            alt="Image 2"
            fill
            className="object-cover"
          />
        </div>
        <div className="flex justify-center w-[85vw] h-[66vh] relative">
          <Image
            src="/prodimages/img3.webp"
            alt="Image 2"
            fill
            className="object-cover"
          />
        </div>
        <div className="flex justify-center w-[85vw] h-[66vh] relative">
          <Image
            src="/prodimages/img4.webp"
            alt="Image 2"
            fill
            className="object-cover"
          />
        </div>
        <div className="flex justify-center w-[85vw] h-[66vh] relative">
          <Image
            src="/prodimages/img5.webp"
            alt="Image 2"
            fill
            className="object-cover"
          />
        </div>
        <div className="flex justify-center w-[85vw] h-[66vh] relative">
          <Image
            src="/prodimages/img6.webp"
            alt="Image 2"
            fill
            className="object-cover"
          />
        </div>
        <div className="flex justify-center w-[85vw] h-[66vh] relative">
          <Image
            src="/prodimages/img1.webp"
            alt="Image 2"
            fill
            className="object-cover"
          />
        </div>
        <div className="flex justify-center w-[85vw] h-[66vh] relative">
          <Image
            src="/prodimages/img8.webp"
            alt="Image 2"
            fill
            className="object-cover"
          />
        </div>
        <div className="flex justify-center w-[85vw] h-[66vh] relative">
          <Image
            src="/prodimages/img9.webp"
            alt="Image 2"
            fill
            className="object-cover"
          />
        </div>
        <div className="flex justify-center w-[85vw] h-[66vh] relative">
          <Image
            src="/prodimages/img10.webp"
            alt="Image 2"
            fill
            className="object-cover"
          />
        </div>
      </div>

      {/* desktop version */}
      <div className="flex-col hidden sm:block">
        <div className="flex space-x-[5vw] mb-[10vh]">
          <div className="group w-[37vw] h-[80vh] relative overflow-hidden">
            <div className="absolute z-50 w-full top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-white text-center text-[38px] opacity-0 group-hover:opacity-100 transition-opacity duration-500">
              IconMagazine France
              <br />
              1st issue
            </div>
            <Image
              src="/prodimages/img1.webp"
              alt="Image 2"
              fill
              className="object-cover transition duration-500 group-hover:[filter:brightness(85%)]"
            />
          </div>

          <div className="group w-[37vw] h-[80vh] relative overflow-hidden">
            <div className="absolute z-50 w-full top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-white text-center text-[38px] opacity-0 group-hover:opacity-100 transition-opacity duration-500">
              Balanciaga x Lamborghini
            </div>
            <Image
              src="/prodimages/img11.webp"
              alt="Image 2"
              fill
              className="object-cover transition duration-500 group-hover:[filter:brightness(85%)]"
            />
          </div>
        </div>
        <div className="flex space-x-[5vw] mb-[10vh]">
          <div className="group w-[37vw] h-[80vh] relative overflow-hidden">
            <div className="absolute z-50 w-full top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-white text-center text-[38px] opacity-0 group-hover:opacity-100 transition-opacity duration-500">
              NY Times Fashion
              <br />
              Marseille editorial
            </div>
            <Image
              src="/prodimages/img3.webp"
              alt="Image 2"
              fill
              className="object-cover transition duration-500 group-hover:[filter:brightness(85%)]"
            />
          </div>
          <div className="group w-[37vw] h-[80vh] relative overflow-hidden">
            <div className="absolute z-50 w-full top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-white text-center text-[38px] opacity-0 group-hover:opacity-100 transition-opacity duration-500">
              Alicia Keys
              <br />
              «Stay» music video
            </div>
            <Image
              src="/prodimages/img4.webp"
              alt="Image 2"
              fill
              className="object-cover transition duration-500 group-hover:[filter:brightness(85%)]"
            />
          </div>
        </div>
        <div className="flex space-x-[5vw] mb-[10vh]">
          <div className="group w-[37vw] h-[80vh] relative overflow-hidden">
            <div className="absolute z-50 w-full top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-white text-center text-[38px] opacity-0 group-hover:opacity-100 transition-opacity duration-500">
              Lancôme
              <br />
              ABSOLUTE Campaign
            </div>
            <Image
              src="/prodimages/img5.webp"
              alt="Image 2"
              fill
              className="object-cover transition duration-500 group-hover:[filter:brightness(85%)]"
            />
          </div>
          <div className="group w-[37vw] h-[80vh] relative overflow-hidden">
            <div className="absolute z-50 w-full top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-white text-center text-[38px] opacity-0 group-hover:opacity-100 transition-opacity duration-500">
              Jacquemus
              <br />
              «Le Papier»
            </div>
            <Image
              src="/prodimages/img8.webp"
              alt="Image 2"
              fill
              className="object-cover transition duration-500 group-hover:[filter:brightness(85%)]"
            />
          </div>
        </div>
        <div className="flex space-x-[5vw] mb-[10vh]">
          <div className="group w-[37vw] h-[80vh] relative overflow-hidden">
            <div className="absolute z-50 w-full top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-white text-center text-[38px] opacity-0 group-hover:opacity-100 transition-opacity duration-500">
              L'Occitane
              <br />
              «Osmanthus» Campaign
            </div>
            <Image
              src="/prodimages/img9.webp"
              alt="Image 2"
              fill
              className="object-cover transition duration-500 group-hover:[filter:brightness(85%)]"
            />
          </div>
          <div className="group w-[37vw] h-[80vh] relative overflow-hidden">
            <div className="absolute z-50 w-full top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-white text-center text-[38px] opacity-0 group-hover:opacity-100 transition-opacity duration-500">
              IconMagazine France
              <br />
              1st issue
            </div>
            <Image
              src="/prodimages/img10.webp"
              alt="Image 2"
              fill
              className="object-cover transition duration-500 group-hover:[filter:brightness(85%)]"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Page;
