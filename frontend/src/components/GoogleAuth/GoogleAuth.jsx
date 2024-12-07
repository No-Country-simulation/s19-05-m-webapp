import { jwtDecode } from "jwt-decode";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { setUser } from "../../store/slices/auth.slices";
import "./GoogleAuth.css";
import useFetch from "../../hooks/useFetch";
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
          setError("");
          try {
            const response = await userService.checkUser(formData.email); //usar checkuser con formData.email como parametro (cuando se pueda buscar por email al usuario)
            if (formData.password == response.password) { //comparar contraseñas. no funciona debido a encriptación de contraseña en database
                dispatch(setUser(response))
                onClose() 
            } else {
                setError("La contraseña es incorrecta.")
                console.log(formData.password, response.password) //temporal para comparar contraseña input y contraseña en database
            }
          } catch (err) {
            console.error(err); 
            setError("No se ha encontrado una cuenta con ese correo.") //cambiar mensaje para que ambos sean iguales.
          }
        }
    };

    function handleCallbackResponse(response) {
        var userObject = jwtDecode(response.credential);
        dispatch(setUser(userObject));
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