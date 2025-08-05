import { createContext, useState, useEffect } from "react";
import api from "../services/api";
import { use } from "react";

const ProjetosContext = createContext();

export function ProjetosProvider({ children }) {
  const [projetos, setProjetos] = useState([]);
  const [loading, setLoading] = useState(true);

  // Exemplo de fetch inicial (adapte pro seu backend):

  async function fetchProjetos() {
    setLoading(true);
    try {
      const res = await api.getProjetos();
      console.log("Projetos recebidos:", res.data);
      setProjetos(res.data);
    } catch (e) {
      console.error("Erro ao buscar projetos:", e);
      setProjetos([]);
    } finally {
      setLoading(false);
    }
  }
  useEffect(() => {
    fetchProjetos();
  }, []);

  return (
    <ProjetosContext.Provider
      value={{ projetos, setProjetos, loading, fetchProjetos }}
    >
      {children}
    </ProjetosContext.Provider>
  );
}

export default ProjetosContext;
