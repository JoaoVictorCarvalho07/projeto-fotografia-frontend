import React, { useState, useEffect } from "react";
// import API from "../services/api";

export default function ProjectForm({ projeto, onSuccess }) {
  const [cardSelecionado, setCardSelecionado] = useState(null);
  const [menuAberto, setMenuAberto] = useState(false);

  const isEdit = Boolean(projeto?.id);
  const [titulo, setTitulo] = useState("");
  const [descricao, setDescricao] = useState("");
  const [emAndamento, setEmAndamento] = useState(false);
  const [capa, setCapa] = useState(null);
  const [imagens, setImagens] = useState([]);
  const [status, setStatus] = useState("");

  useEffect(() => {
    if (projeto) {
      setTitulo(projeto.titulo);
      setDescricao(projeto.descricao);
      setEmAndamento(projeto.em_andamento);
    }
  }, [projeto]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus(isEdit ? "Atualizando..." : "Criando...");
    try {
      let projetoId = projeto?.id;
      if (isEdit) {
        await API.put(`/projetos/${projetoId}`, {
          titulo,
          descricao,
          em_andamento: emAndamento,
        });
      } else {
        const res = await API.post("/projetos", {
          titulo,
          descricao,
          em_andamento: emAndamento,
        });
        projetoId = res.data.id;
      }

      if (capa) {
        const f = new FormData();
        f.append("imagem", capa);
        await API.post(`/upload/projetos/${projetoId}/capa`, f, {
          headers: { "Content-Type": "multipart/form-data" },
        });
      }

      if (imagens.length) {
        const f2 = new FormData();
        imagens.forEach((file) => f2.append("imagens", file));
        await API.post(`/upload/projetos/${projetoId}/imagens`, f2, {
          headers: { "Content-Type": "multipart/form-data" },
        });
      }

      setStatus(isEdit ? "Atualizado!" : "Criado!");
      onSuccess();
    } catch {
      setStatus("Erro!");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full max-w-2xl mx-auto p-4 sm:p-6 md:p-8 bg-white rounded-lg shadow space-y-5"
    >
      <h2 className="text-xl sm:text-2xl font-semibold text-center">
        {isEdit ? "Editar Projeto" : "Novo Projeto"}
      </h2>

      <input
        type="text"
        placeholder="Título"
        value={titulo}
        onChange={(e) => setTitulo(e.target.value)}
        required
        className="w-full border border-gray-300 px-3 py-2 rounded text-sm sm:text-base"
      />

      <textarea
        placeholder="Descrição"
        value={descricao}
        onChange={(e) => setDescricao(e.target.value)}
        rows="4"
        required
        className="w-full border border-gray-300 px-3 py-2 rounded text-sm sm:text-base"
      />

      <label className="flex items-center gap-2 text-sm">
        <input
          type="checkbox"
          checked={emAndamento}
          onChange={(e) => setEmAndamento(e.target.checked)}
        />
        Em andamento?
      </label>

      <div className="flex flex-wrap gap-4">
        <label className="w-full sm:w-32 text-center cursor-pointer border-2 border-purple-400 rounded-xl py-2 px-2 shadow-md hover:bg-purple-950 hover:scale-105 transition duration-300 text-sm text-white bg-purple-700">
          Capa
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setCapa(e.target.files[0])}
            className="hidden"
          />
        </label>

        <label className="w-full sm:w-32 text-center cursor-pointer border-2 border-purple-400 rounded-xl py-2 px-2 shadow-md hover:bg-purple-950 hover:scale-105 transition duration-300 text-sm text-white bg-purple-700">
          Imagens
          <input
            type="file"
            multiple
            accept="image/*"
            onChange={(e) => setImagens(Array.from(e.target.files))}
            className="hidden"
          />
        </label>
      </div>

      {status && <p className="text-sm text-primary text-center">{status}</p>}

      <button
        type="submit"
        className="w-full bg-primary text-white px-4 py-2 rounded hover:bg-primary/80 transition"
      >
        {isEdit ? "Atualizar" : "Criar"}
      </button>
    </form>
  );
}
