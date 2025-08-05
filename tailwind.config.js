/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}","./src/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        primary: "rgb(106, 76, 147)",
        accent: "rgb(255, 195, 156)",
        fundo: "rgb(248, 241, 255)",
      },
    },
  },
  plugins: [],
  darkMode: "media", // ou 'class' se quiser trocar manualmente depois
};
