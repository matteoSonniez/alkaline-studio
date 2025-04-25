"use client";
import React, { useState, useEffect, useRef } from "react";
import Header from "@/components/Header2";
import Image1 from "@/imgprod/img1.jpeg";
import Image2 from "@/imgprod/img2.jpeg";
import Image3 from "@/imgprod/img3.jpeg";
import Image4 from "@/imgprod/img4.jpeg";
import Image5 from "@/imgprod/img5.jpeg";
import Image6 from "@/imgprod/img6.jpeg";
import Image7 from "@/imgprod/img7.jpeg";
import Image8 from "@/imgprod/img8.jpeg";
import Image9 from "@/imgprod/img9.jpeg";
import Image10 from "@/imgprod/img10.jpeg";
import Lenis from '@studio-freight/lenis';
import gsap from 'gsap';

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
      smoothWheel: true
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

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="flex flex-col items-center pt-[17vh]">
      {/* mobile version */}
      <div className="flex flex-col space-y-6 pb-10">
        <div className="flex justify-center">
          <img src={Image1.src} className="w-[85vw] h-[66vh] object-cover" alt="" />
        </div>
        <div className="flex justify-center">
          <img src={Image9.src} className="w-[85vw] h-[66vh] object-cover" alt="" />
        </div>
        <div className="flex justify-center">
          <img src={Image3.src} className="w-[85vw] h-[66vh] object-cover" alt="" />
        </div>
        <div className="flex justify-center">
          <img src={Image4.src} className="w-[85vw] h-[66vh] object-cover" alt="" />
        </div>
        <div className="flex justify-center">
          <img src={Image5.src} className="w-[85vw] h-[66vh] object-cover" alt="" />
        </div>
        <div className="flex justify-center">
          <img src={Image6.src} className="w-[85vw] h-[66vh] object-cover" alt="" />
        </div>
        <div className="flex justify-center">
          <img src={Image7.src} className="w-[85vw] h-[66vh] object-cover" alt="" />
        </div>
        <div className="flex justify-center">
          <img src={Image8.src} className="w-[85vw] h-[66vh] object-cover" alt="" />
        </div>
        <div className="flex justify-center">
          <img src={Image9.src} className="w-[85vw] h-[66vh] object-cover" alt="" />
        </div>
        <div className="flex justify-center">
          <img src={Image10.src} className="w-[85vw] h-[66vh] object-cover" alt="" />
        </div>
      </div>
      
      {/* mobile version */}
      <div className="flex-col hidden sm:block">
        <div className="flex space-x-[5vw] mb-[10vh]">
          <img src={Image1.src} className="w-[37vw]" alt="" />
          <img src={Image9.src} className="w-[37vw]" alt="" />
        </div>
        <div className="flex space-x-[5vw] mb-[10vh]">
          <img src={Image3.src} className="w-[37vw]" alt="" />
          <img src={Image4.src} className="w-[37vw]" alt="" />
        </div>
        <div className="flex space-x-[5vw] mb-[10vh]">
          <img src={Image5.src} className="w-[37vw]" alt="" />
          <img src={Image6.src} className="w-[37vw]" alt="" />
        </div>
        <div className="flex space-x-[5vw] mb-[10vh]">
          <img src={Image7.src} className="w-[37vw]" alt="" />
          <img src={Image8.src} className="w-[37vw]" alt="" />
        </div>
        <div className="flex space-x-[5vw] mb-[10vh]">
          <img src={Image9.src} className="w-[37vw]" alt="" />
          <img src={Image10.src} className="w-[37vw]" alt="" />
        </div>
      </div>
    </div>
  );
}

export default Page;
