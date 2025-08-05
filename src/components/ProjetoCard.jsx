import React from "react";
import { Link } from "react-router-dom";

function ProjetoCard({ projeto }) {
  return (
    <div className="bg-white dark:bg-gray-800 shadow-lg rounded overflow-hidden transition hover:scale-[1.02]">
      <img
        src={`http://localhost:3000/uploads/${projeto.capa}`}
        alt={projeto.titulo}
        className="w-full h-64 object-cover"
      />
      <div className="p-4">
        <h3 className="text-xl font-semibold text-primary">{projeto.titulo}</h3>
        <p className="text-gray-600 dark:text-gray-300 text-sm mt-2">
          {projeto.descricao.slice(0, 100)}...
        </p>
        <Link
          to={`/projetos/${projeto.id}`}
          className="inline-block mt-3 text-sm text-accent font-medium hover:underline"
        >
          Ver mais →
        </Link>
      </div>
    </div>
  );
}

export default ProjetoCard;
