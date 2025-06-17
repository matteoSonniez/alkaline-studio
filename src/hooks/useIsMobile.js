// src/hooks/useIsMobile.js
import { useState, useEffect } from "react";

/**
 * Renvoie true si la largeur de la fenêtre est STRICTEMENT inférieure au breakpoint (par défaut 640px).
 */
export default function useIsMobile(breakpoint = 640) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia(`(max-width: ${breakpoint - 1}px)`);
    // état initial
    setIsMobile(mq.matches);
    // écoute des changements de taille
    const handler = (e) => setIsMobile(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, [breakpoint]);

  return isMobile;
}
