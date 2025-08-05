import { useEffect, useState } from "react";
import api from "../../services/api";
import { FaEdit, FaTrash, FaPlus, FaArrowLeft } from "react-icons/fa";
import { useMakingOff } from "../../hooks/useMakingOff";

export default function AdminMakingOf({ sessao, setAba }) {
  const [showModal, setShowModal] = useState(false);
  const [editMakingOf, setEditMakingOf] = useState(null);
  const { makingOff, fetchMakingOffByprojetos, loading } = useMakingOff();

  // Campo único
  const [descricao, setDescricao] = useState("");

  useEffect(() => {
    if (sessao?.id) fetchMakingOffByprojetos(sessao.projeto_id, sessao.id);
    // eslint-disable-next-line
  }, [sessao?.id]);
  useEffect(() => {
    if (makingOff) console.log("sessao making of ", makingOff);
  }, [makingOff]);

  function abrirModal(m = null) {
    setEditMakingOf(m);
    setDescricao(m?.descricao || "");
    setShowModal(true);
  }

  function fecharModal() {
    setShowModal(false);
    setEditMakingOf(null);
    setDescricao("");
  }

  async function salvarMakingOf(e) {
    e.preventDefault();
    const body = { descricao };
    if (editMakingOf) {
      await api.atualizarMakingOff(sessao.projeto_id, sessao.id, body);
    } else {
      await api.criarMakingOff(sessao.projeto_id, sessao.id, body);
    }
    fetchMakingOffByprojetos(sessao.projeto_id, sessao.id);
    fecharModal();
  }

  async function deletarMakingOf(id) {
    if (window.confirm("Tem certeza que deseja deletar este making of?")) {
      await api.deletarMakingOff(sessao.projeto_id, sessao.id, id);
      fetchMakingOffByprojetos(sessao.projeto_id, sessao.id);
    }
  }

  if (loading)
    return <div className="text-purple-200">Carregando making of...</div>;

  return (
    <div>
      <div className="flex flex-wrap gap-2 items-center mb-6">
        <button
          className="text-purple-400 flex underline"
          onClick={() => setAba("sessoes")}
        >
          <FaArrowLeft />
          <div className="pl-2 ">Voltar</div>
        </button>
        <button
          className="ml-auto flex items-center bg-purple-700 hover:bg-purple-800 text-white font-bold py-2 px-4 rounded-xl gap-2"
          onClick={() => abrirModal(null)}
        >
          <FaPlus /> Novo Making Of
        </button>
      </div>
      <h2 className="text-2xl font-bold">Making Of da Sessão</h2>

      {/* Cards responsivos */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {makingOff.length === 0 && (
          <div className="text-purple-200 col-span-full">
            Nenhum making of cadastrado ainda.
          </div>
        )}
        {makingOff ? (
          <div
            key={makingOff.id}
            className="bg-white/10 rounded-2xl p-4 shadow flex flex-col h-full"
          >
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-lg font-bold text-purple-200">
                #{makingOff.id}
              </h3>
              <div className="flex gap-2">
                <button
                  className="bg-purple-600 hover:bg-purple-700 p-2 rounded text-white"
                  onClick={() => abrirModal(makingOff)}
                >
                  <FaEdit />
                </button>
                <button
                  className="bg-red-700 hover:bg-red-800 p-2 rounded text-white"
                  onClick={() => deletarMakingOf(makingOff.id)}
                >
                  <FaTrash />
                </button>
              </div>
            </div>
            {makingOff.descricao && (
              <p className="text-purple-100 mb-2">{makingOff.descricao}</p>
            )}
          </div>
        ) : null}
      </div>

      {/* Modal para criar/editar making of */}
      {showModal && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-40">
          <form
            className="bg-[#22223a] rounded-2xl shadow-lg p-8 w-full max-w-lg flex flex-col gap-4"
            onSubmit={salvarMakingOf}
          >
            <h2 className="text-xl font-bold mb-2">
              {editMakingOf ? "Editar Making Of" : "Novo Making Of"}
            </h2>
            <textarea
              className="p-2 rounded bg-white/10 text-white"
              placeholder="Descrição do making of"
              value={descricao}
              onChange={(e) => setDescricao(e.target.value)}
              rows={3}
              required
            />
            <div className="flex flex-wrap gap-4 mt-4">
              <button
                className="flex-1 bg-purple-700 hover:bg-purple-800 text-white py-2 rounded-xl min-w-[120px]"
                type="submit"
              >
                Salvar
              </button>
              <button
                className="flex-1 bg-gray-700 hover:bg-gray-800 text-white py-2 rounded-xl min-w-[120px]"
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
