// src/pages/Home.jsx
import { FaInstagram, FaWhatsapp, FaTiktok } from "react-icons/fa";

import { useEffect } from "react";

export default function Home() {
  useEffect(() => {
    // Smooth scroll para links internos
    const handleAnchorClick = (e) => {
      const hash = e.currentTarget.getAttribute("href");
      if (hash.startsWith("#")) {
        e.preventDefault();
        document.querySelector(hash)?.scrollIntoView({ behavior: "smooth" });
      }
    };
    document
      .querySelectorAll('a[href^="#"]')
      .forEach((anchor) => anchor.addEventListener("click", handleAnchorClick));

    // Função de animação ao rolar
    const animateOnScroll = () => {
      document.querySelectorAll(".animated").forEach((el) => {
        const top = el.getBoundingClientRect().top;
        if (top < window.innerHeight - 100) {
          el.classList.add("fadeIn");
        }
      });
    };

    window.addEventListener("scroll", animateOnScroll);
    window.addEventListener("load", animateOnScroll);

    // dispara uma vez ao montar
    animateOnScroll();

    return () => {
      // cleanup dos listeners de scroll/load
      window.removeEventListener("scroll", animateOnScroll);
      window.removeEventListener("load", animateOnScroll);
      // (não é estritamente necessário remover os anchors aqui, já que a página não desmonta)
    };
  }, []);

  return (
    <div className="container">
      <div className="card">
        <div className="hero">
          <img
            src="/images/imagemHomePage/CavCopas.jpg"
            alt="Close-up de uma fotógrafa trabalhando em cena artística com iluminação dramática e tons profundos"
          />
          <div className="hero-overlay animated text-text">
            <h1 className="">Isabel Pontes</h1>
            <p>Fotografia Artística</p>
          </div>
        </div>

        <div className="content">
          <section className="intro animated delay-1">
            <h2>Transformando pessoas em obras de arte</h2>
            <p>
              Olá! Eu sou Isabel Pontes, fotógrafa de ensaios artísticos,
              storymaker e criadora de conteúdo. Além de transformar pessoas em
              obras de arte, também atuo produzindo conteúdos criativos, UGC
              Creator e storymaker!
            </p>
          </section>

          <section className="services animated delay-2 flex gap-4">
            <div className="services-grid">
              <div>
                <h2>Meus Serviços</h2>
              </div>
              <div className="service-card">
                <h3>Fotografia Artística</h3>
                <p>
                  Ensaios fotográficos que exploram o corpo humano como
                  expressão artística, criando narrativas visuais únicas.
                </p>
              </div>
              <div className="service-card">
                <h3>Fotografia Fine Art</h3>
                <p>
                  Produções cuidadosamente planejadas que combinam técnica
                  fotográfica com conceitos artísticos refinados.
                </p>
              </div>
              <div className="service-card">
                <h3>Ensaios Personalizados</h3>
                <p>
                  Experiências únicas criadas para capturar sua essência, desde
                  o conceito até a produção final.
                </p>
              </div>
              <div className="service-card">
                <h3>Storymaker</h3>
                <p>
                  Captação de vídeos curtos e narrativos para redes sociais,
                  contando histórias visuais impactantes.
                </p>
              </div>
              <div className="service-card">
                <h3>Criação de Conteúdo</h3>
                <p>
                  Planejamento, produção e edição audiovisual para marcas que
                  buscam identidade visual única.
                </p>
              </div>
              <div className="service-card">
                <h3>UGC Creator</h3>
                <p>
                  Colaborações com marcas para criação de conteúdo autêntico e
                  divulgação estratégica.
                </p>
              </div>
            </div>
          </section>

          <section className="contact animated delay-2 text-secondary">
            <p>
              Entre em contato para agendar seu ensaio ou alinhar possíveis
              colaborações
            </p>

            {/* <div className="contact-links">
              
            </div> */}

            <div className="social-links">
              <a
                href="https://wa.me/5541991977011"
                className="bg-green-500 rounded-full p-3 shadow-md text-white hover:scale-110 transition"
              >
                <FaWhatsapp size={24} bg="green" />
              </a>
              <a
                href="https://www.instagram.com/isabelpontesfotografia"
                className="bg-gradient-to-br from-purple-400 to-pink-500 rounded-full p-3 shadow-md text-white hover:scale-110 transition"
              >
                <FaInstagram size={24} />
              </a>
              <a
                href="https://www.tiktok.com/@isabelpontesfoto"
                className="bg-black rounded-full p-3 shadow-md text-white hover:scale-110 transition"
              >
                <FaTiktok size={24} />
              </a>
            </div>
          </section>
          <section className="contact animated delay-2 text-secondary p-0">
            <a
              className=" hover:underline w-full h-full"
              href="https://www.isabelpontesportfólio.com.br"
              target="_blank"
              rel="noopener noreferrer"
            >
              midia kit
            </a>
          </section>

          <footer className="animated delay-3 text-center py-6">
            <p>
              © 2025 Isabel Pontes Fotografia. Todos os direitos reservados.
            </p>
          </footer>
        </div>
      </div>
    </div>
  );
}
