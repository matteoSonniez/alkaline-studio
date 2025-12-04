/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        beige: "#EAE4DC",  // Ajout de la couleur beige
        marron: "#9D7153",
        orange: "#FFA500",
        gris: "#EBEAE7",
        blanc: "#F7F6F5",
      },
    },
  },
  plugins: [],
}; 
