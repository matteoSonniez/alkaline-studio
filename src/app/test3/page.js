"use client";

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from '@studio-freight/lenis';
import Image from "next/image";
import Test from "@/img/image8.png";
import Test2 from "@/img/image5.png";
import Test3 from "@/img/image6.png";
import Test4 from "@/img/image7.png";
import Test5 from "@/img/image9.png";
import Test6 from "@/img/img2.png";
import Test7 from "@/img/img3.png";
import Test14 from "@/img/image3.png";
import Test8 from "@/img/img4.png";
import Test9 from "@/img/img5.png";
import Test10 from "@/img/img6.png";
import Test11 from "@/img/img7.png";
import Test12 from "@/img/img8.png";
import Test13 from "@/img/img9.png";

gsap.registerPlugin(ScrollTrigger);

export default function Home() {
  const containerRef1 = useRef(null);
  const containerRef2 = useRef(null);

  const imageRef1 = useRef(null);
  const imageRef2 = useRef(null);
  const imageRef3 = useRef(null);
  const imageRef4 = useRef(null);
  const imageRef11 = useRef(null);
  const imageRef12 = useRef(null);
  const imageRef13 = useRef(null);

  useEffect(() => {
    // Animation d'introduction
    gsap.set(".mask-rect", {
      attr: {
        width: "100%",
        height: "100%",
        x: "0%",
        y: "0%"
      }
    });

    gsap.set(".border-container", {
      width: "100vw",
      height: "100vh"
    });

    const tl = gsap.timeline();
    tl.to([".mask-rect", ".border-container"], {
      attr: {
        width: "65%",
        height: "60%",
        x: "17.5%",
        y: "20%"
      },
      width: "65vw",
      height: "60vh",
      duration: 2,
      ease: "power2.inOut"
    });

    gsap.fromTo("#imageMask rect:first-child",
      { attr: { opacity: 1 } },
      {
        attr: { opacity: 0 },
        duration: 2,
        ease: "power2.inOut"
      }
    );

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      direction: 'vertical',
      smooth: true,
      smoothTouch: false,
      touchMultiplier: 2,
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    lenis.on('scroll', ScrollTrigger.update);
    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });

    gsap.to(imageRef1.current, {
      yPercent: 50,
      ease: "none",
      scrollTrigger: {
        trigger: imageRef1.current.parentElement,
        start: "center center",
        end: "bottom top",
        scrub: true,
      },
    });

    [imageRef11, imageRef12, imageRef13].forEach(ref => {
      gsap.fromTo(ref.current,
        {
          filter: "grayscale(100%)"
        },
        {
          filter: "grayscale(0%)",
          scrollTrigger: {
            trigger: ref.current,
            start: "top center",
            end: "center top",
            scrub: true,
            toggleActions: "play reverse play reverse"
          }
        }
      );
    });

    return () => {
      lenis.destroy();
      gsap.ticker.remove();
    };
  }, []);

  return (
    <div className="flex flex-col">
      <div className="relative flex w-screen items-center justify-center h-[100vh]">
        <div
          className="h-[60vh] w-[65vw] border-[15px] border-gris flex justify-center items-center overflow-hidden"
        >
          <Image
            ref={imageRef1}
            src={Test14}
            alt="Parallax Image"
            className="object-cover relative"
          />
        </div>
      </div>
      {/* Le reste du code reste identique */}
      <div className="flex flex-col px-[16vw]">
        <div className="w-full flex relative justify-center ml-[5vh]">
          <div className="w-[20vw] h-[50vh] mt-[7vh]">
            <Image
              src={Test6}
              alt="Parallax Image"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="w-[28vw] h-[65vh] ml-[8vw] border-[15px] border-gris">
            <Image
              src={Test7}
              alt="Parallax Image"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
        <div className="w-full flex relative mt-[10vh]">
          <div className="w-[30vw] h-[70vh]">
            <Image
              src={Test8}
              alt="Parallax Image"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="w-[21vw] h-[55vh] ml-[9vw] mt-[10vh]">
            <Image
              src={Test9}
              alt="Parallax Image"
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        <div className="flex justify-between mt-[12vh]">
          <div
            className="h-[47vh] w-[19vw] relative overflow-hidden flex  border-[15px] border-gris"
          >
            <Image
              ref={imageRef11}
              src={Test10}
              alt="Parallax Image"
              className="w-full h-full object-cover [filter:grayscale(100%)]"
            />
          </div>
          <div
            className="h-[47vh] w-[19vw] relative overflow-hidden flex  border-[15px] border-gris"
          >
            <Image
              ref={imageRef12}
              src={Test11}
              alt="Parallax Image"
              className="w-full h-full object-cover [filter:grayscale(100%)]"
            />
          </div>
          <div
            className="h-[47vh] w-[19vw] relative overflow-hidden flex  border-[15px] border-gris"
          >
            <Image
              ref={imageRef13}
              src={Test12}
              alt="Parallax Image"
              className="w-full h-full object-cover [filter:grayscale(100%)]"
            />
          </div>
        </div>

        <div className="mt-[50vh] h-[100vh] bg-beige w-[20vw] relative overflow-hidden flex items-center justify-center">
          <p className="text-white">Another Section</p>
        </div>
      </div>
    </div>
  );
}

