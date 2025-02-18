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
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

function Page() {
    const containerRef = useRef(null);
    const [scrollWidth, setScrollWidth] = useState(0);
    const progressRef = useRef(0);
    const manualOffsetRef = useRef(0);
    const totalProgressRef = useRef(0);
    const svgRectRef = useRef(null);

    useEffect(() => {
        gsap.registerPlugin(ScrollTrigger);

        // Animation de sortie pour unicDiv

        gsap.to(".unicDiv", {
            x: "-100vw",
            duration: 1,
            delay: 3,
            ease: "power2.inOut"
        });

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

        const paths = svgRectRef.current.querySelectorAll("path");
        paths.forEach((path, index) => {
            const length = path.getTotalLength();
            gsap.set(path, {
                strokeDasharray: length,
                strokeDashoffset: length
            });

            gsap.to(path, {
                strokeDashoffset: 0,
                duration: 1,
                ease: "power1",
                delay:2// Décalage pour dessiner les bords séquentiellement
            });
        });

        gsap.fromTo("#imageMask rect:first-child",
            { attr: { opacity: 1 } },
            {
                attr: { opacity: 0 },
                duration: 2,
                ease: "power2.inOut"
            }
        );

        setTimeout(() => {
            if (containerRef.current) {
                gsap.to(containerRef.current, {
                    marginLeft: 0,
                    duration: 1,
                    ease: "power2.inOut"
                });
            }
        }, 3000);

        if (containerRef.current) {
            const singleSetWidth = containerRef.current.scrollWidth / 2;
            setScrollWidth(singleSetWidth);
        }

        const autoScroll = gsap.to(progressRef, {
            current: 1,
            duration: 45,
            delay:2,
            ease: "none",
            repeat: -1,
            onUpdate: () => {
                if (containerRef.current) {
                    totalProgressRef.current = progressRef.current + (manualOffsetRef.current / scrollWidth);
                    const wrappedProgress = totalProgressRef.current % 1;
                    const x = -scrollWidth * wrappedProgress;
                    gsap.set(containerRef.current, { x });
                }
            }
        });

        const handleWheel = (e) => {
            e.preventDefault();
            const newOffset = manualOffsetRef.current + (e.deltaY * 0.3);
            manualOffsetRef.current = newOffset % scrollWidth;
        };

        window.addEventListener('wheel', handleWheel, { passive: false });

        return () => {
            autoScroll.kill();
            ScrollTrigger.getAll().forEach(trigger => trigger.kill());
            window.removeEventListener('wheel', handleWheel);
        };
    }, [scrollWidth]);

    return (
        <div className="h-screen overflow-hidden">
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
                    {/* top lines */}
                    <svg ref={svgRectRef} className="h-[60vh] w-[65vw] absolute" viewBox="0 0 1000 1000" preserveAspectRatio="none">
                            <path d="M 0 0 L 1000 0" stroke="black" className="stroke-gris" strokeWidth="40" fill="none" />
                            <path d="M 1000 0 L 1000 1000" stroke="black" className="stroke-gris" strokeWidth="20" fill="none" />
                            <path d="M 1000 1000 L 0 1000" stroke="black" className="stroke-gris" strokeWidth="40" fill="none" />
                            <path d="M 0 1000 L 0 0" stroke="black" className="stroke-gris" strokeWidth="20" fill="none" />
                        </svg>

                </div>
            </div>

            <div
                ref={containerRef}
                className="absolute z-10 flex flex-row h-full items-center"
                style={{
                    willChange: 'transform',
                    marginLeft: '100vw'
                }}
            >
                <div className="w-[28vw] h-[64vh] flex-shrink-0 ml-[7vw]">
                    <Image
                        src={Image2}
                        className="object-cover h-full w-full"
                        alt="Image 2"
                    />
                </div>
                <div className="w-[20vw] h-[50vh] flex-shrink-0 border-[10px] border-gris ml-[5vw]">
                    <Image
                        src={Image1}
                        className="object-cover h-full w-full"
                        alt="Image 1"
                    />
                </div>
                <div className="flex flex-col ml-[5vw]">
                    <div className="flex ml-[10vw] space-x-[2vw]">
                        <div className="w-[15vw] h-[35vh] flex-shrink-0  border-[10px] border-gris">
                            <Image
                                src={Image8}
                                className="object-cover h-full w-full"
                                alt="Image 4"
                            />
                        </div>
                        <div className="w-[15vw] h-[35vh] flex-shrink-0  border-[10px] border-gris">
                            <Image
                                src={Image7}
                                className="object-cover h-full w-full"
                                alt="Image 4"
                            />
                        </div>
                        <div className="w-[15vw] h-[35vh] flex-shrink-0 border-[10px] border-gris">
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
                <div className="w-[30vw] h-[70vh] flex-shrink-0 ml-[5vw]">
                    <Image
                        src={Image4}
                        className="object-cover h-full w-full"
                        alt="Image 3"
                    />
                </div>
                <div className="w-[14vw] h-[32vh] flex-shrink-0 ml-[5vw] mt-[50vh]">
                    <Image
                        src={Image10}
                        className="object-cover h-full w-full"
                        alt="Image 3"
                    />
                </div>
                <div className="w-[20vw] h-[45vh] flex-shrink-0 mb-[35vh] -ml-[3vw] border-[10px] border-gris">
                    <Image
                        src={Image3}
                        className="object-cover h-full w-full"
                        alt="Image 3"
                    />
                </div>

                <div className="w-[28vw] h-[64vh] flex-shrink-0 ml-[7vw]">
                    <Image
                        src={Image2}
                        className="object-cover h-full w-full"
                        alt="Image 2"
                    />
                </div>
                <div className="w-[20vw] h-[50vh] flex-shrink-0 border-[10px] border-gris ml-[5vw]">
                    <Image
                        src={Image1}
                        className="object-cover h-full w-full"
                        alt="Image 1"
                    />
                </div>
                <div className="flex flex-col ml-[5vw]">
                    <div className="flex ml-[10vw] space-x-[2vw]">
                        <div className="w-[15vw] h-[35vh] flex-shrink-0  border-[10px] border-gris">
                            <Image
                                src={Image8}
                                className="object-cover h-full w-full"
                                alt="Image 4"
                            />
                        </div>
                        <div className="w-[15vw] h-[35vh] flex-shrink-0  border-[10px] border-gris">
                            <Image
                                src={Image7}
                                className="object-cover h-full w-full"
                                alt="Image 4"
                            />
                        </div>
                        <div className="w-[15vw] h-[35vh] flex-shrink-0 border-[10px] border-gris">
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
                <div className="w-[30vw] h-[70vh] flex-shrink-0 ml-[5vw]">
                    <Image
                        src={Image4}
                        className="object-cover h-full w-full"
                        alt="Image 3"
                    />
                </div>
                <div className="w-[14vw] h-[32vh] flex-shrink-0 ml-[5vw] mt-[50vh]">
                    <Image
                        src={Image10}
                        className="object-cover h-full w-full"
                        alt="Image 3"
                    />
                </div>
                <div className="w-[20vw] h-[45vh] flex-shrink-0 mb-[35vh] -ml-[3vw] border-[10px] border-gris">
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