import { Link } from "react-router-dom";
import "./Header.css";

const Header = () => {
  return (
    <header className="header-container">
      <div className="header-logo">
        <Link to="/">
          <img src="logo.png" alt="checkpoint logo" />
        </Link>
      </div>
      <nav className="header-nav">
        <ul className="header-list">
          <div className="header-search">
            <button className="header-search-btn">
              <i class="bx bx-search-alt btn-search-p"></i>
            </button>
            <input
              className="header-search-prod"
              type="text"
              placeholder="Minecraft, Pubg..."
            />
          </div>
          <li className="header-item">
            <Link to="/" className="header-item-link">
              Inicio
            </Link>
          </li>
          <li className="header-item">
            <Link to="/" className="header-item-link">
              Iniciar sesion
            </Link>
          </li>
          <li className="header-item">
            <Link to="/" className="header-item-link">
              Productos
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
