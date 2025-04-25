"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { useRouter } from "next/navigation";
import { ScrollTrigger } from "gsap/ScrollTrigger";

function Page() {
  const router = useRouter();
  const containerRef = useRef(null);
  const [scrollWidth, setScrollWidth] = useState(0);
  const [isReveal, setIsReveal] = useState(false);

  // Refs pour gérer la progression
  const progressRef = useRef(0);       // Avancement de l'auto-scroll [0..1]
  const manualOffsetRef = useRef(0);   // Avancement manuel via molette
  const totalProgressRef = useRef(0);  // somme (auto-scroll + manuel)
  const testRef = useRef(null);
  const testRef2 = useRef(null);      // Elément qui se déplace sur la barre noire


  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    // Première animation (unicDiv sort de l'écran vers la gauche)
    gsap.to(".unicDiv", {
      x: "-100vw",
      duration: 1,
      delay: 3,
      ease: "power2.inOut",
    });

    gsap.to(".testup", {
      y: "-100vh",
      duration: 1,
      delay: 3,
      ease: "power2.inOut",
    });

    // Mise en place des éléments masques
    gsap.set(".mask-rect", {
      attr: {
        width: "100%",
        height: "100%",
        x: "0%",
        y: "0%",
      },
    });

    gsap.set(".mask-rect2", {
      attr: {
        width: "100%",
        height: "100%",
        x: "0%",
        y: "0%",
      },
    });

    gsap.set(".border-container", {
      width: "100vw",
      height: "100vh",
    });

    gsap.set(".border-container2", {
      width: "100vw",
      height: "100vh",
    });

    // Timeline pour rétrécir le masque et la bordure
    const tl = gsap.timeline();
    tl.to([".mask-rect", ".border-container"], {
      attr: {
        width: "65%",
        height: "60%",
        x: "17.5%",
        y: "20%",
      },
      width: "65vw",
      height: "60vh",
      duration: 2,
      ease: "power2.inOut",
    });

    const tl2 = gsap.timeline();
    tl2.to([".mask-rect2", ".border-container2"], {
      attr: {
        width: "65%",
        height: "60%",
        x: "17.5%",
        y: "20%",
      },
      width: "65vw",
      height: "60vh",
      duration: 2,
      ease: "power2.inOut",
    });

    // Disparition du premier rectangle du mask
    gsap.fromTo(
      "#imageMask rect:first-child",
      { attr: { opacity: 1 } },
      {
        attr: { opacity: 0 },
        duration: 2,
        ease: "power2.inOut",
      }
    );

    gsap.fromTo(
      "#imageMask2 rect:first-child",
      { attr: { opacity: 1 } },
      {
        attr: { opacity: 0 },
        duration: 2,
        ease: "power2.inOut",
      }
    );

    // Au bout de 3s, on fait glisser le containerRef dans la vue
    setTimeout(() => {
      if (containerRef.current) {
        gsap.to(containerRef.current, {
          marginLeft: 0,
          duration: 1,
          ease: "power2.inOut",
        });
      }
    }, 3000);

    // Calcule la largeur du "demi-cycle" (puisqu'on duplique les images pour le défilement infini)
    if (containerRef.current) {
      const singleSetWidth = containerRef.current.scrollWidth / 2;
      setScrollWidth(singleSetWidth);
    }

    // Auto-scroll infini
    const autoScroll = gsap.to(progressRef, {
      current: 1,
      duration: 45,
      delay: 3.5,
      ease: "none",
      repeat: -1,
      onUpdate: () => {
        if (containerRef.current) {
          // Somme auto-scroll + molette
          totalProgressRef.current =
            progressRef.current + manualOffsetRef.current / scrollWidth;

          // wrappedProgress ∈ [0..1)
          const wrappedProgress = totalProgressRef.current % 1;

          // Défilement horizontal infini du container
          const x = -scrollWidth * wrappedProgress;
          const offsetPx = window.innerWidth * 0.2;

    // défilement horizontal infini du container,
    // en partant de offsetPx (20vw) puis en décroissant
          //const x = offsetPx - scrollWidth * wrappedProgress;
          gsap.set(containerRef.current, { x });

          // Déplacement de testRef sur la barre noire
          if (testRef.current) {
            const parentWidth = window.innerWidth; // largeur de la fenêtre
            const testWidth = parentWidth * 0.1;   // car w-[10vw]

            // On part de x = -testWidth (bord gauche, hors écran)
            // à x = parentWidth (bord droit, hors écran)
            // => la distance totale est (parentWidth + testWidth)
            const xPos =
              -testWidth + (parentWidth + testWidth) * wrappedProgress;

            gsap.set(testRef.current, { x: xPos });
          }
        }
      },
    });

    

    const handleWheel = (e) => {
      e.preventDefault();
      const newOffset = manualOffsetRef.current + e.deltaY * 0.3;
      manualOffsetRef.current = newOffset % scrollWidth;
    };

    window.addEventListener("wheel", handleWheel, { passive: false });

    // Nettoyage
    return () => {
      autoScroll.kill();
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
      window.removeEventListener("wheel", handleWheel);
    };
  }, [scrollWidth]);

  return (
    <div>

      {/* MOBILE VERSION */}
      <div className="block sm:hidden testup">
        <div className=" w-screen h-screen unicDiv2">
          <div className="relative flex w-screen items-center justify-center h-screen overflow-hidden">
            {/* Définition du masque SVG */}
            <svg
              className="absolute inset-0 w-full h-full"
              preserveAspectRatio="none"
              aria-hidden="true"
            >
              <defs>
                <mask id="imageMask2">
                  <rect width="100%" height="100%" fill="white" opacity="0" />
                  <rect
                    className="mask-rect2"
                    x="0%"
                    y="0%"
                    width="100%"
                    height="100%"
                    fill="white"
                  />
                </mask>
              </defs>
            </svg>

            {/* Conteneur de l'image avec le masque appliqué en CSS */}
            <div
              className="relative w-full h-full"
              style={{
                mask: "url(#imageMask2)",
                WebkitMask: "url(#imageMask2)",
              }}
            >
              <Image
                src="/img4.webp"
                alt="Image 2"
                fill
                style={{ objectFit: "cover" }}
              />
            </div>
          </div>
        </div>
        <div className="flex flex-col px-[10vw] mt-[15vh]">
          <div className="w-[80vw] relative h-[70vh] mb-[7vh]">
            <Image
              src="/img11.webp"
              alt="Image 2"
              fill
              className="object-cover"
            />
          </div>
          <div className="w-[65vw] relative h-[55vh] mb-[7vh]">
            <Image
              src="/img2.webp"
              alt="Image 2"
              fill
              className="object-cover"
            />
          </div>
          <div className="w-[80vw] relative h-[65vh] mb-[7vh]">
            <Image
              src="/img12.webp"
              alt="Image 2"
              fill
              className="object-cover"
            />
          </div>
          <div className="w-[62vw] relative h-[55vh] self-end border-[12px] border-gris mb-[5vh]">
            <Image
              src="/img9.webp"
              alt="Image 2"
              fill
              className="object-cover"
            />
          </div>
          <div className="w-[90vw] relative h-[35vh] self-center border-[2px] border-black mb-[7vh]">
            <Image
              src="/img5.webp"
              alt="Image 2"
              fill
              className="object-cover"
            />
          </div>
          <div className="w-[55vw] relative h-[45vh] mb-[7vh]">
            <Image
              src="/img14.webp"
              alt="Image 2"
              fill
              className="object-cover"
            />
          </div>
          <div className="w-[55vw] relative h-[45vh] self-end mb-[7vh]">
            <Image
              src="/img15.webp"
              alt="Image 2"
              fill
              className="object-cover"
            />
          </div>
          <div className="w-[80vw] relative h-[70vh] mb-[7vh] border-[12px] border-gris">
            <Image
              src="/img1.webp"
              alt="Image 2"
              fill
              className="object-cover"
            />
          </div>
        </div>

      </div>



      {/* LAPTOP VERSION */}
      <div className={`h-screen overflow-hidden hidden ${isReveal ? 'hidden' : 'sm:block'}`}>
        <div className="w-screen bg-slate-400 h-[2px] absolute bottom-4">
          <div
            ref={testRef}
            className="w-[25vw] h-full bg-gray-200"
            style={{ willChange: "transform" }}
          />
        </div>
        <div className="absolute z-20 w-screen h-screen unicDiv">
          <div className="relative flex w-screen items-center justify-center h-screen overflow-hidden">
            {/* Définition du masque SVG */}
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

            {/* Conteneur de l'image avec le masque appliqué en CSS */}
            <div
              className="relative w-full h-full"
              style={{
                mask: "url(#imageMask)",
                WebkitMask: "url(#imageMask)",
              }}
            >
              <Image
                src="/img4.webp"
                alt="Image 2"
                fill
                style={{ objectFit: "cover" }}
              />
            </div>
          </div>
        </div>

        {/* Container horizontal avec duplication des images pour effet infini */}
        <div
          ref={containerRef}
          className="absolute z-10 flex flex-row h-[80vh] bottom-[4vh] items-center"
          style={{
            willChange: "transform",
            marginLeft: "100vw", // Décalé à droite au départ, puis revient à 0 après 3s
          }}
        >
          {/* --- Vos images : premier set --- */}
          <div className="relative w-[28vw] h-[68vh] flex-shrink-0 ml-[5vw] mt-[9vh]">
            <Image
              src="/img11.webp"
              alt="Image 2"
              fill
              className="object-cover"
            />
          </div>

          <div className="relative w-[20vw] h-[50vh] flex-shrink-0 border-[2px] border-slate-600 ml-[3vw]">
            <Image
              src="/img8.webp"
              alt="Image 2"
              fill
              className="object-cover"
            />
          </div>
          <div className="flex flex-col ml-[5vw]">
            <div className="flex ml-[6vw] space-x-[1.5vw]">
              <div className="relative w-[15vw] h-[35vh] flex-shrink-0">
                <Image
                  src="/img14.webp"
                  alt="Image 2"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="w-[15vw] relative h-[35vh] flex-shrink-0">
                <Image
                  src="/img15.webp"
                  alt="Image 2"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="w-[15vw] relative h-[35vh] flex-shrink-0">
                <Image
                  src="/img13.webp"
                  alt="Image 2"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
            <div className="relative w-[35vw] h-[38vh] flex-shrink-0 mt-[5vh]">
              <Image
                src="/img5.webp"
                alt="Image 2"
                fill
                className="object-cover"
              />
            </div>
          </div>
          <div className="w-[28vw] relative h-[65vh] flex-shrink-0 ml-[3vw]">
            <Image
              src="/img12.webp"
              alt="Image 2"
              fill
              className="object-cover"
            />
          </div>
          <div className="w-[16vw] relative h-[35vh] flex-shrink-0 ml-[3vw] mt-[40vh] ">
            <Image
              src="/img1.webp"
              alt="Image 2"
              fill
              className="object-cover"
            />
          </div>
          <div className="w-[30vw] relative h-[35vh] flex-shrink-0 mb-[40vh] -ml-[10vw] border-[2px] border-slate-600">
            <Image
              src="/img7.webp"
              alt="Image 2"
              fill
              className="object-cover"
            />
          </div>
          <div className="w-[30vw] relative h-[35vh] flex-shrink-0 -mb-[5vh] -ml-[10vw] border-[2px] border-slate-600">
            <Image
              src="/img4.webp"
              alt="Image 2"
              fill
              className="object-cover"
            />
          </div>
          <div className="w-[30vw] relative h-[35vh] flex-shrink-0 mt-[42vh] -ml-[10vw]">
            <Image
              src="/img17.webp"
              alt="Image 2"
              fill
              className="object-cover"
            />
          </div>
          <div className="w-[16vw] relative h-[35vh] flex-shrink-0 mb-[36vh] -ml-[10vw]">
            <Image
              src="/img19.webp"
              alt="Image 2"
              fill
              className="object-cover"
            />
          </div>
          <div className="w-[22vw] relative h-[50vh] flex-shrink-0 ml-[4vw]">
            <Image
              src="/img21.webp"
              alt="Image 2"
              fill
              className="object-cover"
            />
          </div>




          {/* --- second set (dupliqué) --- */}

          <div className="relative w-[28vw] h-[68vh] flex-shrink-0 ml-[5vw] mt-[9vh]">
            <Image
              src="/img11.webp"
              alt="Image 2"
              fill
              className="object-cover"
            />
          </div>

          <div className="relative w-[20vw] h-[50vh] flex-shrink-0 border-[2px] border-slate-600 ml-[3vw]">
            <Image
              src="/img8.webp"
              alt="Image 2"
              fill
              className="object-cover"
            />
          </div>
          <div className="flex flex-col ml-[5vw]">
            <div className="flex ml-[6vw] space-x-[1.5vw]">
              <div className="relative w-[15vw] h-[35vh] flex-shrink-0">
                <Image
                  src="/img14.webp"
                  alt="Image 2"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="w-[15vw] relative h-[35vh] flex-shrink-0">
                <Image
                  src="/img15.webp"
                  alt="Image 2"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="w-[15vw] relative h-[35vh] flex-shrink-0">
                <Image
                  src="/img13.webp"
                  alt="Image 2"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
            <div className="relative w-[35vw] h-[38vh] flex-shrink-0 mt-[5vh]">
              <Image
                src="/img5.webp"
                alt="Image 2"
                fill
                className="object-cover"
              />
            </div>
          </div>
          <div className="w-[28vw] relative h-[65vh] flex-shrink-0 ml-[3vw]">
            <Image
              src="/img12.webp"
              alt="Image 2"
              fill
              className="object-cover"
            />
          </div>
          <div className="w-[16vw] relative h-[35vh] flex-shrink-0 ml-[3vw] mt-[40vh] ">
            <Image
              src="/img1.webp"
              alt="Image 2"
              fill
              className="object-cover"
            />
          </div>
          <div className="w-[30vw] relative h-[35vh] flex-shrink-0 mb-[40vh] -ml-[10vw] border-[2px] border-slate-600">
            <Image
              src="/img7.webp"
              alt="Image 2"
              fill
              className="object-cover"
            />
          </div>
          <div className="w-[30vw] relative h-[35vh] flex-shrink-0 -mb-[5vh] -ml-[10vw] border-[2px] border-slate-600">
            <Image
              src="/img4.webp"
              alt="Image 2"
              fill
              className="object-cover"
            />
          </div>
          <div className="w-[30vw] relative h-[35vh] flex-shrink-0 mt-[42vh] -ml-[10vw]">
            <Image
              src="/img17.webp"
              alt="Image 2"
              fill
              className="object-cover"
            />
          </div>
          <div className="w-[16vw] relative h-[35vh] flex-shrink-0 mb-[36vh] -ml-[10vw]">
            <Image
              src="/img19.webp"
              alt="Image 2"
              fill
              className="object-cover"
            />
          </div>
          <div className="w-[22vw] relative h-[50vh] flex-shrink-0 ml-[4vw]">
            <Image
              src="/img21.webp"
              alt="Image 2"
              fill
              className="object-cover"
            />
          </div>
        </div>
      </div>
    </div>

  );
}

export default Page;
