export default function CardSessao({ sessao, onClick }) {
  const fotos = sessao.fotos || [];
  // Usa capa explícita se existir, senão a primeira foto, senão placeholder
  const URL_BASE = import.meta.env.VITE_API_BASE || "http://localhost:3000";
  const capa = URL_BASE + "/"+(sessao.capa_url || fotos[0] || "/default.jpg");

  return (
    <div
      onClick={onClick}
      className="rounded-2xl shadow bg-white p-3 flex flex-col gap-2 cursor-pointer transition active:scale-[0.98] select-none mx-auto w-full max-w-xs hover:shadow-lg group hover:shadow-purple-300 transition-shadow duration-300"
    >
      <div className="transition-transform duration-300 group-hover:scale-105">
        <div className="relative w-full aspect-square overflow-hidden rounded-xl border-2 border-purple-100 ">
          <img
            src={capa}
            alt={sessao.titulo}
            className="w-full h-full object-cover object-[50%_20%]"
            loading="lazy"
          />
          {/* Badge de quantidade de fotos no canto */}
          <span className="absolute top-2 right-2 bg-purple-700 text-white text-xs px-2 py-0.5 rounded-full shadow">
            {fotos.length} foto{fotos.length !== 1 && "s"}
          </span>
        </div>
        {/* Título */}
        <div className="flex flex-col items-center mt-2 gap-2 px-1">
          <p className="text-primary text-xs">clique para ver mais</p>
          <span className="font-semibold text-purple-900 text-xl ">
            {sessao.titulo}
          </span>
        </div>
      </div>
      {/* Imagem de capa quadrada */}
    </div>
  );
}
