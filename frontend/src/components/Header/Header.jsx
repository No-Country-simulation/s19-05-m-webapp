import { Link, useNavigate } from "react-router-dom";
import "./Header.css";
import { useState, useEffect, useRef } from "react";
import useModal from "../../hooks/useModal";
import useLogin from "../../hooks/useLogin";
import Modal from "../modal/Modal";
import Cart from "../Cart/Cart";
import { useCart } from "../../contexts/CartContext/CartContext";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../store/slices/auth.slices";
import GoogleAuth from "../GoogleAuth/GoogleAuth";

const Header = () => {
  const [inputSearch, setInputSearch] = useState();
  const [menuOpen, setMenuOpen] = useState(false);
  const { isModalOpen, openModal, closeModal } = useModal();
  const { totalQuantity } = useCart();
  const { isLoginOpen, openLogin, closeLogin } = useLogin();

  const handleLinkClick = () => {
    setMenuOpen(false);
  };

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);

  function handleSignOut(event) {
    dispatch(logout());
    google.accounts.id.disableAutoSelect();
  }

  /* *********Search**************** */

  const inputValue = useRef();

  const handleSearch = (e) => {
    if (e.type === "click" || e.key === "Enter") {
      const searchTerm = inputValue.current.value;
      if (searchTerm.trim()) {
        navigate(`/products?search=${searchTerm.trim()}`);
        inputValue.current.value = "";
      }
    }
  };

  /* ************************* */
  useEffect(() => {
    if (user) {
      document.getElementById("iniciar-sesion-header").style.display = "none";
    } else {
      document.getElementById("iniciar-sesion-header").style.display = "block";
    }
  }, [user]);

  return (
    <header className="header-container">
      <div className="header-logo">
        <Link to="/">
          <img src="/logo.png" alt="checkpoint logo" />
        </Link>
      </div>
      <div className="header-cart">
        <i className="bx bxs-cart btn-cart" onClick={openModal}></i>
        {totalQuantity > 0 && (
          <span className="cart-count">{totalQuantity}</span>
        )}
        <Modal
          isOpen={isModalOpen}
          onClose={closeModal}
          title="Carrito de compras"
        >
          <Cart onClose={closeModal} />
        </Modal>
      </div>
      <div
        className="menu"
        onClick={() => {
          setMenuOpen(!menuOpen);
        }}
      >
        {menuOpen ? (
          <i className="bx bx-x-circle bx-close"></i>
        ) : (
          <i className="bx bx-user-circle bx-user"></i>
        )}
      </div>
      <nav className={`header-nav ${menuOpen ? "open" : ""}`}>
        <ul className={menuOpen ? "open" : ""}>
          <div className="header-search">
            <button className="header-search-btn" onClick={handleSearch}>
              <i className="bx bx-search-alt btn-search-p"></i>
            </button>
            <input
              ref={inputValue}
              onKeyDown={handleSearch}
              className="header-search-prod"
              type="text"
              placeholder="Minecraft, Pubg..."
            />
          </div>
          <li className="header-item">
            <Link to="/" className="header-item-link" onClick={handleLinkClick}>
              Inicio
            </Link>
          </li>
          <li className="header-item">
            <Link
              to="/products"
              className="header-item-link"
              onClick={handleLinkClick}
            >
              Productos
            </Link>
          </li>
          <li
            className="header-item header-item-link"
            id="iniciar-sesion-header"
            onClick={openLogin}
          >
            Iniciar sesión
          </li>
          <GoogleAuth isOpen={isLoginOpen} onClose={closeLogin} />
          {user && (
            <>
              <li
                className="header-item header-item-link"
                onClick={handleSignOut}
              >
                Desconectarse
              </li>
              <li className="header-username">{user.name}</li>
            </>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default Header;
