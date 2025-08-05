import { use, useEffect, useState } from "react";
import { FaArrowRight, FaTrash } from "react-icons/fa"; // ícone de seta para ir para o making of
import api from "../../services/api";
import useProjetos from "../../hooks/useProjetos";

export default function SessaoPageAdmin({ selectedSessao, setAba }) {
  const [sessao, setSessao] = useState();
  const { fetchProjetos, projetos } = useProjetos();

  console.log("SessaoPageAdmin", selectedSessao);
  useEffect(() => {
    const sessoes = projetos.find(
      (p) => p.id === selectedSessao.projeto_id
    )?.sessoes;
    setSessao(sessoes.find((s) => s.id === selectedSessao.id));
  }, [projetos, selectedSessao]);

  const deletarFoto = async (sessaoId, fotoId) => {
    try {
      try {
        const resp = await api.deletarArquivoSessao(
          sessao.projeto_id,
          sessaoId,
          fotoId
        );
        if (resp.status === 200) {
          console.log("Foto deletada com sucesso");
          fetchProjetos();
        } else {
          console.error("Erro ao deletar foto:", resp.data);
        }
      } catch (error) {
        console.error("Erro ao deletar foto:", error);
      }
      // Atualizar a sessão localmente ou refetch
      setAba("sessao");
    } catch (error) {
      console.error("Erro ao deletar foto:", error);
    } finally {
      fetchProjetos();
    }
  };

  return (
    <main className="min-h-screen from-purple-100 to-white px-2 py-4">
      <div className="flex items-center gap-4 mb-6">
        <button
          className="text-purple-400 underline"
          onClick={() => setAba("sessoes")}
        >
          Voltar a sessoes
        </button>
        <h2 className="text-2xl font-bold">Sessao {sessao?.titulo}</h2>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {sessao?.fotos && sessao.fotos.length > 0 ? (
          sessao.fotos.map((foto, idx) => (
            <div
              key={foto + idx}
              className="relative bg-white rounded-3xl shadow-2xl overflow-hidden group hover:shadow-purple-300 transition-shadow duration-300 cursor-zoom-in"
            >
              <img
                src={
                  foto.caminho.startsWith("http")
                    ? foto.caminho
                    : `${api.getUrlBase()}/${foto.caminho}`
                }
                alt={`Foto ${foto.id}`}
                className="object-cover w-full h-80 sm:h-64 md:h-80 transition-transform duration-300 group-hover:scale-105"
                loading="lazy"
              />
              <button
                type="button"
                className="absolute top-3 right-3 bg-red-500 text-xs text-white rounded-full px-3 py-2"
                title="deletar media da sessão"
                onClick={() => deletarFoto(sessao.id, foto.id)}
              >
                <FaTrash className="h-3 w-3" />
              </button>
            </div>
          ))
        ) : (
          <span className="text-gray-400 text-center col-span-full">
            Nenhuma foto nesta sessão.
          </span>
        )}
      </div>
    </main>
  );
}
