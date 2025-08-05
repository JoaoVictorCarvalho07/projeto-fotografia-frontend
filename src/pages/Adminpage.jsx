import { Tabs, Tab } from "../components/ui/Tabs";
import ProjetosAdmin from "../components/admin/ProjetosAdmin";
import SessoesAdmin from "../components/admin/SessoesAdmin";
import ModelosAdmin from "../components/admin/ModelosAdmin";
import CardsAdmin from "../components/admin/CardsAdmin";

export default function AdminPage() {
  return (
    <main className=" min-h-[calc(100vh-64px)]">
      <div className="p-4">
        <h1 className="w-full max-w-2xl mx-auto text-3xl font-bold mb-6 text-purple-700">
          Painel Admin
        </h1>
        <Tabs initial={0}>
          <Tab label="Projetos">
            <ProjetosAdmin />
          </Tab>
          <Tab label="Sessões">
            <SessoesAdmin />
          </Tab>

          <Tab label="Cards Portfólio">
            <CardsAdmin />
          </Tab>
        </Tabs>
      </div>
    </main>
  );
}
