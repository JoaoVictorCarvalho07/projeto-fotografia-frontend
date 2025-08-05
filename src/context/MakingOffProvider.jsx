import { createContext, useState, useCallback, useEffect } from "react";
import api from "../services/api";

const MakingOffContext = createContext();

// Provider
export function MakingOffProvider({ children }) {
  const [makingOff, setMakingOffs] = useState([]);
  const [loading, setLoading] = useState(false);

  // Carrega todos os making_off + galeria de uma sessão
  const fetchMakingOffByprojetos = useCallback(async (ProjetoId, SessaoId) => {
    setLoading(true);
    try {
      // Pega todos os making_off dessa sessão
      const makingOffs = await api.getMakingOff(ProjetoId, SessaoId);

      setMakingOffs(makingOffs.data);
      console.log("MakingOffs fetched:", makingOffs.data);
      return makingOffs.data;
    } catch (err) {
      setMakingOffs([]);
      return [];
    } finally {
      setLoading(false);
    }
  }, []);

  // Exemplo para adicionar um making_off:
  const addMakingOff = useCallback(
    async (ProjetoId, SessaoId) => {
      const { data } = await api.post(ProjetoId, SessaoId);
      await fetchMakingOffByprojetos(ProjetoId, SessaoId); // refetch para atualizar lista
      return data;
    },
    [fetchMakingOffByprojetos]
  );

  // Exemplo para remover:
  const deleteMakingOff = useCallback(
    async (ProjetoId, SessaoId) => {
      await api.deleteMakingOff(ProjetoId, SessaoId);
      await fetchMakingOffByprojetos(ProjetoId, SessaoId);
    },
    [fetchMakingOffByprojetos]
  );

  // Exemplo para manipular galeria de um making_of
  // (adicionar, remover etc, só adaptar o endpoint)

  return (
    <MakingOffContext.Provider
      value={{
        makingOff,
        loading,
        fetchMakingOffByprojetos,
        // ... outras funções conforme for usando
      }}
    >
      {children}
    </MakingOffContext.Provider>
  );
}

export default MakingOffContext;
