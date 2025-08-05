import { useContext, useState } from "react";
import useProjetos from "../../hooks/useProjetos";
import ProjetoModal from "../../components/ProjetoModal";
import SessaoPage from "../SessaoPage";
import { Card, CardContent } from "../../components/ui/Card";
import { Button } from "../../components/ui/Button";

export default function AdminProjetos() {
  const { projetos, loading } = useProjetos();
  const [showModal, setShowModal] = useState(false);
  const [projetoSelecionado, setProjetoSelecionado] = useState(null);

  if (loading) return <div className="p-8 text-center">Carregando...</div>;

  return (
    <div className="container mx-auto py-8">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold">Projetos</h1>
        <Button
          onClick={() => {
            setProjetoSelecionado(null);
            setShowModal(true);
          }}
        >
          + Novo Projeto
        </Button>
      </div>
      <div className="grid gap-6 grid-cols-1 md:grid-cols-2 xl:grid-cols-3">
        {projetos?.map((projeto) => (
          <Card key={projeto.id} className="group shadow-lg">
            <img
              src={projeto.capa_url}
              className="h-48 w-full object-cover rounded-t-2xl"
            />
            <CardContent>
              <div className="flex flex-col gap-2">
                <h2 className="text-xl font-semibold">{projeto.titulo}</h2>
                <p className="text-gray-500 text-sm">{projeto.descricao}</p>
                <div className="flex items-center justify-between">
                  <span
                    className={
                      projeto.em_andamento ? "text-green-600" : "text-gray-400"
                    }
                  >
                    {projeto.em_andamento ? "Ativo" : "Finalizado"}
                  </span>
                  <span className="text-xs text-gray-400">
                    {new Date(projeto.criado_em).toLocaleDateString()}
                  </span>
                </div>
                <div className="flex gap-2 mt-2">
                  <Button
                    onClick={() => {
                      setProjetoSelecionado(projeto);
                      setShowModal(true);
                    }}
                  >
                    Editar
                  </Button>
                  <Button
                    variant="secondary"
                    onClick={() =>
                      setProjetoSelecionado({ ...projeto, page: "sessoes" })
                    }
                  >
                    Sessões
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() =>
                      setProjetoSelecionado({ ...projeto, page: "story" })
                    }
                  >
                    Storytelling
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      {/* MODAL DE EDIÇÃO/CRIAR PROJETO */}
      {showModal && (
        <ProjetoModal
          projeto={projetoSelecionado}
          onClose={() => setShowModal(false)}
        />
      )}

      {/* SESSÕES */}
      {projetoSelecionado?.page === "sessoes" && (
        <SessaoPage
          projeto={projetoSelecionado}
          onClose={() => setProjetoSelecionado(null)}
        />
      )}

      {/* STORYTELLING */}
      {projetoSelecionado?.page === "story" && (
        <StorytellingModal
          projeto={projetoSelecionado}
          onClose={() => setProjetoSelecionado(null)}
        />
      )}
    </div>
  );
}
