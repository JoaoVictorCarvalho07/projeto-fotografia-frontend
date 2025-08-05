import { createContext, useState, useCallback } from "react";
import api from "../services/api"; // ajuste o caminho conforme seu projeto
import { useEffect } from "react";

const StorytellingContext = createContext();

export function StorytellingProvider({ children }) {
  // Estrutura: { [projetoId]: storytelling }
  const [storytellingByProjeto, setStorytellingByProjeto] = useState({});
  const [loading, setLoading] = useState(false);

  // Armazena o ID do projeto atual
  const [projetoId, setProjetoId] = useState(null);

  // Carrega o storytelling do projeto se ainda não estiver no contexto
  const fetchStorytelling = useCallback(
    async (projetoId) => {
      if (!projetoId) return;
      if (storytellingByProjeto[projetoId]) return; // Já carregado
      setProjetoId(projetoId);

      setLoading(true);
      try {
        const res = await api.getStorytelling(projetoId); // Crie esse endpoint

        setStorytellingByProjeto((prev) => ({
          ...prev,
          [projetoId]: res.data,
        }));
      } catch (err) {
        console.error("Erro ao carregar storytelling:", err);
      } finally {
        setLoading(false);
      }
    },
    [storytellingByProjeto]
  );
  useEffect(() => {
    console.log("Storytelling atualizado:", storytellingByProjeto[projetoId]);
  }, [storytellingByProjeto, projetoId]);

  // Permite acessar direto via hook
  return (
    <StorytellingContext.Provider
      value={{
        storytellingByProjeto,
        fetchStorytelling,
        loading,
      }}
    >
      {children}
    </StorytellingContext.Provider>
  );
}

export default StorytellingContext;
