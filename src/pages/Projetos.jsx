// src/pages/Projetos.jsx
import { useNavigate } from "react-router-dom";
import useProjetos from "../hooks/useProjetos";

export default function Projetos() {
  const API_BASE = import.meta.env.VITE_API_BASE || "http://localhost:3000";
  const { projetos } = useProjetos();
  const navigate = useNavigate();
  return (
    <main className="min-h-[calc(100vh-64px)] pb-20 px-3 pt-4 bg-secondary flex flex-col gap-6">
      <div className="mx-auto max-w-4xl justify-around">
        <h1 className="text-4xl md:text-5xl font-bold mb-4 text-purple-700">
          Projetos
        </h1>
      </div>
      <div
        className="
        grid grid-cols-1 
        sm:grid-cols-2 
        lg:grid-cols-3 
        gap-8 
        bg-white rounded-lg p-4 shadow-lg
        "
      >
        {projetos.map((projeto) => (
          <button
            key={projeto.id}
            onClick={() => navigate(`/projetos/${projeto.id}/sessoes`)}
            className="
              rounded-xl shadow-xl overflow-hidden bg-white relative transition
              hover:scale-[1.04] active:scale-95
              focus:outline-none
              w-full
              flex flex-col
              "
          >
            <div className="w-full h-48 overflow-hidden rounded-md">
              {projeto.capa_url ? (
                <img
                  src={`${API_BASE}/${projeto.capa_url}`}
                  alt={projeto.titulo}
                  className="
                  w-full h-full object-cover object-[50%_20%]
                   sm:h-56 lg:h-64
                  transition
                "
                />
              ) : (
                <div className="w-full h-48 sm:h-56 lg:h-64 bg-purple-100 flex items-center justify-center text-purple-400 font-bold">
                  Sem Imagem
                </div>
              )}
            </div>
            {/* Capa do projeto */}

            {/* Título sobre a imagem */}
            <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black/60 to-transparent p-4">
              <h2 className="text-white text-lg font-bold drop-shadow">
                {projeto.titulo}
              </h2>
              <p className="text-gray-200 text-sm">
                {projeto.descricao || "Sem descrição"}
              </p>
              <p className="text-gray-200 text-xs mt-1">
                Clique para ver as sessões
              </p>
            </div>
          </button>
        ))}
      </div>
    </main>
  );
}
