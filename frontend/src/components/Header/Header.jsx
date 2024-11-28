import { Link } from "react-router-dom";
import "./Header.css";
import { useState, useEffect } from "react";
import useModal from "../../hooks/useModal";
import useLogin from "../../hooks/useLogin";
import Modal from "../modal/Modal";
import Cart from "../Cart/Cart";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../store/slices/auth.slices";
import GoogleAuth from "../GoogleAuth/GoogleAuth"

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const { isModalOpen, openModal, closeModal } = useModal();
  const { isLoginOpen, openLogin, closeLogin } = useLogin();

  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);

    function handleSignOut(event) {
        dispatch(logout());
        google.accounts.id.disableAutoSelect();
    }

    useEffect(() => {
      if (user) {
          document.getElementById("iniciar-sesion-header").style.display = "none";
      } else {
          document.getElementById("iniciar-sesion-header").style.display = "block";
      }
  }, [user]);
  
  return (
    <header className="header-container page-container">
      <div className="header-logo">
        <Link to="/">
          <img src="logo.png" alt="checkpoint logo" />
        </Link>
      </div>
      <div className="header-cart">
        <Link to="/">
          <i className="bx bxs-cart btn-cart" onClick={openModal}></i>
          <Modal isOpen={isModalOpen} onClose={closeModal}>
            <Cart />
          </Modal>
        </Link>
      </div>
      <div
        className="menu"
        onClick={() => {
          setMenuOpen(!menuOpen);
        }}
      >
        <i className="bx bx-user-circle bx-user"></i>
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
          {/* <li className="header-item">
            <Link to="/" className="header-cart d-none">
              <i className="bx bxs-cart btn-cart" onClick={openModal}></i>
              <Modal isOpen={isModalOpen} onClose={closeModal}>
                <Cart />
              </Modal>
            </Link>
          </li> */}
          <li className="header-item" id="iniciar-sesion-header">
            <Link to="/" className="header-item-link" onClick={openLogin}>
              Iniciar sesión</Link>
              <GoogleAuth isOpen={isLoginOpen} onClose={closeLogin} />
            
          </li>
            {user && (
                    <li className="header-item" onClick={handleSignOut}>
                      <Link to="/" className="header-item-link">Desconectarse</Link>
                    </li>
                 )}
        </ul>
      </nav>
    </header>
  );
};

export default Header;