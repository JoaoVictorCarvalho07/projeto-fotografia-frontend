import { useState, useEffect } from "react";
import { FaPlus } from "react-icons/fa";
import api from "../../services/api";
import StorytellingEtapaCard from "../../components/StoryTellingEtapaCard";
import ModalEtapaStorytelling from "./ModalEtapaStorytelling";
import ModalGaleriaEtapa from "./ModalGaleriaEtapa";

export default function AdminStorytellingPage({ storytellingId }) {
  const [etapas, setEtapas] = useState([]);
  const [loading, setLoading] = useState(true);

  // Controle de modal etapa
  const [showEtapaModal, setShowEtapaModal] = useState(false);
  const [editEtapa, setEditEtapa] = useState(null);

  // Controle de modal galeria
  const [showGaleriaModal, setShowGaleriaModal] = useState(false);
  const [galeriaEtapa, setGaleriaEtapa] = useState(null);

  // Buscar etapas
  useEffect(() => {
    fetchEtapas();
    // eslint-disable-next-line
  }, [storytellingId]);

  async function fetchEtapas() {
    setLoading(true);
    const { data } = await api.get(`/storytelling/${storytellingId}/etapas`);
    setEtapas(data);
    setLoading(false);
  }

  // CRUD handlers
  function handleNovaEtapa() {
    setEditEtapa(null);
    setShowEtapaModal(true);
  }

  function handleEditarEtapa(etapa) {
    setEditEtapa(etapa);
    setShowEtapaModal(true);
  }

  function handleAbrirGaleria(etapa) {
    setGaleriaEtapa(etapa);
    setShowGaleriaModal(true);
  }

  // Quando salvar ou deletar, refaz o fetch
  function handleReloadEtapas() {
    fetchEtapas();
  }

  return (
    <div className="pb-24">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Storytelling — Etapas</h2>
        <button
          className="flex items-center bg-purple-700 hover:bg-purple-800 text-white font-bold py-2 px-4 rounded-xl gap-2"
          onClick={handleNovaEtapa}
        >
          <FaPlus /> Nova Etapa
        </button>
      </div>
      <div className="grid md:grid-cols-2 gap-6">
        {loading ? (
          <div className="text-purple-300">Carregando etapas...</div>
        ) : (
          etapas.map((etapa) => (
            <StorytellingEtapaCard
              key={etapa.id}
              etapa={etapa}
              onEdit={() => handleEditarEtapa(etapa)}
              onReload={handleReloadEtapas}
              onOpenGaleria={() => handleAbrirGaleria(etapa)}
            />
          ))
        )}
      </div>
      <ModalEtapaStorytelling
        open={showEtapaModal}
        onClose={() => setShowEtapaModal(false)}
        etapa={editEtapa}
        storytellingId={storytellingId}
        onReload={handleReloadEtapas}
      />
      <ModalGaleriaEtapa
        open={showGaleriaModal}
        onClose={() => setShowGaleriaModal(false)}
        etapa={galeriaEtapa}
      />
    </div>
  );
}
