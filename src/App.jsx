import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthProvider";
import ProtectedRoute from "./components/ProtectedRoute";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Navbar from "./components/Navbar"; // sua barra de navegação
import Projetos from "./pages/Projetos";
import Sessoes from "./pages/Sessoes"; // sua página de sessões
import SessaoPage from "./pages/SessaoPage"; // página de sessão individual
import MakingOffPage from "./pages/MakingOffPage"; // página de making of
import Storytelling from "./pages/StoryTellingPage";
import { ProjetosProvider } from "./context/ProjetosProvider"; // contexto de projetos
import { StorytellingProvider } from "./context/StorytellingProvider";
import TesteProjetos from "./pages/TesteProjetos";
import AdminDashboard from "./pages/admin/AdminDashboard";
import { MakingOffProvider } from "./context/MakingOffProvider";

export default function App() {
  return (
    <AuthProvider>
      <ProjetosProvider>
        <MakingOffProvider>
          <StorytellingProvider>
            <Router>
              {/* Navbar sem link para /admin, se quiser */}

              <Navbar />
              <Routes>
                {/* públicas */}
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/projetos" element={<Projetos />} />
                <Route
                  path="/projetos/:projetoId/sessao/:sessaoId"
                  element={<SessaoPage />}
                />
                <Route
                  path="/projetos/:projetoId/sessao/:sessaoId/making-of"
                  element={<MakingOffPage />}
                />
                <Route
                  path="/projetos/:projetoId/sessoes"
                  element={<Sessoes />}
                />

                <Route
                  path="/projetos/:projetoId/storytelling"
                  element={<Storytelling />}
                />
                <Route path="/teste" element={<TesteProjetos />} />

                {/* protegidas */}
                <Route element={<ProtectedRoute />}>
                  {/* <Route
                    path="/admin/storytelling/:projetoId"
                    element={<AdminStorytellingPage />}
                  /> */}
                  <Route path="/admin/dashboard" element={<AdminDashboard />} />
                </Route>

                {/* opcional: rota 404 */}
                {/* <Route path="*" element={<NotFound />} /> */}
              </Routes>
            </Router>
          </StorytellingProvider>
        </MakingOffProvider>
      </ProjetosProvider>
    </AuthProvider>
  );
}
