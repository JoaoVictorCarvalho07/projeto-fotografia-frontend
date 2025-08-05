import { use, useEffect, useRef, useState } from "react";
import api from "../../services/api";
import { FaEdit, FaTrash, FaPlus, FaArrowLeft } from "react-icons/fa";
import useProjetos from "../../hooks/useProjetos";

export default function AdminSessoes({ projeto, onSelectSessao, setAba }) {
  const { fetchProjetos, projetos, loading } = useProjetos();
  const [sessoes, setSessoes] = useState([]);

  // const [projetoSelecionado, setProjetoSelecionado] = useState(projeto);
  useEffect(() => {
    setSessoes(projetos.find((p) => p.id === projeto.id).sessoes);
  }, [projetos, fetchProjetos]);

  const [showModal, setShowModal] = useState(false);
  const [editSessao, setEditSessao] = useState(null);

  // Form fields
  const [ordem, setOrdem] = useState(1);
  const [titulo, setTitulo] = useState("");
  // const [modeloId, setModeloId] = useState("");
  const [capaFile, setCapaFile] = useState(null);
  const [capaPreview, setCapaPreview] = useState("");
  const fileInputRef = useRef();
  const [arquivos, setArquivos] = useState([]); // Para múltiplos arquivos
  const [arquivosPreview, setArquivosPreview] = useState([]); // Para mostrar os previews
  const arquivosInputRef = useRef();

  function handleArquivosChange(e) {
    const files = Array.from(e.target.files);
    setArquivos(files);

    // Para preview (apenas imagens)
    setArquivosPreview(files.map((file) => URL.createObjectURL(file)));
  }

  function limparArquivos() {
    setArquivos([]);
    setArquivosPreview([]);
    if (arquivosInputRef.current) arquivosInputRef.current.value = null;
  }

  function abrirModal(sessao = null) {
    setEditSessao(sessao);
    setOrdem(sessao?.ordem || 1);
    setTitulo(sessao?.titulo || "");
    // setModeloId(sessao?.modelo_id || "");
    setCapaPreview(sessao?.capa_url || "");
    setCapaFile(null);
    if (fileInputRef.current) fileInputRef.current.value = null;
    setShowModal(true);
  }

  function fecharModal() {
    setShowModal(false);
    setEditSessao(null);
    setOrdem(1);
    setTitulo("");
    // setModeloId("");
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
    setCapaPreview(editSessao?.capa_url || "");
    if (fileInputRef.current) fileInputRef.current.value = null;
  }

  async function salvarSessao(e) {
    e.preventDefault();
    const formData = new FormData();
    formData.append("titulo", titulo);

    const fileCapaForm = new FormData();
    const filesForm = new FormData();
    const file = capaFile || fileInputRef.current?.files[0];
    if (file) {
      fileCapaForm.append("capa", file);
    }

    arquivos.forEach((file) => {
      filesForm.append("arquivos", file); // O backend precisa aceitar "arquivos" como array!
    });
    try {
      if (editSessao) {
        // Atualiza sessão existente
        try {
          const resp = await api.editarSessao(
            projeto.id,
            editSessao.id,
            formData
          );
          if (resp) {
            console.log("Sessão atualizada:", resp);
            setTitulo(resp.titulo);
          }
          if (capaFile) {
            try {
              const resp = await api.uploadCapaSessao(
                projeto.id,
                editSessao.id,
                fileCapaForm
              );
              if (resp) {
                console.log("Capa da sessão atualizada:", resp);
              }
            } catch (error) {
              console.error("Erro ao fazer upload da capa:", error);
            }
          }
          if (arquivos.length > 0) {
            try {
              await api.uploadArquivosSessao(
                projeto.id,
                editSessao.id,
                filesForm
              );
            } catch (error) {
              console.error("Erro ao fazer upload dos arquivos:", error);
            }
          }
        } catch (error) {
          console.error("Erro ao atualizar sessão:", error);
        }
      } else {
        // Cria nova sessão
        const resp = await api.criarSessao(projeto.id, formData);
        const data = resp.data;

        if (data.id && capaFile) {
          try {
            const resp = await api.uploadCapaSessao(
              projeto.id,
              data.id,
              fileCapaForm
            );
            if (resp.status == 200) {
              console.log("Capa da sessão criada:", resp.status);
              fetchProjetos();
            }
          } catch (error) {
            console.error("Erro ao fazer upload da capa:", error);
          }
          if (arquivos.length > 0) {
            try {
              const resp = await api.uploadArquivosSessao(data.id, filesForm);
              console.log("Arquivos enviados:", resp);
              if (resp.status === 201) {
                fetchProjetos();
              }
            } catch (error) {
              console.error("Erro ao fazer upload dos arquivos:", error);
            }
          }
        }
      }
      console.log("Sessão salva com sucesso:");
      fetchProjetos();
      console.log("Sessão atualizada:");
      fecharModal();
    } catch {
      alert("Erro ao salvar sessão!");
    }
  }

  async function deletarSessao(projetoId, id) {
    if (window.confirm("Tem certeza que deseja deletar esta sessão?")) {
      try {
        const resp = await api.deletarSessao(projetoId, id);
        if (resp.status === 204) {
          console.log("Sessão deletada com sucesso:", id);
          // try {
          //   const resp = await api.deletarArquivosSessao(projetoId, id);
          // } catch (error) {
          //   console.error("Erro ao deletar arquivos da sessão:", error);
          // }
        }
        console.log("Sessão deletada:", id);
        setSessoes(sessoes.filter((s) => s.id !== id));
      } catch (error) {
        console.error("Erro ao deletar sessão:", error);
      }
    }
  }

  if (loading)
    return <div className="text-purple-200">Carregando sessões...</div>;

  return (
    <div>
      <div className="flex items-center gap-4 mb-6">
        <button
          className="text-purple-400 flex underline"
          onClick={() => setAba("projetos")}
        >
          <FaArrowLeft />
          <div className="pl-2 ">Voltar</div>
        </button>

        <button
          className="ml-auto flex items-center bg-purple-700 hover:bg-purple-800 text-white font-bold py-2 px-4 rounded-xl gap-2"
          onClick={() => abrirModal(null)}
        >
          <FaPlus /> Nova Sessão
        </button>
      </div>
      <h2 className="text-2xl font-bold">Sessões do Projeto</h2>
      <div className="grid md:grid-cols-3 gap-6">
        {sessoes.length === 0 && (
          <div className="text-purple-200">
            Nenhuma sessão cadastrada ainda.
          </div>
        )}
        {sessoes.map((sessao) => (
          <div
            key={sessao.id}
            className="bg-white/10 rounded-xl p-4 shadow flex flex-col gap-2 group"
          >
            <button
              onClick={() => {
                onSelectSessao(sessao);
                setAba("sessao");
              }}
            >
              <div className="w-full h-48 overflow-hidden rounded-md">
                <img
                  src={api.getUrlBase() + "/" + sessao.capa_url}
                  alt=""
                  //mudar a renderizacao da imagem object[25-75]
                  className="w-full h-full object-cover object-[50%_20%]"
                  onError={(e) => (e.target.style.display = "none")}
                />
              </div>
            </button>
            <div>
              <h3 className="text-lg font-bold text-purple-200">
                {sessao.titulo}
              </h3>
            </div>
            <div className="flex gap-2 mt-2">
              <button
                className="bg-purple-600 hover:bg-purple-700 p-2 rounded text-white"
                onClick={() => abrirModal(sessao)}
              >
                <FaEdit />
              </button>
              <button
                className="bg-red-700 hover:bg-red-800 p-2 rounded text-white"
                onClick={() => deletarSessao(projeto.id, sessao.id)}
              >
                <FaTrash />
              </button>
              <button
                className="ml-auto bg-green-800 text-white px-2 py-1 rounded hover:underline"
                onClick={() => {
                  onSelectSessao(sessao);
                  setAba("makingof");
                }}
              >
                Gerenciar Making Of
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Modal para criar/editar sessão */}
      {showModal && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-40">
          <form
            className="bg-[#22223a] rounded-2xl shadow-lg p-8 w-full max-w-md flex flex-col gap-4"
            onSubmit={salvarSessao}
            encType="multipart/form-data"
          >
            <h2 className="text-xl font-bold mb-2">
              {editSessao ? "Editar Sessão" : "Nova Sessão"}
            </h2>
            <label className="block font-bold text-white mb-1">
              Título da sessão:
            </label>
            <input
              className="p-2 rounded bg-white/10 text-white"
              placeholder="Título"
              value={titulo}
              onChange={(e) => setTitulo(e.target.value)}
              required
            />
            {/* <input
              className="p-2 rounded bg-white/10 text-white"
              placeholder="ID do Modelo (opcional)"
              value={modeloId}
              onChange={(e) => setModeloId(e.target.value)}
            /> */}
            {/* Input de imagem com preview */}
            <label className="block font-bold text-white mb-1">
              Capa da sessão:
            </label>
            {capaPreview && (
              <div className="mb-2">
                <img
                  src={capaPreview}
                  alt="Preview capa sessão"
                  className="h-28 rounded-lg border"
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
            <label className="block font-bold text-white mb-1">
              Arquivos (pode selecionar vários):
            </label>
            <input
              type="file"
              multiple
              accept="image/*,video/*"
              className="bg-white/10 text-white rounded p-2"
              onChange={handleArquivosChange}
              ref={arquivosInputRef}
            />

            {/* Previews dos arquivos */}
            {arquivosPreview.length > 0 && (
              <div className="flex gap-2 mt-2 overflow-x-auto">
                {arquivosPreview.map((url, idx) => (
                  <img
                    key={idx}
                    src={url}
                    alt={`Preview ${idx}`}
                    className="w-16 h-16 object-cover rounded"
                  />
                ))}
                <button
                  type="button"
                  className="text-red-400 ml-2 text-sm underline"
                  onClick={limparArquivos}
                >
                  Limpar arquivos
                </button>
              </div>
            )}
          </form>
        </div>
      )}
    </div>
  );
}
