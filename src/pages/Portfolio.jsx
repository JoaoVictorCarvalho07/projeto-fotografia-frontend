// src/pages/Portfolio.jsx
import React from "react";
import { useState, useEffect } from "react";
import PhotoCard from "../components/PhotoCard";
import ImageModal from "../components/ImageModal";
import api from "../services/api";

// const fotos = [
//   {
//     titulo: "Afrodite",
//     imagens: [
//       { src: "/images/portfolio/foto1.jpg", alt: "Afrodite 1" },
//       { src: "/images/portfolio/foto2.jpg", alt: "Afrodite 2" },
//       { src: "/images/portfolio/foto3.jpg", alt: "Afrodite 3" },
//       { src: "/images/portfolio/foto4.jpg", alt: "Afrodite 4" },
//     ],
//   },
//   {
//     titulo: "Roda das Deusas",
//     imagens: [
//       { src: "/images/portfolio/foto1.jpg", alt: "Roda das Deusas 1" },
//       { src: "/images/portfolio/foto2.jpg", alt: "Roda das Deusas 2" },
//       { src: "/images/portfolio/foto3.jpg", alt: "Roda das Deusas 3" },
//       { src: "/images/portfolio/foto4.jpg", alt: "Roda das Deusas 4" },
//     ],
//   },
//   {
//     titulo: "Noiva Cadáver",
//     imagens: [
//       { src: "/images/portfolio/foto1.jpg", alt: "Noiva Cadáver 1" },
//       { src: "/images/portfolio/foto2.jpg", alt: "Noiva Cadáver 2" },
//       { src: "/images/portfolio/foto3.jpg", alt: "Noiva Cadáver 3" },
//       { src: "/images/portfolio/foto4.jpg", alt: "Noiva Cadáver 4" },
//     ],
//   },
// ];

export default function Portfolio() {
  const [img, setImg] = useState(null);
  const [projetos, setProjetos] = useState([]);
  const [fotos, setFotos] = useState([]);


  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <h1 className="text-3xl sm:text-4xl md:text-5xl font-playfair text-primary mb-4 sm:mb-6">
        Portfólio de Fotos
      </h1>
      <p className="text-base sm:text-lg md:text-xl text-text mb-6 sm:mb-8">
        Uma seleção de ensaios artísticos: para cada projeto, veja as 3 imagens
        em destaque.
      </p>

      <div className="space-y-12">
        {fotos.map((projeto, idx) => (
          <section key={idx} className="space-y-4 sm:space-y-6">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold text-primary">
              {projeto.titulo}
            </h2>
            <div
              className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 md:gap-8"
              onClick={() =>
                setImg({ src: projeto.imagens[0], alt: `Foto ${idx + 1}` })
              }
            >
              {projeto.imagens.slice(0, 3).map((src, i) => (
                <PhotoCard
                  key={i}
                  src={src}
                  alt={`${projeto.titulo} ${i + 1}`}
                />
              ))}
            </div>
          </section>
        ))}
      </div>
      {img && (
        <ImageModal src={img.src} alt={img.alt} onClose={() => setImg(null)} />
      )}
    </div>
  );
}
