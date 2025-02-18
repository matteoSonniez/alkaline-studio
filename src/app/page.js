"use client";
import React, { useState, useEffect, useRef } from "react";
import Image1 from "@/img/image9.png";
import Image2 from "@/img/img2.png";
import Image3 from "@/img/img3.png";
import Image4 from "@/img/img4.png";
import Image5 from "@/img/img5.png";
import Image6 from "@/img/img6.png";
import Image7 from "@/img/img7.png";
import Image8 from "@/img/img8.png";
import Image9 from "@/img/image8.png";
import Image10 from "@/img/image6.png";
import Test14 from "@/img/image3.png";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

function Page() {
  const containerRef = useRef(null);
  const [scrollWidth, setScrollWidth] = useState(0);

  // Refs pour gérer la progression
  const progressRef = useRef(0);       // Avancement de l'auto-scroll [0..1]
  const manualOffsetRef = useRef(0);   // Avancement manuel via molette
  const totalProgressRef = useRef(0);  // somme (auto-scroll + manuel)
  const testRef = useRef(null);
  const testRef2 = useRef(null);        // Elément qui se déplace sur la barre noire

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

    // Gérer la molette pour ajouter du défilement manuel
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
            <div className="absolute inset-0">
              <svg className="w-full h-full" preserveAspectRatio="none">
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
                <image
                  href={Test14.src}
                  width="100%"
                  height="100%"
                  preserveAspectRatio="xMidYMid slice"
                  mask="url(#imageMask2)"
                />
              </svg>
            </div>
            <div className="border-container2 h-[60vh] w-[65vw] flex justify-center items-center relative pointer-events-none">
              <svg
                className="absolute inset-0 pointer-events-none"
                style={{ width: "65vw", height: "60vh" }}
              >
                <rect
                  className="border-rect2"
                  x="0"
                  y="0"
                  width="100%"
                  height="100%"
                  fill="none"
                  stroke="gray"
                  strokeWidth="5"
                  vectorEffect="non-scaling-stroke"
                />
              </svg>
            </div>
          </div>
        </div>
        <div className="flex flex-col px-[10vw] mt-[15vh]">
          <div className="w-[80vw] h-[70vh] mb-[7vh]">
            <img src={Image2.src} className="object-cover h-full w-full"></img>
          </div>
          <div className="w-[65vw] h-[55vh] mb-[7vh]">
            <img src={Image4.src} className="object-cover h-full w-full"></img>
          </div>
          <div className="w-[80vw] h-[65vh] mb-[7vh]">
            <img src={Image1.src} className="object-cover h-full w-full"></img>
          </div>
          <div className="w-[62vw] h-[55vh] self-end border-[12px] border-gris mb-[5vh]">
            <img src={Image5.src} className="object-cover h-full w-full"></img>
          </div>
          <div className="w-[90vw] h-[35vh] self-center border-[2px] border-black mb-[7vh]">
            <img src={Image9.src} className="object-cover h-full w-full"></img>
          </div>
          <div className="w-[55vw] h-[45vh] mb-[7vh]">
            <img src={Image7.src} className="object-cover h-full w-full"></img>
          </div>
          <div className="w-[55vw] h-[45vh] self-end mb-[7vh]">
            <img src={Image8.src} className="object-cover h-full w-full"></img>
          </div>
          <div className="w-[80vw] h-[70vh] mb-[7vh] border-[12px] border-gris">
            <img src={Image3.src} className="object-cover h-full w-full"></img>
          </div>
        </div>

      </div>



      {/* LAPTOP VERSION */}
      <div className="h-screen overflow-hidden hidden sm:block">
        <div className="absolute z-20 w-screen h-screen unicDiv">
          <div className="relative flex w-screen items-center justify-center h-screen overflow-hidden">
            <div className="absolute inset-0">
              <svg className="w-full h-full" preserveAspectRatio="none">
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
                <image
                  href={Test14.src}
                  width="100%"
                  height="100%"
                  preserveAspectRatio="xMidYMid slice"
                  mask="url(#imageMask)"
                />
              </svg>
            </div>
            <div className="border-container h-[60vh] w-[65vw] flex justify-center items-center relative pointer-events-none">
              <svg
                className="absolute inset-0 pointer-events-none"
                style={{ width: "65vw", height: "60vh" }}
              >
                <rect
                  className="border-rect"
                  x="0"
                  y="0"
                  width="100%"
                  height="100%"
                  fill="none"
                  stroke="white"
                  strokeWidth="12"
                  vectorEffect="non-scaling-stroke"
                />
              </svg>
            </div>
          </div>
        </div>

        {/* Container horizontal avec duplication des images pour effet infini */}
        <div
          ref={containerRef}
          className="absolute z-10 flex flex-row h-[90vh] bottom-0 items-center"
          style={{
            willChange: "transform",
            marginLeft: "100vw", // Décalé à droite au départ, puis revient à 0 après 3s
          }}
        >
          {/* --- Vos images : premier set --- */}
          <div className="w-[28vw] h-[68vh] flex-shrink-0 ml-[5vw] mt-[9vh]">
            <Image
              src={Image2}
              className="object-cover h-full w-full"
              alt="Image 2"
            />
          </div>
          <div className="w-[20vw] h-[50vh] flex-shrink-0 border-[2px] border-slate-600 ml-[3vw]">
            <Image
              src={Image1}
              className="object-cover h-full w-full"
              alt="Image 1"
            />
          </div>
          <div className="flex flex-col ml-[5vw]">
            <div className="flex ml-[10vw] space-x-[1.5vw]">
              <div className="w-[15vw] h-[35vh] flex-shrink-0">
                <Image
                  src={Image8}
                  className="object-cover h-full w-full"
                  alt="Image 4"
                />
              </div>
              <div className="w-[15vw] h-[35vh] flex-shrink-0">
                <Image
                  src={Image7}
                  className="object-cover h-full w-full"
                  alt="Image 4"
                />
              </div>
              <div className="w-[15vw] h-[35vh] flex-shrink-0">
                <Image
                  src={Image6}
                  className="object-cover h-full w-full"
                  alt="Image 4"
                />
              </div>
            </div>
            <div className="w-[35vw] h-[38vh] flex-shrink-0 mt-[5vh]">
              <Image
                src={Image9}
                className="object-cover h-full w-full"
                alt="Image 3"
              />
            </div>
          </div>
          <div className="w-[28vw] h-[65vh] flex-shrink-0 ml-[5vw]">
            <Image
              src={Image4}
              className="object-cover h-full w-full"
              alt="Image 3"
            />
          </div>
          <div className="w-[16vw] h-[35vh] flex-shrink-0 ml-[3vw] mt-[40vh] border-[2px] border-slate-600 ">
            <Image
              src={Image10}
              className="object-cover h-full w-full"
              alt="Image 3"
            />
          </div>
          <div className="w-[30vw] h-[35vh] flex-shrink-0 mb-[39vh] -ml-[10vw]">
            <Image
              src={Image3}
              className="object-cover h-full w-full"
              alt="Image 3"
            />
          </div>




          {/* --- Vos images : second set (dupliqué) --- */}

          <div className="w-[28vw] h-[68vh] flex-shrink-0 ml-[5vw] mt-[9vh]">
            <Image
              src={Image2}
              className="object-cover h-full w-full"
              alt="Image 2"
            />
          </div>
          <div className="w-[20vw] h-[50vh] flex-shrink-0 border-[2px] border-slate-600 ml-[3vw]">
            <Image
              src={Image1}
              className="object-cover h-full w-full"
              alt="Image 1"
            />
          </div>
          <div className="flex flex-col ml-[5vw]">
            <div className="flex ml-[10vw] space-x-[1.5vw]">
              <div className="w-[15vw] h-[35vh] flex-shrink-0">
                <Image
                  src={Image8}
                  className="object-cover h-full w-full"
                  alt="Image 4"
                />
              </div>
              <div className="w-[15vw] h-[35vh] flex-shrink-0">
                <Image
                  src={Image7}
                  className="object-cover h-full w-full"
                  alt="Image 4"
                />
              </div>
              <div className="w-[15vw] h-[35vh] flex-shrink-0">
                <Image
                  src={Image6}
                  className="object-cover h-full w-full"
                  alt="Image 4"
                />
              </div>
            </div>
            <div className="w-[35vw] h-[38vh] flex-shrink-0 mt-[5vh]">
              <Image
                src={Image9}
                className="object-cover h-full w-full"
                alt="Image 3"
              />
            </div>
          </div>
          <div className="w-[28vw] h-[65vh] flex-shrink-0 ml-[5vw]">
            <Image
              src={Image4}
              className="object-cover h-full w-full"
              alt="Image 3"
            />
          </div>
          <div className="w-[16vw] h-[35vh] flex-shrink-0 ml-[3vw] mt-[45vh] border-[2px] border-slate-600 ">
            <Image
              src={Image10}
              className="object-cover h-full w-full"
              alt="Image 3"
            />
          </div>
          <div className="w-[30vw] h-[35vh] flex-shrink-0 mb-[35vh] -ml-[10vw]">
            <Image
              src={Image3}
              className="object-cover h-full w-full"
              alt="Image 3"
            />
          </div>
        </div>
      </div>
    </div>

  );
}

export default Page;
