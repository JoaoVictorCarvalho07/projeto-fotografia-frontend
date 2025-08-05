import { useNavigate, useParams } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
import { useEffect, useState } from "react";
import { useStoryTelling } from "../hooks/useStorytelling";
export default function StorytellingPage() {
  const navigate = useNavigate();
  const { projetoId } = useParams();
  console.log("Projeto ID:", projetoId);

  const { storytellingByProjeto, fetchStorytelling } =
    useStoryTelling(projetoId);
  useEffect(() => {
    fetchStorytelling(projetoId);
  }, [projetoId, fetchStorytelling]);

  const storytelling = storytellingByProjeto[projetoId];
  if (!storytelling)
    return (
      <div className="min-h-screen flex flex-col items-center justify-center text-red-300">
        <p>Storytelling não encontrado.</p>
        <button
          onClick={() => navigate(-1)}
          className="mt-4 text-purple-400 underline"
        >
          <FaArrowLeft className="inline mr-1" />
          Voltar
        </button>
      </div>
    );

  return (
    <div className="bg-[#181824] min-h-screen text-white pb-16">
      <button
        onClick={() => navigate(-1)}
        className="mb-4 text-purple-700 hover:underline text-sm mt-4 ml-4"
      >
        <div className="flex items-center gap-2">
          <FaArrowLeft /> Voltar para Projetos
        </div>
      </button>
      {/* Capa Storytelling */}
      <section className="max-w-2xl mx-auto bg-white/5 mt-6 mb-10 rounded-xl overflow-hidden shadow p-4 text-center">
        {storytelling.capaVideo ? (
          <video
            src={storytelling.capaVideo}
            controls
            className="mx-auto rounded-lg max-h-64 w-full object-cover"
          />
        ) : storytelling.capaImagem ? (
          <img
            src={storytelling.capaImagem}
            alt=""
            className="mx-auto rounded-lg max-h-64 w-full object-cover"
          />
        ) : null}
        <h1 className="mt-4 text-2xl md:text-3xl font-extrabold text-purple-200">
          {storytelling.titulo}
        </h1>
        <p className="mt-2 text-base text-purple-100">{storytelling.resumo}</p>
      </section>

      {/* Linha do Tempo / Storytelling */}
      <div className="max-w-2xl mx-auto flex flex-col gap-10 px-2">
        {storytelling.etapas?.map((etapa) => (
          <section
            key={etapa.id}
            className="bg-white/10 rounded-xl shadow-lg p-5 flex flex-col gap-4 relative"
          >
            <div className="absolute left-[-32px] top-8 h-4 w-4 rounded-full bg-purple-500 border-4 border-purple-900" />
            <h2 className="text-xl font-bold text-purple-200 mb-2">
              {etapa.titulo}
            </h2>
            {/* Imagem/Video principal da etapa */}
            {etapa.media_type === "video" ? (
              <video
                src={etapa.media_src}
                controls
                className="w-full rounded-lg mb-3"
              />
            ) : (
              etapa.media_src && (
                <img
                  src={etapa.media_src}
                  alt=""
                  className="w-full rounded-lg mb-3"
                />
              )
            )}
            {etapa.texto && (
              <p className="text-base text-purple-100">{etapa.texto}</p>
            )}

            {/* Galeria mini de fotos */}
            {Array.isArray(etapa.galeria) && etapa.galeria.length > 0 && (
              <div className="flex gap-2 overflow-x-auto py-2">
                {etapa.galeria.map((img, i) => (
                  <img
                    key={i}
                    src={img}
                    className="w-20 h-20 object-cover rounded shadow"
                    alt=""
                  />
                ))}
              </div>
            )}

            {/* Comentário do admin */}
            {etapa.comentario_admin && (
              <div className="mt-2 pl-2 border-l-4 border-purple-600">
                <blockquote className="italic text-sm text-purple-100">
                  “{etapa.comentario_admin}”
                </blockquote>
              </div>
            )}
          </section>
        ))}
      </div>
    </div>
  );
}
