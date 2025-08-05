import { useEffect, useState } from "react";
import { FaEdit, FaPlus, FaArrowLeft } from "react-icons/fa";
import api from "../../services/api";
import { useStoryTelling } from "../../hooks/useStorytelling";

export default function AdminStorytelling({
  projeto,

  onSelectStorytelling,
  setAba,
}) {
  // Modal para criar/editar storytelling
  const [showModal, setShowModal] = useState(false);
  const [texto, setTexto] = useState("");

  const { storytellingByProjeto, fetchStorytelling, loading } = useStoryTelling(
    projeto.id
  );
  useEffect(() => {
    fetchStorytelling(projeto.id);
  }, [projeto.id]);

  function abrirModalEditar() {
    setTexto(storytellingByProjeto?.texto || "");
    setShowModal(true);
  }
  function abrirModalCriar() {
    setTexto("");
    setShowModal(true);
  }
  function fecharModal() {
    setShowModal(false);
  }

  async function salvarStorytelling(e) {
    e.preventDefault();
    if (storytellingByProjeto) {
      // Editar
      await api.atualizarStorytelling(projeto.id, {
        texto: texto,
      });
    }
    fetchStorytelling();
    fecharModal();
  }

  async function deletarStorytelling() {
    if (
      window.confirm(
        "Deseja remover este storytelling? Todas as etapas também serão removidas."
      )
    ) {
      await api.deletarStorytelling(projeto.id);
      fetchStorytelling();
    }
  }

  // Quando clicar em "Gerenciar etapas"
  function gerenciarEtapas() {
    onSelectStorytelling(storytellingByProjeto);
    setAba("etapasStoryTelling");
  }

  return (
    <div>
      <h2 className="text-xl font-bold mb-6">
        <span className="">Storytelling do Projeto: </span>
        <span className="text-purple-200">{projeto.titulo}</span>
      </h2>
      <button>
        <div>
          <FaArrowLeft
            className="text-purple-300 hover:text-purple-200"
            onClick={() => setAba("projetos")}
          />
          Voltar
        </div>
      </button>
      {loading ? (
        <div className="text-purple-300">Carregando...</div>
      ) : storytellingByProjeto ? (
        <div className="bg-white/10 rounded-xl shadow p-6 max-w-xl mx-auto flex flex-col gap-3">
          <div className="flex justify-between items-center">
            <div className="text-purple-200 text-lg font-bold">
              <h3 className="text-lg font-bold text-purple-200">texto:</h3>
              {storytellingByProjeto[projeto.id]?.texto}
            </div>
            <div className="flex gap-2">
              <button
                className="bg-purple-700 hover:bg-purple-800 text-  white p-2 rounded"
                onClick={abrirModalEditar}
                title="Editar"
              >
                <FaEdit />
              </button>
              <button
                className="bg-red-700 hover:bg-red-800 text-white p-2 rounded"
                onClick={deletarStorytelling}
                title="Deletar"
              >
                🗑️
              </button>
            </div>
          </div>
          <div className="text-purple-100 whitespace-pre-line">
            {storytellingByProjeto.texto}
          </div>
          <button
            className="mt-6 bg-fuchsia-700 hover:bg-fuchsia-800 text-white py-2 rounded-xl font-bold"
            onClick={gerenciarEtapas}
          >
            Ver Etapas
          </button>
        </div>
      ) : (
        <div className="flex flex-col items-center gap-4">
          <p className="text-purple-300">
            Nenhum storytelling cadastrado para este projeto.
          </p>
          <button
            className="bg-purple-700 hover:bg-purple-800 text-white font-bold py-2 px-4 rounded-xl flex items-center gap-2"
            onClick={abrirModalCriar}
          >
            <FaPlus /> Criar Storytelling
          </button>
        </div>
      )}

      {/* Modal de criar/editar storytelling */}
      {showModal && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-40">
          <form
            className="bg-[#22223a] rounded-2xl shadow-lg p-8 w-full max-w-md flex flex-col gap-4"
            onSubmit={salvarStorytelling}
          >
            <h2 className="text-xl font-bold mb-2">
              {storytellingByProjeto
                ? "Editar Storytelling"
                : "Novo Storytelling"}
            </h2>

            <label>texto resumo:</label>
            <textarea
              className="p-2 rounded bg-white/10 text-white"
              placeholder="Texto do storytelling"
              value={texto}
              onChange={(e) => setTexto(e.target.value)}
              rows={6}
              required
            />
            <div className="flex gap-4 mt-4">
              <button
                className="flex-1 bg-purple-700 hover:bg-purple-800 text-white py-2 rounded-xl"
                type="submit"
              >
                Salvar
              </button>
              <button
                className="flex-1 bg-gray-700 hover:bg-gray-800 text-white py-2 rounded-xl"
                type="button"
                onClick={fecharModal}
              >
                Cancelar
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
