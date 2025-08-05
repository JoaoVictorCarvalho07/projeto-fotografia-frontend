import { useNavigate, useParams } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
import { useEffect } from "react";
import { useMakingOff } from "../hooks/useMakingOff";
import { useState } from "react";

// Recebe sessaoId pela URL ou prop, pode adaptar conforme seu roteamento!
export default function MakingOffPage() {
  const navigate = useNavigate();
  console.log("MakingOffPage");
  const { projetoId, sessaoId } = useParams(); // se vier pela rota
  const { makingOff, loading, fetchMakingOffByprojetos } = useMakingOff();

  // Pega sessão pelo prop ou rota (adapte como quiser)

  useEffect(() => {
    fetchMakingOffByprojetos(projetoId, sessaoId);
    console.log("makingoddd:", makingOff);
  }, [fetchMakingOffByprojetos]);

  return (
    <div className="min-h-screen text-white pb-16">
      <button
        onClick={() => navigate(-1)}
        className="mb-4 text-purple-700 hover:underline text-sm mt-4 ml-4"
      >
        <div className="flex items-center gap-2">
          <FaArrowLeft /> Voltar para Projetos
        </div>
      </button>
      {/* Capa Making Of */}
      <section className="max-w-2xl mx-auto bg-white/5 mt-6 mb-10 rounded-xl overflow-hidden shadow p-4 text-center">
        <h1 className="mt-4 text-2xl md:text-3xl font-extrabold text-fuchsia-200">
          {makingOff?.titulo}
        </h1>
        <p className="mt-2 text-base text-fuchsia-100">
          Bastidores, curiosidades e a magia por trás da sessão.
        </p>
      </section>

      {/* Cards de making of */}
      <div className="max-w-2xl mx-auto flex flex-col gap-10 px-2">
        {loading ? (
          <div className="text-center text-fuchsia-300">
            Carregando making of...
          </div>
        ) : makingOff?.length === 0 ? (
          <div className="text-center text-fuchsia-200">
            Nenhum making of encontrado.
          </div>
        ) : (
          makingOff.etapas.map((item) => (
            <section
              key={item.id}
              className="bg-white/10 rounded-xl shadow-lg p-5 flex flex-col gap-4 relative"
            >
              <div className="absolute left-[-32px] top-8 h-4 w-4 rounded-full bg-fuchsia-500 border-4 border-fuchsia-900" />
              <h2 className="text-xl font-bold text-fuchsia-200 mb-2">
                {item.descricao?.slice(0, 32) || `Making Of #${item.id}`}
              </h2>
              {/* Vídeo principal */}
              {item.video_url && (
                <video
                  src={item.video_url}
                  controls
                  className="w-full rounded-lg mb-3"
                />
              )}
              {/* Descrição */}
              {item.descricao && (
                <p className="text-base text-fuchsia-100">{item.descricao}</p>
              )}

              {/* Galeria */}
              {item.galeria && item.galeria.length > 0 && (
                <div className="flex gap-2 overflow-x-auto py-2">
                  {item.galeria.map((media) =>
                    media.tipo === "imagem" ? (
                      <img
                        key={media.id}
                        src={media.url}
                        className="w-20 h-20 object-cover rounded shadow flex-shrink-0"
                        alt=""
                      />
                    ) : (
                      <video
                        key={media.id}
                        src={media.url}
                        controls
                        className="w-20 h-20 object-cover rounded shadow flex-shrink-0"
                      />
                    )
                  )}
                </div>
              )}
            </section>
          ))
        )}
      </div>
    </div>
  );
}
