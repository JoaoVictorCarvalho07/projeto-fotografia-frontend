import { useState } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Input } from "./ui/input";
import { Button } from "./ui/Button";

export default function ProjetoModal({ projeto, onClose }) {
  const [form, setForm] = useState(
    projeto || { titulo: "", descricao: "", em_andamento: true, capa_url: "" }
  );
  // ... handleSubmit, handleUpdate, handleDelete

  return (
    <Dialog open onOpenChange={onClose}>
      <DialogContent className="max-w-lg">
        <h2 className="text-xl font-bold mb-2">
          {projeto ? "Editar Projeto" : "Novo Projeto"}
        </h2>
        <Input
          placeholder="Título"
          value={form.titulo}
          onChange={(e) => setForm((f) => ({ ...f, titulo: e.target.value }))}
        />
        <textarea
          className="border rounded-xl p-2 w-full"
          placeholder="Descrição"
          value={form.descricao}
          onChange={(e) =>
            setForm((f) => ({ ...f, descricao: e.target.value }))
          }
        />
        {/* Upload de capa (exemplo simples) */}
        <label className="mt-2">Capa do Projeto:</label>
        <input type="file" />
        {/* Em andamento */}
        <div className="flex items-center gap-2 mt-2">
          <input
            type="checkbox"
            checked={form.em_andamento}
            onChange={() =>
              setForm((f) => ({ ...f, em_andamento: !f.em_andamento }))
            }
          />
          <span>Em andamento</span>
        </div>
        <div className="flex gap-2 justify-end mt-6">
          <Button variant="outline" onClick={onClose}>
            Cancelar
          </Button>
          <Button>{projeto ? "Salvar" : "Criar"}</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
