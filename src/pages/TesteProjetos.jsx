import AdminStorytelling from "../components/admin/AdminStorytelling";

export default function TesteProjetos() {
  return (
    <div className="min-h-screen bg-[#181824] text-white p-4">
      <AdminStorytelling
        projeto={{ id: 1, titulo: "Projeto 1" }}
        onSelectStorytelling={(story) =>
          alert(`Storytelling selecionado: ${story.titulo}`)
        }
        setAba={() => {}}
      />
    </div>
  );
}
