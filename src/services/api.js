// src/services/api.js
import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:3000",
});

API.baseURL = "http://localhost:3000"; // URL base do backend

API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export default {
  // Projetos
  getProjetos: () => API.get("/projetos"),
  getProjeto: (projetoId) => API.get(`/projetos/${projetoId}`),
  criarProjeto: (data) => API.post("/projetos", data),
  atualizarProjeto: (projetoId, data) =>
    API.put(`/projetos/${projetoId}`, data),
  deletarProjeto: (projetoId) => API.delete(`/projetos/${projetoId}`),
  uploadCapaProjeto: (projetoId, file) =>
    API.put(`/projetos/${projetoId}/capa`, file),

  // Sessoes
  criarSessao: (projetoId, data) =>
    API.post(`/projetos/${projetoId}/sessoes`, data),
  editarSessao: (projetoId, sessaoId, data) =>
    API.put(`/projetos/${projetoId}/sessoes/${sessaoId}`, data),
  deletarSessao: (projetoId, sessaoId) =>
    API.delete(`/projetos/${projetoId}/sessoes/${sessaoId}`),
  uploadCapaSessao: (projetoId, sessaoId, file) =>
    API.put(`/projetos/${projetoId}/sessoes/${sessaoId}/capa`, file),
  uploadArquivosSessao: (projetoId, sessaoId, files) =>
    API.post(`/projetos/${projetoId}/sessoes/${sessaoId}/arquivos`, files),
  deletarPastaSessao: (projetoId, sessaoId) =>
    API.delete(`/projetos/${projetoId}/sessoes/${sessaoId}/pasta`),
  deletarArquivoSessao: (projetoId, sessaoId, arquivoId) =>
    API.delete(
      `/projetos/${projetoId}/sessoes/${sessaoId}/arquivos/${arquivoId}`
    ),

  // MakingOff
  getMakingOff: (projetoId, sessaoId) =>
    API.get(`/projetos/${projetoId}/sessoes/${sessaoId}/makingoff`),
  criarMakingOff: (projetoId, sessaoId, data) =>
    API.post(`/projetos/${projetoId}/sessoes/${sessaoId}/makingoff`, data),
  atualizarMakingOff: (projetoId, sessaoId, data) =>
    API.put(`/projetos/${projetoId}/sessoes/${sessaoId}/makingoff`, data),
  deletarMakingOff: (projetoId, sessaoId) =>
    API.delete(`/projetos/${projetoId}/sessoes/${sessaoId}/makingoff`),

  // Etapas do MakingOff
  getEtapasMakingOff: (projetoId, sessaoId) =>
    API.get(`/projetos/${projetoId}/sessoes/${sessaoId}/makingoff/etapas`),
  criarEtapaMakingOff: (projetoId, sessaoId, data) =>
    API.post(
      `/projetos/${projetoId}/sessoes/${sessaoId}/makingoff/etapas`,
      data
    ),
  atualizarEtapaMakingOff: (projetoId, sessaoId, etapaId, data) =>
    API.put(
      `/projetos/${projetoId}/sessoes/${sessaoId}/makingoff/etapas/${etapaId}`,
      data
    ),
  deletarEtapaMakingOff: (projetoId, sessaoId, etapaId) =>
    API.delete(
      `/projetos/${projetoId}/sessoes/${sessaoId}/makingoff/etapas/${etapaId}`
    ),
  uploadMidiaEtapaMakingOff: (projetoId, sessaoId, etapaId, file) =>
    API.post(
      `/projetos/${projetoId}/sessoes/${sessaoId}/makingoff/etapas/${etapaId}/upload`,
      file
    ),

  // Storytelling
  getStorytelling: (projetoId) =>
    API.get(`/projetos/${projetoId}/storytelling`),
  criarStorytelling: (projetoId, data) =>
    API.post(`/projetos/${projetoId}/storytelling`, data),
  atualizarStorytelling: (projetoId, data) =>
    API.put(`/projetos/${projetoId}/storytelling`, data),
  deletarStorytelling: (projetoId) =>
    API.delete(`/projetos/${projetoId}/storytelling`),

  // Etapas do Storytelling
  getEtapasStorytelling: (projetoId) =>
    API.get(`/projetos/${projetoId}/storytelling/etapas`),
  criarEtapaStorytelling: (projetoId, data) =>
    API.post(`/projetos/${projetoId}/storytelling/etapas`, data),
  atualizarEtapaStorytelling: (projetoId, etapaId, data) =>
    API.put(`/projetos/${projetoId}/storytelling/etapas/${etapaId}`, data),
  deletarEtapaStorytelling: (projetoId, etapaId) =>
    API.delete(`/projetos/${projetoId}/storytelling/etapas/${etapaId}`),
  uploadMidiaEtapaStorytelling: (projetoId, etapaId, file) =>
    API.post(
      `/projetos/${projetoId}/storytelling/etapas/${etapaId}/upload`,
      file
    ),

  // Autenticação
  login: (data) => API.post("/auth/login", data),
  getUrlBase: () => API.baseURL,
};
