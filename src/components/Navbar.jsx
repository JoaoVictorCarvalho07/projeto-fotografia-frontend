import { Link } from "react-router-dom";

export default function Navbar() {
  //   if (window.location.pathname.includes("/admin")) {
  //     return null; // Não renderiza a Navbar se estiver na rota /admin
  //   }
  return (
    <header className="bg-primary text-white shadow-md">
      <div className="container mx-auto flex justify-between items-center p-4">
        <Link to="/" className="text-2xl font-bold tracking-wide">
          Isabel Pontes
        </Link>

        <nav className="flex gap-6 text-sm md:text-base">
          <Link to="/" className="hover:text-accent transition-colors">
            Home
          </Link>
          <Link to="/projetos" className="hover:text-accent transition-colors">
            Projetos
          </Link>
          <Link to="/portfolio" className="hover:text-accent transition-colors">
            Portfólio
          </Link>
        </nav>
      </div>
    </header>
  );
}
