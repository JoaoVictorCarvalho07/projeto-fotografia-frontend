import { useParams, useNavigate } from "react-router-dom";
import CardSessaoHorizontal from "../components/cardSessaoHorizontal"; // ajuste o caminho conforme necessário
import useProjetos from "../hooks/useProjetos"; // use o hook que você criou
// Adapte o import conforme o caminho do seu projeto!
import { FaArrowLeft, FaArrowRight } from "react-icons/fa"; // ícone de seta para voltar

const API_BASE = import.meta.env.VITE_API_BASE || "http://localhost:3000";

export default function Sessoes() {
  const { projetoId } = useParams();
  const { projetos } = useProjetos();

  const projeto = projetos.find((p) => p.id === parseInt(projetoId));
  const navigate = useNavigate();

  if (!projetos) {
    return (
      <div className="text-center mt-10 bg-secondary text-gray-400">
        Carregando...
      </div>
    );
  }

  return (
    <main
      className="max-w-7xl mx-auto bg-secondary pb-16 px-2 pt-4
    "
    >
      <button
        onClick={() => navigate(-1)}
        className="mb-4 text-purple-700 hover:underline text-sm"
      >
        <div className="flex items-center gap-2">
          <FaArrowLeft /> Voltar para Projetos
        </div>
      </button>
      <button
        className="absolute right-4 bg-purple-700 text-white px-4 py-2 rounded-lg shadow hover:bg-purple-800"
        onClick={() => navigate(`/projetos/${projeto.id}/storytelling`)}
      >
        <div>
          Ver Storytelling
          <FaArrowRight className="inline mr-2" />
        </div>
      </button>
      <h1 className="mt-4 text-3xl flex justify-center font-bold text-purple-700 mb-3">
        {projeto?.titulo}
      </h1>
      <p className="mb-6 text-gray-600 text-base flex justify-center">
        {projeto?.descricao}
      </p>

      <div className="flex flex-col justify-center bg-secondary items-center gap-4 sm:grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {projeto?.sessoes && projeto.sessoes.length > 0 ? (
          projeto.sessoes.map((sessao) => (
            <CardSessaoHorizontal
              sessao={{
                ...sessao,
                fotos: (sessao.fotos || []).map((f) =>
                  f.caminho.startsWith("http") ? f : `${API_BASE}${f}`
                ),
              }}
              onClick={() =>
                navigate(`/projetos/${projetoId}/sessao/${sessao.id}`)
              }
            />
          ))
        ) : (
          <span className="text-gray-400 text-center">
            Nenhuma sessão disponível.
          </span>
        )}
      </div>
    </main>
  );
}
