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

    useEffect(() => {
        // Initialisation de Lenis pour le smooth scroll
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

        return () => {
            lenis.destroy();
        };
    }, []);

    return (
        <div className="flex flex-col items-center">
            <Header></Header>
            <div className="w-[80vw] h-screen flex-col">
                <div className="flex justify-between mb-[10vh]">
                    <img src={Image1.src} className="w-[37vw]"></img>
                    <img src={Image3.src} className="w-[37vw]"></img>
                </div>
                <div className="flex justify-between mb-[10vh]">
                    <img src={Image3.src} className="w-[37vw]"></img>
                    <img src={Image4.src} className="w-[37vw]"></img>
                </div>
                <div className="flex justify-between mb-[10vh]">
                    <img src={Image5.src} className="w-[37vw]"></img>
                    <img src={Image6.src} className="w-[37vw]"></img>
                </div>
                <div className="flex justify-between mb-[10vh]">
                    <img src={Image7.src} className="w-[37vw]"></img>
                    <img src={Image8.src} className="w-[37vw]"></img>
                </div>
                <div className="flex justify-between mb-[10vh]">
                    <img src={Image9.src} className="w-[37vw]"></img>
                    <img src={Image10.src} className="w-[37vw]"></img>
                </div>
            </div>          
        </div>
    );
}

export default Page;
