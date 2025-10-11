"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { useRouter } from "next/navigation";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import useIsMobile from "@/hooks/useIsMobile";

// Pour forcer le rendu client-side et éviter tout flash SSR
export const dynamic = "force-dynamic";

export default function Page() {
  const router = useRouter();
  const isMobile = useIsMobile(640);
  const containerRef = useRef(null);
  const testRef = useRef(null);

  // Loader global tant que toutes les images ne sont pas chargées
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    if (document.readyState === "complete") {
      setIsLoaded(true);
    } else {
      const onLoad = () => setIsLoaded(true);
      window.addEventListener("load", onLoad);
      return () => window.removeEventListener("load", onLoad);
    }
  }, []);

  // GSAP + ScrollTrigger exécutés une fois toutes les images prêtes
  useEffect(() => {
    if (!isLoaded || isMobile) return;

    gsap.registerPlugin(ScrollTrigger);

    // Animations d'intro
    gsap.to(".unicDiv", {
      x: "-100vw",
      duration: 1,
      delay: 3,
      ease: "power2.inOut",
    });

    // Setup des masques et bordures
    gsap.set(".mask-rect, .mask-rect2", {
      attr: { width: "100%", height: "100%", x: "0%", y: "0%" },
    });
    gsap.set(".border-container, .border-container2", {
      width: "100vw",
      height: "100vh",
    });

    // Timelines de rétrécissement
    const tl1 = gsap.timeline();
    tl1.to([".mask-rect", ".border-container"], {
      attr: { width: "65%", height: "60%", x: "17.5%", y: "20%" },
      width: "65vw",
      height: "60vh",
      duration: 2,
      ease: "power2.inOut",
    });
    const tl2 = gsap.timeline();
    tl2.to([".mask-rect2", ".border-container2"], {
      attr: { width: "65%", height: "60%", x: "17.5%", y: "20%" },
      width: "65vw",
      height: "60vh",
      duration: 2,
      ease: "power2.inOut",
    });

    // Fondu des premiers rectangles de mask
    gsap.fromTo(
      "#imageMask rect:first-child",
      { attr: { opacity: 1 } },
      { attr: { opacity: 0 }, duration: 2, ease: "power2.inOut" }
    );
    gsap.fromTo(
      "#imageMask2 rect:first-child",
      { attr: { opacity: 1 } },
      { attr: { opacity: 0 }, duration: 2, ease: "power2.inOut" }
    );

    // Slide-in du carousel après 3s
    setTimeout(() => {
      if (containerRef.current) {
        gsap.to(containerRef.current, {
          marginLeft: 0,
          duration: 1,
          ease: "power2.inOut",
        });
      }
    }, 3000);

    // Auto-scroll infini + scroll manuel
    const scrollWidth = containerRef.current
      ? containerRef.current.scrollWidth / 2
      : 0;
    const progress = { current: 0 };
    const manual = { current: 0 };

    const autoScroll = gsap.to(progress, {
      current: 1,
      duration: 45,
      delay: 3.5,
      ease: "none",
      repeat: -1,
      onUpdate: () => {
        const total = (progress.current + manual.current / scrollWidth) % 1;
        gsap.set(containerRef.current, { x: -scrollWidth * total });
        if (testRef.current) {
          const pw = window.innerWidth;
          const tw = pw * 0.1;
          const xPos = -tw + (pw + tw) * total;
          gsap.set(testRef.current, { x: xPos });
        }
      },
    });

    const handleWheel = (e) => {
      e.preventDefault();
      manual.current = (manual.current + e.deltaY * 0.3) % scrollWidth;
    };
    window.addEventListener("wheel", handleWheel, { passive: false });

    return () => {
      autoScroll.kill();
      ScrollTrigger.getAll().forEach((t) => t.kill());
      window.removeEventListener("wheel", handleWheel);
    };
  }, [isLoaded]);

  // Affiche loader tant que les images ne sont pas chargées
  if (!isLoaded) {
    return (
      <div className="flex items-center justify-center h-screen bg-white">
        <span className="text-lg">Chargement des images…</span>
      </div>
    );
  }

  // ---- RENDU MOBILE UNIQUEMENT ----
  if (isMobile) {
    return (
      <div className="flex flex-col px-[10vw] mt-[15vh] testup">
        <div className="w-[80vw] relative h-[70vh] mb-[7vh]">
          <Image
            priority
            src="/img11.webp"
            alt="Image 11"
            fill
            className="object-cover"
          />
        </div>
        <div className="w-[65vw] relative h-[50vh] mb-[7vh]">
          <Image
            src="/img18.webp"
            alt="Image 18"
            fill
            className="object-cover"
          />
        </div>
        <div className="w-[80vw] relative h-[65vh] mb-[7vh]">
          <Image
            src="/img12.webp"
            alt="Image 12"
            fill
            className="object-cover"
          />
        </div>
        <div className="w-[90vw] relative h-[35vh] self-center mb-[7vh]">
          <Image src="/img5.webp" alt="Image 5" fill className="object-cover" />
        </div>
        <div className="w-[65vw] relative h-[45vh] mb-[7vh]">
          <Image
            src="/img27.webp"
            alt="Image 27"
            fill
            className="object-cover"
          />
        </div>
        <div className="w-[68vw] relative h-[45vh] self-end mb-[7vh]">
          <Image
            src="/img34.webp"
            alt="Image 15"
            fill
            className="object-cover"
          />
        </div>
        <div className="w-[90vw] relative h-[41vh] self-center mb-[7vh]">
          <Image
            src="/img25.webp"
            alt="Image 25"
            fill
            className="object-cover"
          />
        </div>
        <div className="w-[90vw] relative h-[35vh] self-center mb-[7vh]">
          <Image
            src="/img35.webp"
            alt="Image 25"
            fill
            className="object-cover"
          />
        </div>
        <div className="w-[80vw] relative h-[67vh] mb-[7vh]">
          <Image
            src="/img31.webp"
            alt="Image 31"
            fill
            className="object-cover"
          />
        </div>
        <div className="w-[70vw] relative h-[53vh] mb-[7vh]">
          <Image
            src="/img33.webp"
            alt="Image 2"
            fill
            className="object-cover"
          />
        </div>
        <div className="w-[80vw] relative h-[35vh] mb-[5vh]">
          <Image
            src="/img32.webp"
            alt="Image 28"
            fill
            className="object-cover"
          />
        </div>
        <div className="w-[80vw] relative h-[65vh] mb-[3vh]">
          <Image
            src="/img19.webp"
            alt="Image 19"
            fill
            className="object-cover"
          />
        </div>
        <div className="w-[80vw] relative h-[65vh] mb-[5vh] self-center">
          <Image src="/img8.webp" alt="Image 8" fill className="object-cover" />
        </div>
        <div className="w-[65vw] relative h-[52vh] mb-[7vh] self-center">
          <Image
            src="/img26.webp"
            alt="Image 26"
            fill
            className="object-cover"
          />
        </div>
        <div className="w-[95vw] relative h-[35vh] mb-[9vh] self-center">
          <Image
            src="/img17.webp"
            alt="Image 17"
            fill
            className="object-cover"
          />
        </div>
        <div className="w-[80vw] relative h-[65vh] mb-[3vh]">
          <Image
            src="/img21.webp"
            alt="Image 21"
            fill
            className="object-cover"
          />
        </div>
        <div className="w-[95vw] relative h-[35vh] mb-[9vh] self-center">
          <Image src="/img7.webp" alt="Image 7" fill className="object-cover" />
        </div>
      </div>
    );
  }

  // ---- RENDU DESKTOP UNIQUEMENT ----
  return (
    <div className="h-screen overflow-hidden">
      <div className="w-screen bg-slate-400 h-[2px] absolute bottom-4">
        <div
          ref={testRef}
          className="w-[25vw] h-full bg-gray-200"
          style={{ willChange: "transform" }}
        />
      </div>

      <div className="absolute z-20 w-screen h-screen unicDiv">
        <div className="relative flex w-screen items-center justify-center h-screen overflow-hidden">
          <svg
            className="absolute inset-0 w-full h-full"
            preserveAspectRatio="none"
            aria-hidden="true"
          >
            <defs>
              <mask id="imageMask">
                <rect width="100%" height="100%" fill="white" opacity="0" />
                <rect
                  className="mask-rect"
                  x="0%"
                  y="0%"
                  width="100%"
                  height="100%"
                  fill="white"
                />
              </mask>
            </defs>
          </svg>
          <div
            className="relative w-full h-full"
            style={{
              mask: "url(#imageMask)",
              WebkitMask: "url(#imageMask)",
            }}
          >
            <Image
              src="/img4.webp"
              alt="Image 4"
              fill
              style={{ objectFit: "cover" }}
            />
          </div>
        </div>
      </div>

      <div
        ref={containerRef}
        className="absolute z-10 flex flex-row h-[80vh] bottom-[4vh] items-center"
        style={{ willChange: "transform", marginLeft: "100vw" }}
      >
        {/* --- Premier set --- */}
        <div className="relative w-[28vw] h-[68vh] flex-shrink-0 ml-[5vw] mt-[7vh]">
          <Image
            src="/img12.webp"
            alt="Image 12"
            fill
            className="object-cover"
          />
        </div>
        <div className="relative w-[20vw] h-[50vh] flex-shrink-0 ml-[3vw]">
          <Image
            src="/img26.webp"
            alt="Image 26"
            fill
            className="object-cover"
          />
        </div>
        <div className="flex flex-col ml-[5vw]">
          <div className="flex ml-[6vw] space-x-[1.5vw]">
            <div className="relative w-[15vw] h-[35vh] flex-shrink-0">
              <Image
                src="/img16.webp"
                alt="Image 16"
                fill
                className="object-cover"
              />
            </div>
            <div className="relative w-[15vw] h-[35vh] flex-shrink-0">
              <Image
                src="/img6.webp"
                alt="Image 6"
                fill
                className="object-cover"
              />
            </div>
            <div className="relative w-[15vw] h-[35vh] flex-shrink-0">
              <Image
                src="/img22.webp"
                alt="Image 22"
                fill
                className="object-cover"
              />
            </div>
          </div>
          <div className="relative w-[35vw] h-[38vh] flex-shrink-0 mt-[5vh]">
            <Image
              src="/img5.webp"
              alt="Image 5"
              fill
              className="object-cover"
            />
          </div>
        </div>
        <div className="relative w-[28vw] h-[65vh] flex-shrink-0 ml-[3vw]">
          <Image src="/img8.webp" alt="Image 8" fill className="object-cover" />
        </div>
        <div className="relative w-[16vw] h-[35vh] flex-shrink-0 ml-[3vw] mt-[40vh]">
          <Image
            src="/img33.webp"
            alt="Image 13"
            fill
            className="object-cover"
          />
        </div>
        <div className="relative w-[30vw] h-[33vh] flex-shrink-0 mb-[45vh] -ml-[10vw]">
          <Image src="/img7.webp" alt="Image 7" fill className="object-cover" />
        </div>
        <div className="relative w-[30vw] h-[33vh] flex-shrink-0 mt-[35vh] -ml-[15vw]">
          <Image
            src="/img32.webp"
            alt="Image 4"
            fill
            className="object-cover"
          />
        </div>
        <div className="relative w-[14vw] h-[30vh] flex-shrink-0 mb-[40vh] -ml-[10vw]">
          <Image
            src="/img19.webp"
            alt="Image 19"
            fill
            className="object-cover"
          />
        </div>
        <div className="relative w-[22vw] h-[50vh] flex-shrink-0 ml-[4vw]">
          <Image
            src="/img31.webp"
            alt="Image 31"
            fill
            className="object-cover"
          />
        </div>
        <div className="flex flex-col space-y-10 ml-[5vw]">
          <div className="relative w-[18vw] h-[40vh] flex-shrink-0 ml-[3vw]">
            <Image
              src="/img34.webp"
              alt="Image 31"
              fill
              className="object-cover"
            />
          </div>
          <div className="relative w-[30vw] h-[30vh] flex-shrink-0">
            <Image
              src="/img35.webp"
              alt="Image 31"
              fill
              className="object-cover"
            />
          </div>
        </div>
        <div className="relative w-[28vw] h-[63vh] flex-shrink-0 ml-[4vw]">
          <Image
            src="/img21.webp"
            alt="Image 21"
            fill
            className="object-cover"
          />
        </div>
        <div className="flex flex-col ml-[5vw]">
          <div className="flex space-x-[6.5vw]">
            <div className="relative w-[35vw] h-[38vh] flex-shrink-0 -mt-[5vh]">
              <Image
                src="/img17.webp"
                alt="Image 17"
                fill
                className="object-cover"
              />
            </div>
            <div className="relative w-[13vw] h-[30vh] flex-shrink-0">
              <Image
                src="/img9.webp"
                alt="Image 9"
                fill
                className="object-cover"
              />
            </div>
          </div>
          <div className="flex ml-[8vw] space-x-[2.5vw] mt-[6vh]">
            <div className="relative w-[25vw] h-[30vh] flex-shrink-0">
              <Image
                src="/img23.webp"
                alt="Image 23"
                fill
                className="object-cover"
              />
            </div>
            <div className="relative w-[25vw] h-[30vh] flex-shrink-0">
              <Image
                src="/img25.webp"
                alt="Image 25"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>

        {/* --- Deuxième set (identique au premier) --- */}
        <div className="relative w-[28vw] h-[68vh] flex-shrink-0 ml-[5vw] mt-[7vh]">
          <Image
            src="/img12.webp"
            alt="Image 12"
            fill
            className="object-cover"
          />
        </div>
        <div className="relative w-[20vw] h-[50vh] flex-shrink-0 ml-[3vw]">
          <Image
            src="/img26.webp"
            alt="Image 26"
            fill
            className="object-cover"
          />
        </div>
        <div className="flex flex-col ml-[5vw]">
          <div className="flex ml-[6vw] space-x-[1.5vw]">
            <div className="relative w-[15vw] h-[35vh] flex-shrink-0">
              <Image
                src="/img16.webp"
                alt="Image 16"
                fill
                className="object-cover"
              />
            </div>
            <div className="relative w-[15vw] h-[35vh] flex-shrink-0">
              <Image
                src="/img6.webp"
                alt="Image 6"
                fill
                className="object-cover"
              />
            </div>
            <div className="relative w-[15vw] h-[35vh] flex-shrink-0">
              <Image
                src="/img22.webp"
                alt="Image 22"
                fill
                className="object-cover"
              />
            </div>
          </div>
          <div className="relative w-[35vw] h-[38vh] flex-shrink-0 mt-[5vh]">
            <Image
              src="/img5.webp"
              alt="Image 5"
              fill
              className="object-cover"
            />
          </div>
        </div>
        <div className="relative w-[28vw] h-[65vh] flex-shrink-0 ml-[3vw]">
          <Image src="/img8.webp" alt="Image 8" fill className="object-cover" />
        </div>
        <div className="relative w-[16vw] h-[35vh] flex-shrink-0 ml-[3vw] mt-[40vh]">
          <Image
            src="/img33.webp"
            alt="Image 13"
            fill
            className="object-cover"
          />
        </div>
        <div className="relative w-[30vw] h-[33vh] flex-shrink-0 mb-[45vh] -ml-[10vw]">
          <Image src="/img7.webp" alt="Image 7" fill className="object-cover" />
        </div>
        <div className="relative w-[30vw] h-[33vh] flex-shrink-0 mt-[35vh] -ml-[15vw]">
          <Image
            src="/img32.webp"
            alt="Image 4"
            fill
            className="object-cover"
          />
        </div>
        <div className="relative w-[14vw] h-[30vh] flex-shrink-0 mb-[40vh] -ml-[10vw]">
          <Image
            src="/img19.webp"
            alt="Image 19"
            fill
            className="object-cover"
          />
        </div>
        <div className="relative w-[22vw] h-[50vh] flex-shrink-0 ml-[4vw]">
          <Image
            src="/img31.webp"
            alt="Image 31"
            fill
            className="object-cover"
          />
        </div>
        <div className="flex flex-col space-y-10 ml-[5vw]">
          <div className="relative w-[18vw] h-[40vh] flex-shrink-0 ml-[3vw]">
            <Image
              src="/img34.webp"
              alt="Image 31"
              fill
              className="object-cover"
            />
          </div>
          <div className="relative w-[30vw] h-[30vh] flex-shrink-0">
            <Image
              src="/img35.webp"
              alt="Image 31"
              fill
              className="object-cover"
            />
          </div>
        </div>
        <div className="relative w-[28vw] h-[63vh] flex-shrink-0 ml-[4vw]">
          <Image
            src="/img21.webp"
            alt="Image 21"
            fill
            className="object-cover"
          />
        </div>
        <div className="flex flex-col ml-[5vw]">
          <div className="flex space-x-[6.5vw]">
            <div className="relative w-[35vw] h-[38vh] flex-shrink-0 -mt-[5vh]">
              <Image
                src="/img17.webp"
                alt="Image 17"
                fill
                className="object-cover"
              />
            </div>
            <div className="relative w-[13vw] h-[30vh] flex-shrink-0">
              <Image
                src="/img9.webp"
                alt="Image 9"
                fill
                className="object-cover"
              />
            </div>
          </div>
          <div className="flex ml-[8vw] space-x-[2.5vw] mt-[6vh]">
            <div className="relative w-[25vw] h-[30vh] flex-shrink-0">
              <Image
                src="/img23.webp"
                alt="Image 23"
                fill
                className="object-cover"
              />
            </div>
            <div className="relative w-[25vw] h-[30vh] flex-shrink-0">
              <Image
                src="/img25.webp"
                alt="Image 25"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
