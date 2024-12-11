import { Link, useNavigate } from "react-router-dom";
import "./Header.css";
import { useState, useEffect, useRef } from "react";
import useModal from "../../hooks/useModal";
import useLogin from "../../hooks/useLogin";
import Modal from "../modal/Modal";
import Cart from "../Cart/Cart";
import { useCart } from "../../contexts/CartContext/CartContext";
import { useDispatch, useSelector } from "react-redux";
import GoogleAuth from "../GoogleAuth/GoogleAuth";
import userService from "../../services/register";

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const { isModalOpen, openModal, closeModal } = useModal();
  const { totalQuantity } = useCart();
  const { isLoginOpen, openLogin, closeLogin } = useLogin();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const [isWideViewport, setIsWideViewport] = useState(window.innerWidth > 992);

  useEffect(() => {
    const handleResize = () => {
      setIsWideViewport(window.innerWidth > 992);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleSignOut = () => {
    dispatch(logout());
    google.accounts.id.disableAutoSelect();
    setIsDropdownOpen(false);
    navigate("/");
  };

  const toggleDropdown = () => {
    setIsDropdownOpen((prev) => !prev);
  };

  const handleLinkClick = () => {
    setMenuOpen(false);
    setIsDropdownOpen(false);
  };

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
          {user && isWideViewport ? (
            <li
              className="header-item header-username"
              onClick={toggleDropdown}
            >
              {user.name}
              {isDropdownOpen && (
                <ul className="dropdown-menu">
                  <li>
                    <Link
                      className="dropdown-item"
                      to="/historial"
                      onClick={handleLinkClick}
                    >
                      Historial
                    </Link>
                  </li>
                  <li className="dropdown-item" onClick={handleSignOut}>
                    Desconectarse
                  </li>
                </ul>
              )}
            </li>
          ) : (
            user && (
              <>
                <li className="header-item">
                  <Link
                    to="/historial"
                    className="header-item-link"
                    onClick={handleLinkClick}
                  >
                    Historial
                  </Link>
                </li>
                <li
                  className="header-item header-item-link"
                  onClick={handleSignOut}
                >
                  Desconectarse
                </li>
              </>
            )
          )}
          {!user && (
            <li className="header-item header-item-link" onClick={openLogin}>
              Iniciar sesión
            </li>
          )}
          <GoogleAuth isOpen={isLoginOpen} onClose={closeLogin} />
        </ul>
      </nav>
    </header>
  );
};

export default Header;
