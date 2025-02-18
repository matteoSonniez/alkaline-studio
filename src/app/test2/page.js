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

  // Refs pour la progression auto-scroll
  const progressRef = useRef(0);       // Avancement de l'auto-scroll [0..1]
  const manualOffsetRef = useRef(0);   // Avancement manuel via molette
  const totalProgressRef = useRef(0);  // somme (auto-scroll + manuel)

  // Ref pour le bloc blanc qui se déplace sur la barre noire
  const testRef = useRef(null);

  // Tableau de références pour nos DIV qui contiennent les images
  const imagesRef = useRef([]);
  imagesRef.current = [];

  const addToImagesRef = (el) => {
    // Ajoute l'élément el dans le tableau s'il n'y est pas déjà
    if (el && !imagesRef.current.includes(el)) {
      imagesRef.current.push(el);
    }
  };

  useEffect(() => {
    // -- GSAP REGISTER --
    gsap.registerPlugin(ScrollTrigger);

    // =========================
    // 1) PRE-ANIMATION IMAGES
    // =========================
    // On place toutes les .anim-image un peu à droite, invisibles
    gsap.set(".anim-image", { x: 20, opacity: 0 });

    // =========================
    // 2) INTERSECTION OBSERVER
    // =========================
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Quand l'élément entre à l'écran, on lance l'animation
            gsap.to(entry.target, {
              x: 0,
              opacity: 1,
              duration: 1,
              ease: "power2.out",
            });
          }
        });
      },
      {
        threshold: 0.1, // déclenche si au moins 10% de la div est visible
      }
    );

    // On observe chaque div qui contient l'image
    imagesRef.current.forEach((imgDiv) => observer.observe(imgDiv));

    // Cleanup
    return () => {
      observer.disconnect();
    };
  }, []);

  useEffect(() => {
    // =========================
    // 3) ANIMATIONS EXISTANTES
    // =========================

    // 3a) Première animation (unicDiv sort de l'écran vers la gauche)
    gsap.to(".unicDiv", {
      x: "-100vw",
      duration: 1,
      delay: 3,
      ease: "power2.inOut",
    });

    // 3b) Mise en place des éléments masques
    gsap.set(".mask-rect", {
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

    // 3c) Timeline pour rétrécir le masque et la bordure
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

    // 3d) Disparition du premier rectangle du mask
    gsap.fromTo(
      "#imageMask rect:first-child",
      { attr: { opacity: 1 } },
      {
        attr: { opacity: 0 },
        duration: 2,
        ease: "power2.inOut",
      }
    );

    // 3e) Au bout de 3s, on fait glisser le containerRef dans la vue
    setTimeout(() => {
      if (containerRef.current) {
        gsap.to(containerRef.current, {
          marginLeft: 0,
          duration: 1,
          ease: "power2.inOut",
        });
      }
    }, 3000);

    // 3f) Calcul de la largeur d'un "set" (pour l'infini)
    if (containerRef.current) {
      const singleSetWidth = containerRef.current.scrollWidth / 2;
      setScrollWidth(singleSetWidth);
    }

    // 3g) Auto-scroll infini
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
            const testWidth = parentWidth * 0.1;   // car w-[10vw] (approx)

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

    // 3h) Gestion de la molette
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
    <div className="h-screen overflow-hidden">
      {/* Barre noire en bas + testRef (le bloc blanc) qui se déplace */}
      <div className="w-screen bg-gray-400 h-[2.5px] absolute bottom-4">
        <div ref={testRef} className="w-[25vw] h-full bg-gray-300"></div>
      </div>

      {/* Section avec le masque (unicDiv) qui sort de l'écran */}
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
          marginLeft: "100vw", // Décalé à droite au départ (puis revient à 0 après 3s)
        }}
      >
        {/* ================================
            PREMIER SET D'IMAGES
        =================================*/}
        <div
          ref={addToImagesRef}
          className="w-[28vw] h-[68vh] flex-shrink-0 ml-[5vw] mt-[9vh] anim-image"
        >
          <Image
            src={Image2}
            className="object-cover h-full w-full"
            alt="Image 2"
          />
        </div>

        <div
          ref={addToImagesRef}
          className="w-[20vw] h-[50vh] flex-shrink-0 border-[2px] border-slate-600 ml-[3vw] anim-image"
        >
          <Image
            src={Image1}
            className="object-cover h-full w-full"
            alt="Image 1"
          />
        </div>

        <div className="flex flex-col ml-[5vw]">
          <div className="flex ml-[10vw] space-x-[1.5vw]">
            <div
              ref={addToImagesRef}
              className="w-[15vw] h-[35vh] flex-shrink-0 anim-image"
            >
              <Image
                src={Image8}
                className="object-cover h-full w-full"
                alt="Image 8"
              />
            </div>
            <div
              ref={addToImagesRef}
              className="w-[15vw] h-[35vh] flex-shrink-0 anim-image"
            >
              <Image
                src={Image7}
                className="object-cover h-full w-full"
                alt="Image 7"
              />
            </div>
            <div
              ref={addToImagesRef}
              className="w-[15vw] h-[35vh] flex-shrink-0 anim-image"
            >
              <Image
                src={Image6}
                className="object-cover h-full w-full"
                alt="Image 6"
              />
            </div>
          </div>
          <div
            ref={addToImagesRef}
            className="w-[35vw] h-[38vh] flex-shrink-0 mt-[5vh] anim-image"
          >
            <Image
              src={Image9}
              className="object-cover h-full w-full"
              alt="Image 9"
            />
          </div>
        </div>

        <div
          ref={addToImagesRef}
          className="w-[28vw] h-[65vh] flex-shrink-0 ml-[5vw] anim-image"
        >
          <Image
            src={Image4}
            className="object-cover h-full w-full"
            alt="Image 4"
          />
        </div>

        <div
          ref={addToImagesRef}
          className="w-[16vw] h-[35vh] flex-shrink-0 ml-[3vw] mt-[40vh] border-[2px] border-slate-600 anim-image"
        >
          <Image
            src={Image10}
            className="object-cover h-full w-full"
            alt="Image 10"
          />
        </div>

        <div
          ref={addToImagesRef}
          className="w-[30vw] h-[35vh] flex-shrink-0 mb-[39vh] -ml-[10vw] anim-image"
        >
          <Image
            src={Image3}
            className="object-cover h-full w-full"
            alt="Image 3"
          />
        </div>

        {/* ================================
            SECOND SET (DUPLIQUÉ)
        =================================*/}
        <div
          ref={addToImagesRef}
          className="w-[28vw] h-[68vh] flex-shrink-0 ml-[5vw] mt-[9vh] anim-image"
        >
          <Image
            src={Image2}
            className="object-cover h-full w-full"
            alt="Image 2"
          />
        </div>

        <div
          ref={addToImagesRef}
          className="w-[20vw] h-[50vh] flex-shrink-0 border-[2px] border-slate-600 ml-[3vw] anim-image"
        >
          <Image
            src={Image1}
            className="object-cover h-full w-full"
            alt="Image 1"
          />
        </div>

        <div className="flex flex-col ml-[5vw]">
          <div className="flex ml-[10vw] space-x-[1.5vw]">
            <div
              ref={addToImagesRef}
              className="w-[15vw] h-[35vh] flex-shrink-0 anim-image"
            >
              <Image
                src={Image8}
                className="object-cover h-full w-full"
                alt="Image 8"
              />
            </div>
            <div
              ref={addToImagesRef}
              className="w-[15vw] h-[35vh] flex-shrink-0 anim-image"
            >
              <Image
                src={Image7}
                className="object-cover h-full w-full"
                alt="Image 7"
              />
            </div>
            <div
              ref={addToImagesRef}
              className="w-[15vw] h-[35vh] flex-shrink-0 anim-image"
            >
              <Image
                src={Image6}
                className="object-cover h-full w-full"
                alt="Image 6"
              />
            </div>
          </div>
          <div
            ref={addToImagesRef}
            className="w-[35vw] h-[38vh] flex-shrink-0 mt-[5vh] anim-image"
          >
            <Image
              src={Image9}
              className="object-cover h-full w-full"
              alt="Image 9"
            />
          </div>
        </div>

        <div
          ref={addToImagesRef}
          className="w-[28vw] h-[65vh] flex-shrink-0 ml-[5vw] anim-image"
        >
          <Image
            src={Image4}
            className="object-cover h-full w-full"
            alt="Image 4"
          />
        </div>

        <div
          ref={addToImagesRef}
          className="w-[16vw] h-[35vh] flex-shrink-0 ml-[3vw] mt-[45vh] border-[2px] border-slate-600 anim-image"
        >
          <Image
            src={Image10}
            className="object-cover h-full w-full"
            alt="Image 10"
          />
        </div>

        <div
          ref={addToImagesRef}
          className="w-[30vw] h-[35vh] flex-shrink-0 mb-[35vh] -ml-[10vw] anim-image"
        >
          <Image
            src={Image3}
            className="object-cover h-full w-full"
            alt="Image 3"
          />
        </div>
      </div>
    </div>
  );
}

export default Page;
