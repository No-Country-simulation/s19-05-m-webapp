import { Link } from "react-router-dom";
import "./Header.css";
import { useState } from "react";
import useModal from "../../hooks/useModal";
import Modal from "../modal/Modal";
import Cart from "../Cart/Cart";

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const { isModalOpen, openModal, closeModal } = useModal();

  return (
    <header className="header-container page-container">
      <div className="header-logo">
        <Link to="/">
          <img src="logo.png" alt="checkpoint logo" />
        </Link>
      </div>
      <div
        className="menu"
        onClick={() => {
          setMenuOpen(!menuOpen);
        }}
      >
        <span></span>
        <span></span>
        <span></span>
      </div>
      <nav className="header-nav">
        <ul className={menuOpen ? "open" : ""}>
          <div className="header-search">
            <button className="header-search-btn">
              <i className="bx bx-search-alt btn-search-p"></i>
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
            <Link to="/products" className="header-item-link">
              Productos
            </Link>
          </li>
          <li className="header-item">
            <Link to="/" className="header-cart">
              <i className="bx bxs-cart btn-cart" onClick={openModal}></i>
              <Modal isOpen={isModalOpen} onClose={closeModal}>
                <Cart />
              </Modal>
            </Link>
          </li>
          <li className="header-item">
            <Link to="/" className="header-item-link">
              Iniciar sesion
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
