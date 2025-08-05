import { useParams } from "react-router-dom";

const projetosMock = [
  {
    id: 1,
    titulo: "Afrodite",
    descricao: `Ensaio inspirado na deusa da beleza e sensualidade. Exploramos tons suaves,
    tecidos fluidos e simbolismo mitológico para criar retratos que conectam o feminino com o sagrado.`,
    capa: "/assets/afrodite/afrodite.jpg",
    imagens: [
      "/assets/afrodite/afrodite.png",
      "/assets/afrodite/afrodite2.jpg",
      "/assets/afrodite/afrodite3.jpg",
    ],
  },
  {
    id: 2,
    titulo: "Roda das Deusas",
    descricao: `Retratos espontâneos e sagrados capturados durante um encontro espiritual feminino.`,
    capa: "/assets/roda/roda.jpg",
    imagens: ["/assets/roda/roda1.jpg", "/assets/roda/roda2.jpg"],
  },
  {
    id: 3,
    titulo: "Noiva Cadáver",
    descricao: `Estética gótica e colaborativa, maquiagem artística e direção de arte dramática.`,
    capa: "/assets/noiva/noiva.jpg",
    imagens: ["/assets/noiva/noiva1.jpg", "/assets/noiva/noiva2.jpg"],
  },
];

function ProjetoDetalhe() {
  const { id } = useParams();
  const projeto = projetosMock.find((p) => p.id === parseInt(id));

  if (!projeto) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center">
        <h2 className="text-2xl font-semibold text-red-500">
          Projeto não encontrado.
        </h2>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold text-primary mb-4">{projeto.titulo}</h1>
      <p className="text-lg text-gray-700 dark:text-gray-300 mb-8 whitespace-pre-line">
        {projeto.descricao}
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {projeto.imagens.map((img, index) => (
          <img
            key={index}
            src={img}
            alt={`Imagem ${index + 1}`}
            className="w-full rounded-lg shadow hover:scale-105 transition duration-300"
          />
        ))}
      </div>
    </div>
  );
}

export default ProjetoDetalhe;
