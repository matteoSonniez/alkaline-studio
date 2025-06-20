// components/Card.js
"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";

export function Card({
  src,
  alt,
  title,
  classMobileSize,
  classDesktopSize = "",
}) {
  const [active, setActive] = useState(false);

  useEffect(() => {
    let timer;
    if (active) {
      // dès que active passe à true, on programme son retour à false au bout de 4s
      timer = setTimeout(() => {
        setActive(false);
      }, 4000);
    }
    // cleanup : si active change ou si le composant se démonte, on annule le timer
    return () => clearTimeout(timer);
  }, [active]);

  return (
    <div
      onClick={() => setActive((prev) => !prev)}
      className={`
        relative overflow-hidden
        w-[85vw] h-[66vh]
        transition duration-500
      `}
    >
      <div
        className={`
          absolute z-50 w-full top-1/2 left-1/2
          -translate-x-1/2 -translate-y-1/2
          text-white text-center
          transition-opacity duration-500
          opacity-0 text-[20px]
          ${active ? "opacity-100" : ""}
        `}
      >
        {title}
      </div>
      <Image
        src={src}
        alt={alt}
        fill
        className={`
          object-cover transition duration-500
          ${active ? "filter brightness-75" : ""}
        `}
      />
    </div>
  );
}
