import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ImageModal from "../components/ImageModal";
import useProjetos from "../hooks/useProjetos"; // use o hook que você criou
import { useParams } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa"; // ícone de seta para ir para o making of
import api from "../services/api"; // ajuste o caminho conforme necessário

const API_BASE = import.meta.env.VITE_API_BASE || "http://localhost:3000";

export default function PaginaSessao() {
  const { projetoId, sessaoId } = useParams();
  const { projetos } = useProjetos();
  const sessao =
    projetos
      .find((p) => p.id === parseInt(projetoId))
      ?.sessoes.find((s) => s.id === parseInt(sessaoId)) || {};
  //   console.log(projetoId, sessaoId, projetos);
  const [img, setImg] = useState(null);

  const navigate = useNavigate();

  return (
    <main className="min-h-screen from-purple-100 to-white px-2 py-4">
      <button
        onClick={() => navigate(-1)}
        className="mb-6 text-purple-700 hover:underline text-sm"
      >
        ← Voltar para Sessões
      </button>
      <button
        className="absolute right-4 bg-purple-700 text-white px-4 py-2 rounded-lg shadow hover:bg-purple-800"
        onClick={() =>
          navigate(`/projetos/${projetoId}/sessao/${sessaoId}/making-of`)
        }
      >
        Ver making of <FaArrowRight className="inline mr-2" />
      </button>
      {sessao && (
        <h1 className="text-2xl font-bold text-purple-800 mb-1">
          {sessao.titulo}
        </h1>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {sessao?.fotos && sessao.fotos.length > 0 ? (
          sessao.fotos.map((foto, idx) => (
            <div
              key={foto + idx}
              className="relative bg-white rounded-3xl shadow-2xl overflow-hidden group hover:shadow-purple-300 transition-shadow duration-300 cursor-zoom-in"
              onClick={() => {
                setImg({ src: foto.caminho, alt: `Foto ${idx + 1}` });
                console.log(foto.caminho);
              }}
            >
              <img
                src={
                  foto.caminho.startsWith("http")
                    ? foto.caminho
                    : `${api.getUrlBase()}/${foto.caminho}`
                }
                alt={`Foto ${idx + 1}`}
                className="object-cover w-full h-80 sm:h-64 md:h-80 transition-transform duration-300 group-hover:scale-105"
                loading="lazy"
              />
            </div>
          ))
        ) : (
          <span className="text-gray-400 text-center col-span-full">
            Nenhuma foto nesta sessão.
          </span>
        )}
      </div>
      {img && (
        <ImageModal
          src={`${api.getUrlBase()}/${img.src}`}
          alt={img.alt}
          onClose={() => setImg(null)}
        />
      )}
    </main>
  );
}
