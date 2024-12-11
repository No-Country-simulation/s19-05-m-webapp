import { jwtDecode } from "jwt-decode";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import "./GoogleAuth.css";
import userService from "../../services/register";

const GoogleAuth = ({isOpen, onClose}) => {
    if (!isOpen) return null; 

    const dispatch = useDispatch();
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });
    const [error, setError] = useState("");

    const handleOverlayClick = (e) => {
        if (e.target === e.currentTarget) {
            onClose();
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
      };
    
      const validateForm = () => {
        if (!formData.email || !formData.password ) {
          return "Todos los campos son obligatorios.";
        }
        return "";
      };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const errorMessage = validateForm();
        if (errorMessage) {
          setError(errorMessage);
        } else {
          setError("Cargando...");
          userService.checkUserLogin(formData.email, formData.password, setError, onClose, dispatch);
        }
    };

    function handleCallbackResponse(response) {
        var userObject = jwtDecode(response.credential);
        const userData = {
          name: userObject.name,
          email: userObject.email,
          password: userObject.sub,
          active: true,
          address: "",
          phone: ""
        };
        userService.createUser(userData, setError, dispatch);
        userService.checkUser(userData.email, userData.password, setError, dispatch);
        onClose();
      }

    useEffect(() => {
        google.accounts.id.initialize({
            client_id: import.meta.env.VITE_GOOGLE_CLIENT_ID,
            callback: handleCallbackResponse,
        })

        google.accounts.id.renderButton(
            document.getElementById("logInButton"),
            { theme: "filled_blue", size: "large" }
        )
    }, []);

    return (
        <div className="modal-overlay" onClick={handleOverlayClick}>
            <div id="logInDiv">
                <div id="logIn-container">
                    <h1>Iniciar Sesión</h1>
                    {error && <div className="error"><h3>{error}</h3></div>}
                    <form onSubmit={handleSubmit} id="login-form">
                        <label>Correo</label>
                        <input
                            name="email"
                            onChange={handleInputChange}
                            className="input"
                            value={formData.email}
                            type="email"
                        />

                        <label>Contraseña</label>
                        <input
                            name="password"
                            onChange={handleInputChange}
                            className="input"
                            value={formData.password}
                            type="password"
                        />

                        <button id="boton-submit" type="submit">Ingresar</button>
                    </form>
                    <div id="logInButton"></div>
                    <Link to="/registro" id="link-login" onClick={handleOverlayClick}>
                    ¿No estás registrado? Regístrate aquí.
                    </Link>
                    <div id="triangle-login"></div>
                </div>
                <div id="login-img"></div>
            </div>
        </div>
    )
}

export default GoogleAuth