import { useState } from "react";
import AdminTable from "./AdminTable";
import AdminModal from "./AdminModal";

// Dados mockados para testes (você pode puxar de um API depois)
const projetos = [
  { id: 1, titulo: "Afrodite" },
  { id: 2, titulo: "Roda das Deusas" },
];

export default function SessoesAdmin() {
  // Estado local de sessões (mock)
  const [sessoes, setSessoes] = useState([
    { id: 1, projeto_id: 1, titulo: "Sessão Praia", modelo_id: null },
    { id: 2, projeto_id: 2, titulo: "Sessão Ritual", modelo_id: null },
  ]);
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState(null);

  function handleSaveSessao(data) {
    if (editing) {
      setSessoes((prev) =>
        prev.map((sessao) =>
          sessao.id === editing.id ? { ...sessao, ...data } : sessao
        )
      );
    } else {
      setSessoes((prev) => [...prev, { ...data, id: Date.now() }]);
    }
    setModalOpen(false);
    setEditing(null);
  }

  function handleDeleteSessao(id) {
    setSessoes((prev) => prev.filter((sessao) => sessao.id !== id));
  }

  return (
    <div>
      <button
        onClick={() => {
          setEditing(null);
          setModalOpen(true);
        }}
        className="mb-4 bg-purple-600 text-white px-4 py-2 rounded shadow hover:bg-purple-700"
      >
        Nova Sessão
      </button>
      <AdminTable
        data={sessoes.map((sessao) => ({
          ...sessao,
          projeto:
            projetos.find((p) => p.id === sessao.projeto_id)?.titulo || "—",
        }))}
        columns={[
          { key: "titulo", label: "Título" },
          { key: "projeto", label: "Projeto" },
        ]}
        onEdit={(sessao) => {
          setEditing(sessao);
          setModalOpen(true);
        }}
        onDelete={(sessao) => handleDeleteSessao(sessao.id)}
      />
      {modalOpen && (
        <SessaoModal
          initialData={editing}
          projetos={projetos}
          onSave={handleSaveSessao}
          onClose={() => {
            setModalOpen(false);
            setEditing(null);
          }}
        />
      )}
    </div>
  );
}

// Modal específico para Sessão (com seleção de projeto)
function SessaoModal({ initialData, projetos, onSave, onClose }) {
  const [form, setForm] = useState(
    initialData || { titulo: "", projeto_id: projetos[0]?.id || "" }
  );

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    onSave(form);
  }

  return (
    <div className="fixed inset-0 z-30 bg-black/40 flex items-center justify-center">
      <form
        className="bg-white rounded-lg shadow-lg p-6 min-w-[300px] max-w-md"
        onSubmit={handleSubmit}
      >
        <h2 className="text-lg font-bold mb-4">
          {initialData ? "Editar Sessão" : "Nova Sessão"}
        </h2>
        <label className="block mb-2">
          Título
          <input
            name="titulo"
            value={form.titulo}
            onChange={handleChange}
            required
            className="block w-full border rounded p-2"
            placeholder="Título da sessão"
          />
        </label>
        <label className="block mb-2">
          Projeto
          <select
            name="projeto_id"
            value={form.projeto_id}
            onChange={handleChange}
            required
            className="block w-full border rounded p-2"
          >
            {projetos.map((p) => (
              <option key={p.id} value={p.id}>
                {p.titulo}
              </option>
            ))}
          </select>
        </label>
        <div className="flex gap-2 mt-6">
          <button
            type="submit"
            className="bg-purple-700 hover:bg-purple-800 text-white px-4 py-2 rounded font-bold"
          >
            Salvar
          </button>
          <button
            type="button"
            onClick={onClose}
            className="bg-gray-200 hover:bg-gray-300 text-gray-700 px-4 py-2 rounded font-bold"
          >
            Cancelar
          </button>
        </div>
      </form>
    </div>
  );
}
