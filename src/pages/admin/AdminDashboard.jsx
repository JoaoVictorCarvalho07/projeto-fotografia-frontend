import { useState } from "react";
import AdminProjetos from "../../components/admin/AdminProjetos";
import AdminSessoes from "../../components/admin/AdminSessoes";
import AdminStorytelling from "../../components/admin/AdminStorytelling";
import AdminMakingOf from "../../components/admin/AdminMakingOf";
import AdminEtapasStorytelling from "../../components/admin/AdminEtapasStorytelling";
import SessaoPageAdmin from "../../components/admin/SessaoPageAdmin";
import { useAuth } from "../../context/useAuth";

export default function AdminDashboard() {
  const { logout } = useAuth();
  const [aba, setAba] = useState("projetos"); // abas: projetos, sessoes, storytelling, etapas, makingof
  const [projetoSelecionado, setProjetoSelecionado] = useState(null);
  const [sessaoSelecionada, setSessaoSelecionada] = useState(null);
  const [storytellingSelecionado, setStorytellingSelecionado] = useState(null);

  return (
    <div className="min-h-screen bg-[#181824] text-white p-4">
      <div className="">
        <h1 className="text-3xl font-bold mb-6">Painel de Administração</h1>
        <button
          className="bg-red-500 hover:bg-red-600  text-white py-2 px-4 rounded m-2 mb-3 ml-0 "
          onClick={logout}
        >
          Deslogar
        </button>
      </div>

      {aba === "projetos" && (
        <AdminProjetos
          onSelectProjeto={setProjetoSelecionado}
          setAba={setAba}
        />
      )}

      {aba === "sessoes" && projetoSelecionado && (
        <AdminSessoes
          projeto={projetoSelecionado}
          onSelectSessao={setSessaoSelecionada}
          setAba={setAba}
        />
      )}

      {aba === "storytelling" && projetoSelecionado && (
        <AdminStorytelling
          projeto={projetoSelecionado}
          onSelectStorytelling={setStorytellingSelecionado}
          setAba={setAba}
        />
      )}

      {aba === "etapasStoryTelling" && (
        <AdminEtapasStorytelling
          projeto={projetoSelecionado}
          storytelling={storytellingSelecionado}
          setAba={setAba}
        />
      )}

      {aba === "makingof" && sessaoSelecionada && (
        <AdminMakingOf sessao={sessaoSelecionada} setAba={setAba} />
      )}

      {aba === "sessao" && sessaoSelecionada && (
        <SessaoPageAdmin
          selectedSessao={sessaoSelecionada}
          onSelectSessao={setSessaoSelecionada}
          setAba={setAba}
        />
      )}
    </div>
  );
}
