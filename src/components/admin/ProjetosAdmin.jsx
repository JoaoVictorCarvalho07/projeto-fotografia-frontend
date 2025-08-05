import { useState } from "react";
import AdminTable from "./AdminTable";
import AdminModal from "./AdminModal";

export default function ProjetosAdmin() {
  // Exemplo de dados mockados (troque para fetch real depois)
  const [projetos, setProjetos] = useState([
    {
      id: 1,
      titulo: "Afrodite",
      descricao: "Ensaio mitológico",
      em_andamento: true,
    },
    {
      id: 2,
      titulo: "Roda das Deusas",
      descricao: "Retratos espirituais",
      em_andamento: false,
    },
  ]);
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState(null);

  function handleSaveProjeto(data) {
    if (editing) {
      setProjetos((prev) =>
        prev.map((proj) =>
          proj.id === editing.id ? { ...proj, ...data } : proj
        )
      );
    } else {
      setProjetos((prev) => [
        ...prev,
        { ...data, id: Date.now() }, // Gera id fake
      ]);
    }
    setModalOpen(false);
    setEditing(null);
  }

  function handleDeleteProjeto(id) {
    setProjetos((prev) => prev.filter((proj) => proj.id !== id));
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
        Novo Projeto
      </button>
      <AdminTable
        data={projetos}
        columns={[
          { key: "titulo", label: "Título" },
          { key: "descricao", label: "Descrição" },
          { key: "em_andamento", label: "Status" },
        ]}
        onEdit={(proj) => {
          setEditing(proj);
          setModalOpen(true);
        }}
        onDelete={(proj) => handleDeleteProjeto(proj.id)}
      />
      {modalOpen && (
        <AdminModal
          initialData={editing}
          onSave={handleSaveProjeto}
          onClose={() => {
            setModalOpen(false);
            setEditing(null);
          }}
        />
      )}
    </div>
  );
}
