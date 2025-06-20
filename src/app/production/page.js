"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Lenis from "@studio-freight/lenis";
import { Card } from "@/components/ProdCard";
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


  function chunk(arr, size) {
    const chunks = [];
    for (let i = 0; i < arr.length; i += size) {
      chunks.push(arr.slice(i, i + size));
    }
    return chunks;
  }
  
  const IMAGES = [
    {
      src: "/prodimages/img1.webp",
      alt: "Icon Magazine France – First issue editorial",
      title: (
        <>
          Icon Magazine France
          <br />
          first issue – editorial
        </>
      ),
    },
    {
      src: "/prodimages/img11.webp",
      alt: "Balenciaga x Lamborghini",
      title: <>Balenciaga x Lamborghini</>,
    },
    {
      src: "/prodimages/img3.webp",
      alt: "NY Times Fashion – Marseille editorial",
      title: (
        <>
          NY Times Fashion
          <br />
          Marseille editorial
        </>
      ),
    },
    {
      src: "/prodimages/img4.webp",
      alt: "Alicia Keys – Stay music video",
      title: (
        <>
          Alicia Keys
          <br />
          Stay - Music video
        </>
      ),
    },
    {
      src: "/prodimages/img5.webp",
      alt: "Lancôme – ABSOLUTE Campaign",
      title: (
        <>
          Lancôme
          <br />
          ABSOLUTE Campaign
        </>
      ),
    },
    {
      src: "/prodimages/img8.webp",
      alt: "Jacquemus – Le Papier",
      title: (
        <>
          Jacquemus
          <br />
          Le Papier show
        </>
      ),
    },
    {
      src: "/prodimages/img9.webp",
      alt: "L'Occitane – Osmanthus Campaign",
      title: (
        <>
          L'Occitane
          <br />
          OSMANTHUS Campaign
        </>
      ),
    },
    {
      src: "/prodimages/img10.webp",
      alt: "Sonia Rykiel – SS24",
      title: (
        <>
          Sonia Rykiel
          <br />
          SS24
        </>
      ),
    },
  ];

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
    <div
      className={`${ral.className} flex flex-col items-center pt-[13vh] sm:pt-[17vh]`}
    >
      {/* version mobile */}
      <div className="flex flex-col space-y-6 pb-10 sm:hidden">
        {IMAGES.map((img, idx) => (
          <Card
            key={idx}
            src={img.src}
            alt={img.alt}
            title={img.title}
            classMobileSize="w-[85vw] h-[66vh]"
          />
        ))}
      </div>

      {/* version desktop */}
      <div className="flex-col hidden sm:block">
        <div className="flex space-x-[5vw] mb-[10vh]">
          <div className="group w-[37vw] h-[80vh] relative overflow-hidden">
            <div className="absolute z-50 w-full top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-white text-center text-[38px] opacity-0 group-hover:opacity-100 transition-opacity duration-500">
              Icon Magazine France
              <br />
              first issue - editorial
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
              Balenciaga x Lamborghini
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
              Stay - Music video
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
              Le Papier show
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
              OSMANTHUS Campaign
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
              Sonia Rykiel
              <br />
              SS24
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
