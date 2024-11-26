import { Link } from "react-router-dom";
import "./footer.css";

const Footer = () => {
  return (
    <section className="footer page-container">
      <article className="logo-footer">
        <Link to="/">
          <img src="logo.png" alt="checkpoint logo" />
        </Link>
        <p>Todos los derechos reservados</p>
      </article>
      <article className="links-footer">
        <ul>
          <li>
            <Link>Sobre Nosotros</Link>
          </li>
          <li>
            <Link>Politicas de privacidad</Link>
          </li>
          <li>
            <Link>Terminos y condiciones</Link>
          </li>
        </ul>
      </article>
      <article className="redes-footer">
        <h2>Redes Sociales</h2>
        <nav className="redes-link">
          <a href="https://www.facebook.com" target="_blank" rel="noopener">
            <img className="social-icon" src="/fb.svg" alt="facebook" />
          </a>
          <a href="https://www.instagram.com" target="_blank" rel="noopener">
            <img className="social-icon" src="/instagram.svg" alt="instagram" />
          </a>
          <a href="https://www.discord.com" target="_blank" rel="noopener">
            <img className="social-icon" src="/discord.svg" alt="discord" />
          </a>
        </nav>
      </article>
    </section>
  );
};

export default Footer;
