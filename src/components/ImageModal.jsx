import { useEffect } from "react";

export default function ImageModal({ src, alt, onClose }) {
  const API_BASE = "http://localhost:3000";
  // Fecha ao apertar ESC
  useEffect(() => {
    const handleKey = (e) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 bg-black/80 z-50 flex justify-center items-center"
      onClick={onClose}
    >
      <img
        src={src}
        alt={alt}
        className="max-w-[90vw] max-h-[90vh] rounded-2xl shadow-2xl object-contain"
        onClick={(e) => e.stopPropagation()}
      />
      <button
        className="absolute top-6 right-8 text-white text-3xl font-bold z-10"
        onClick={onClose}
        aria-label="Fechar"
      >
        &times;
      </button>
    </div>
  );
}
