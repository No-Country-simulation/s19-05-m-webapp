import Historial from "../components/Historial/Historial";
import { useSelector } from "react-redux";
import useLogin from "../hooks/useLogin";
import GoogleAuth from "../components/GoogleAuth/GoogleAuth";

const ProductDetailPage = () => {
    const user = useSelector((state) => state.auth.user);
    const { isLoginOpen, openLogin, closeLogin } = useLogin();

    if (!user) {
        return (
          <div className="page-container">
            <div className="steps-container">
              <h2>Inicia Sesión</h2>
              <p>Debes iniciar sesión para ver tu historial.</p>
              <button onClick={openLogin} className="next-button">
                Iniciar sesión
              </button>
              <GoogleAuth isOpen={isLoginOpen} onClose={closeLogin} />
            </div>
          </div>
        );
      }

    return (
        <div style={{ backgroundColor: "var(--first-color)" }}>
            <Historial />
        </div>
    );
};
  
export default ProductDetailPage;
  