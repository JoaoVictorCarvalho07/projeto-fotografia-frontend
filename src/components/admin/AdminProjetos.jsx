import { useEffect, useRef, useState } from "react";
import { FaEdit, FaTrash, FaPlus } from "react-icons/fa";
import api from "../../services/api"; // troque pelo seu serviço
import useProjetos from "../../hooks/useProjetos";

export default function AdminProjetos({ onSelectProjeto, setAba }) {
  const { projetos, loading, fetchProjetos } = useProjetos();

  const [showModal, setShowModal] = useState(false);
  const [editProjeto, setEditProjeto] = useState(null);

  // Campos do form
  const [titulo, setTitulo] = useState("");
  const [descricao, setDescricao] = useState("");
  const [emAndamento, setEmAndamento] = useState(false);
  const [capaFile, setCapaFile] = useState(null); // arquivo
  const [capaPreview, setCapaPreview] = useState(""); // preview
  const fileInputRef = useRef();

  // Fetch projetos
  useEffect(() => {
    fetchProjetos();
  }, []);

  function abrirModal(proj = null) {
    setEditProjeto(proj);
    setTitulo(proj?.titulo || "");
    setDescricao(proj?.descricao || "");
    setEmAndamento(!!proj?.em_andamento);

    // Preview/capa inicial para edição
    setCapaPreview(api.urlBase + proj?.capa_url || "");
    setCapaFile(null);
    if (fileInputRef.current) fileInputRef.current.value = null;
    setShowModal(true);
  }

  function fecharModal() {
    setShowModal(false);
    setEditProjeto(null);
    setTitulo("");
    setDescricao("");
    setEmAndamento(false);
    setCapaFile(null);
    setCapaPreview("");
    if (fileInputRef.current) fileInputRef.current.value = null;
  }

  function handleCapaChange(e) {
    const file = e.target.files[0];
    if (file) {
      setCapaFile(file);
      setCapaPreview(URL.createObjectURL(file));
    }
  }

  function limparImagem() {
    setCapaFile(null);
    setCapaPreview(editProjeto?.capa_url || "");
    if (fileInputRef.current) fileInputRef.current.value = null;
  }

  async function salvarProjeto(e) {
    e.preventDefault();

    const formData = new FormData();
    const fileFormData = new FormData();
    formData.append("titulo", titulo);
    formData.append("descricao", descricao);
    formData.append("em_andamento", emAndamento ? 1 : 0);
    console.log("Salvando projeto com dados:", Array.from(formData.values()));

    const file = capaFile || fileInputRef.current?.files[0];
    if (file) {
      fileFormData.append("capa", file);
    }

    try {
      if (editProjeto) {
        await api.atualizarProjeto(editProjeto.id, formData);
        if (file) {
          const res = await api.uploadCapaProjeto(editProjeto.id, fileFormData);
          console.log("Capa do projeto atualizada:", res);
          setCapaPreview(res.capa_url);
        }
      } else {
        const { data } = await api.criarProjeto(formData);
        console.log("testando upload de capa:", fileFormData);
        console.log("testando data:", data);
        if (data.id && file) {
          const res = await api.uploadCapaProjeto(data.id, fileFormData);
          console.log("Capa do projeto atualizada:", res);
          setCapaPreview(res.capa_url);
        }
      }
      fecharModal();
      fetchProjetos();
    } catch (err) {
      alert("Erro ao salvar projeto. Verifique sua conexão." + err.message);
    }
  }

  async function deletarProjeto(id) {
    console.log("Deletando projeto:", id);
    if (window.confirm("Tem certeza que deseja deletar este projeto?")) {
      const res = await api.deletarProjeto(id);
      console.log("Projeto deletado:", res);
      fetchProjetos();
    }
  }

  if (loading)
    return <div className="text-purple-200">Carregando projetos...</div>;

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Projetos</h2>
        <button
          className="flex items-center bg-purple-700 hover:bg-purple-800 text-white font-bold py-2 px-4 rounded-xl gap-2"
          onClick={() => abrirModal(null)}
        >
          <FaPlus /> Novo Projeto
        </button>
      </div>

      {/* Lista de projetos em cards */}
      <div className="grid md:grid-cols-3 gap-6">
        {console.log(projetos)}
        {projetos.map((proj) => (
          <div
            key={proj.id}
            className="bg-white/10 rounded-xl shadow p-4 flex flex-col gap-2 group"
          >
            <div className="w-full h-48 overflow-hidden rounded-md">
              <img
                src={api.getUrlBase() + "/" + proj.capa_url}
                alt=""
                //mudar a renderizacao da imagem object[25-75]
                className="w-full h-full object-cover object-[50%_20%]"
                onError={(e) => (e.target.style.display = "none")}
              />
            </div>

            <div className="flex-1">
              <h3 className="text-xl font-bold text-purple-200 mb-1">
                {proj.titulo}
              </h3>
              <p className="text-sm text-purple-100 mb-2 line-clamp-2">
                {proj.descricao}
              </p>
              <span
                className={`inline-block text-xs rounded px-2 py-1 mt-2 ${
                  proj.em_andamento ? "bg-green-700" : "bg-gray-600"
                }`}
              >
                {proj.em_andamento ? "Em andamento" : "Finalizado"}
              </span>
            </div>
            <div className="flex gap-2 mt-3">
              <button
                className="bg-purple-600 hover:bg-purple-700 p-2 rounded text-white"
                onClick={() => abrirModal(proj)}
              >
                <FaEdit />
              </button>
              <button
                className="bg-red-700 hover:bg-red-800 p-2 rounded text-white"
                onClick={() => deletarProjeto(proj.id)}
              >
                <FaTrash />
              </button>
              <button
                className="ml-auto bg-white/10 text-purple-300 font-bold py-1 px-3 rounded hover:underline"
                onClick={() => {
                  console.log("Selecionando projeto:", proj);
                  onSelectProjeto(proj);
                  setAba("sessoes"); // ou "storytelling"
                }}
              >
                Gerenciar
              </button>
              <button
                className="ml-auto bg-white/10 text-purple-300 font-bold py-1 px-3 rounded hover:underline"
                onClick={() => {
                  onSelectProjeto(proj);
                  setAba("storytelling"); // ou "storytelling"
                }}
              >
                StoryTelling
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Modal para criar/editar projeto */}
      {showModal && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-40">
          <form
            className="bg-[#22223a] rounded-2xl shadow-lg p-8 w-full max-w-md flex flex-col gap-4"
            onSubmit={salvarProjeto}
            encType="multipart/form-data"
          >
            <h2 className="text-xl font-bold mb-2">
              {editProjeto ? "Editar Projeto" : "Novo Projeto"}
            </h2>
            <input
              className="p-2 rounded bg-white/10 text-white"
              placeholder="Título"
              value={titulo}
              onChange={(e) => setTitulo(e.target.value)}
              required
            />
            <textarea
              className="p-2 rounded bg-white/10 text-white"
              placeholder="Descrição"
              value={descricao}
              onChange={(e) => setDescricao(e.target.value)}
              rows={3}
              required
            />

            {/* Input de imagem com preview */}
            <label className="block font-bold text-white mb-1">
              Imagem de capa:
            </label>
            {capaPreview && (
              <div className="mb-2">
                <img
                  src={capaPreview}
                  alt="Preview da capa"
                  className="h-36 rounded-lg border"
                />
                {capaFile && (
                  <button
                    type="button"
                    className="text-red-400 ml-2 text-sm underline"
                    onClick={limparImagem}
                  >
                    Remover imagem
                  </button>
                )}
              </div>
            )}
            <input
              type="file"
              accept="image/*"
              className="bg-white/10 text-white rounded p-2"
              onChange={handleCapaChange}
              ref={fileInputRef}
            />

            <label className="flex items-center gap-2 mt-2">
              <input
                type="checkbox"
                checked={emAndamento}
                onChange={(e) => setEmAndamento(e.target.checked)}
              />
              Em andamento
            </label>
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
