import { jwtDecode } from "jwt-decode";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "../../store/slices/auth.slices";
import "./GoogleAuth.css";

const GoogleAuth = ({isOpen, onClose}) => {
    if (!isOpen) return null; 

    const dispatch = useDispatch();

    const handleOverlayClick = (e) => {
        if (e.target === e.currentTarget) {
            onClose();
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
                    <div id="logInButton"></div>
                    <Link to="/registro" id="link-login">
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