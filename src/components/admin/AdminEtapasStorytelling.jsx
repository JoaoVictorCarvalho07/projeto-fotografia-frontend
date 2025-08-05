import { useEffect, useState } from "react";
import { FaEdit, FaTrash, FaPlus, FaImages, FaArrowLeft } from "react-icons/fa";
import api from "../../services/api";
import { useStoryTelling } from "../../hooks/useStorytelling";

export default function AdminEtapasStorytelling({ setAba, projeto }) {
  const [showModal, setShowModal] = useState(false);
  const [editEtapa, setEditEtapa] = useState(null);
  const [etapas, setEtapas] = useState([]); // Lista de etapas do storytelling

  // Campos do formulário
  const { storytellingByProjeto, fetchStorytelling } = useStoryTelling();
  const [titulo, setTitulo] = useState("");
  const [mediaType, setMediaType] = useState("image");
  const [mediaSrc, setMediaSrc] = useState("");
  const [texto, setTexto] = useState("");
  const [comentarioAdmin, setComentarioAdmin] = useState("");

  const [storytellingSelecionado, setStorytellingSelecionado] = useState();

  useEffect(() => {
    if (!storytellingSelecionado) {
      fetchStorytelling(projeto.id);
    }
    console.log("Storytelling selecionado:", storytellingByProjeto[projeto.id]);
    setStorytellingSelecionado(storytellingByProjeto[projeto.id]);
    setEtapas(storytellingByProjeto[projeto.id]?.etapas || []);
    console.log(
      "Etapas do storytelling selecionado:",
      storytellingByProjeto[projeto.id]?.etapas
    );
  }, [fetchStorytelling, storytellingByProjeto]);

  function abrirModal(etapa = null) {
    setEditEtapa(etapa);
    setTitulo(etapa?.titulo || "");
    setMediaType(etapa?.media_type || "image");
    setMediaSrc(etapa?.media_src || "");
    setTexto(etapa?.texto || "");
    setComentarioAdmin(etapa?.comentario_admin || "");
    setShowModal(true);
  }

  function fecharModal() {
    setShowModal(false);
    setEditEtapa(null);
    setTitulo("");
    setMediaType("image");
    setMediaSrc("");
    setTexto("");
    setComentarioAdmin("");
    setOrdemDaEtapaNoStorytelling(1);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const data = new FormData();
    data.append("titulo", titulo);
    data.append("media_type", mediaType);
    data.append("texto", texto);
    data.append("comentario_admin", comentarioAdmin);

    const fileData = new FormData();
    console.log(titulo, mediaType, texto, comentarioAdmin);

    if (mediaSrc) {
      fileData.append("media", mediaSrc);
    }
    if (editEtapa) {
      const response = await api.atualizarEtapaStorytelling(
        projeto.id,
        editEtapa.id,
        data
      );
      console.log("Etapa atualizada:", response);
      if (response && mediaSrc) {
        try {
          await api.updateFileEtapa(projeto.id, editEtapa.id, fileData);
        } catch (error) {
          console.error("Erro ao atualizar etapa:", error);
        }
      }
    } else {
      const response = await api.criarEtapaStorytelling(
        storytellingSelecionado.id,
        data
      );
      try {
        await api.updateFileEtapa(projeto.id, response.id, fileData);
      } catch (error) {
        console.error("Erro ao atualizar etapa:", error);
      }
    }
    fetchStorytelling(); // Recarrega as etapas
    fecharModal();
  }

  async function deletarEtapa(projetoId, id) {
    if (window.confirm("Tem certeza que deseja deletar esta etapa?")) {
      const res = await api.deletarEtapaStorytelling(projetoId, id);
      if (res.status === 200) {
        console.log("Etapa deletada com sucesso:", res.data.id);
        fetchStorytelling(); // Recarrega as etapas
      }
    }
  }

  if (!storytellingSelecionado) {
    return <div>Carregando storytelling...</div>;
  }

  return (
    <div>
      <button>
        <div className="flex items-center gap-2 mb-4">
          <FaArrowLeft
            className="text-purple-300 hover:text-purple-200"
            onClick={() => setAba("storytelling")}
          />
          Voltar
        </div>
      </button>
      <div className="flex justify-between items-center mb-4">
        <div>
          <h2 className="text-xl font-bold">Etapas do Storytelling</h2>

          <button
            className="flex items-center bg-purple-700 hover:bg-purple-800 text-white font-bold py-2 px-4 rounded-xl gap-2"
            onClick={() => abrirModal(null)}
          >
            <FaPlus /> Nova Etapa
          </button>
        </div>
      </div>
      <div className="flex flex-col gap-4">
        {(etapas || []).map((etapa, idx) => (
          <div
            key={etapa.id}
            className="bg-white/10 rounded-xl p-4 flex flex-col md:flex-row gap-4"
          >
            <div className="w-full md:w-1/4 flex-shrink-0">
              {etapa.media_type === "video" ? (
                <video
                  src={etapa.media_src}
                  controls
                  className="rounded-lg w-full"
                />
              ) : (
                <img
                  src={etapa.media_src}
                  alt=""
                  className="rounded-lg w-full"
                />
              )}
            </div>
            <div className="flex-1">
              <h3 className="font-bold text-lg text-purple-200 mb-1">
                {idx + 1}. {etapa.titulo}
              </h3>
              <p className="text-purple-100 text-sm mb-2">{etapa.texto}</p>
              <div className="flex gap-2 flex-wrap mt-1"></div>
              {etapa.comentario_admin && (
                <div className="mt-2 pl-2 border-l-4 border-purple-600 text-xs italic text-purple-300">
                  {etapa.comentario_admin}
                </div>
              )}
              <div className="flex gap-2 mt-2">
                <button
                  className="bg-purple-600 hover:bg-purple-700 p-2 rounded text-white"
                  onClick={() => abrirModal(etapa)}
                >
                  <FaEdit />
                </button>
                <button
                  className="bg-red-700 hover:bg-red-800 p-2 rounded text-white"
                  onClick={() => deletarEtapa(projeto.id, etapa.id)}
                >
                  <FaTrash />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Modal para criar/editar etapa */}
      {showModal && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-40 overflow-y-auto">
          <form
            className="bg-[#22223a] rounded-2xl shadow-lg p-8 w-full max-w-md flex flex-col gap-4"
            onSubmit={handleSubmit}
          >
            <h2 className="text-xl font-bold mt-4">
              {editEtapa ? "Editar Etapa" : "Nova Etapa"}
            </h2>
            <label htmlFor="titulo">Título:</label>
            <input
              className="p-2 rounded bg-white/10 text-white"
              name="titulo"
              placeholder="Título"
              value={titulo}
              onChange={(e) => setTitulo(e.target.value)}
              required
            />
            <label htmlFor="texto">Texto:</label>
            <textarea
              name="texto"
              className="p-2 rounded bg-white/10 text-white"
              placeholder="Texto da Etapa"
              value={texto}
              onChange={(e) => setTexto(e.target.value)}
              rows={3}
            />
            <label>Arquivo:</label>

            <label
              htmlFor="mediaUpload"
              className="p-2 rounded bg-white/10 text-white"
            >
              <div className="flex items-center gap-2">
                clique para fazer o upload do arquivo
                <FaImages />
              </div>
            </label>

            <input
              id="mediaUpload"
              name="mediaUpload"
              type="file"
              className="hidden"
              placeholder={
                "faça o upload do arquivo desta etapa do storytelling"
              }
              accept="image/*,video/*"
              onChange={(e) => {
                const file = e.target.files[0];
                if (file) {
                  const reader = new FileReader();
                  setMediaType(
                    file.type.startsWith("video") ? "video" : "image"
                  );
                  reader.onloadend = () => {
                    setMediaSrc(reader.result);
                  };
                  reader.readAsDataURL(file);
                }
              }}
            />

            {mediaSrc && (
              <div className="mt-2">
                <p className="text-purple-300 mb-2">Arquivo carregado:</p>
                {mediaType === "video" ? (
                  <video
                    src={mediaSrc}
                    controls
                    className="w-full rounded-lg"
                  />
                ) : (
                  <img
                    src={mediaSrc}
                    alt="Preview"
                    className="w-full rounded-lg"
                  />
                )}
              </div>
            )}

            <label> Comentarios pos arquivo</label>
            <textarea
              className="p-2 rounded bg-white/10 text-white"
              placeholder="Comentário/Admin (opcional)"
              value={comentarioAdmin}
              onChange={(e) => setComentarioAdmin(e.target.value)}
              rows={4}
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
