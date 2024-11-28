import { jwtDecode } from "jwt-decode";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setUser, logout } from "../../store/slices/auth.slices";
import "./GoogleAuth.css";

const GoogleAuth = () => {
    const dispatch = useDispatch();
    const user = useSelector((state) => state.auth.user);

    function handleCallbackResponse(response) {
        var userObject = jwtDecode(response.credential);
        dispatch(setUser(userObject));
    }

    function handleSignOut(event) {
        dispatch(logout());
    }

    useEffect(() => {
        /* global google */
        google.accounts.id.initialize({
            client_id: import.meta.env.VITE_GOOGLE_CLIENT_ID,
            callback: handleCallbackResponse,
        })

        google.accounts.id.renderButton(
            document.getElementById("logInButton"),
            { theme: "filled_blue", size: "large" }
        )
        if (user) {
            document.getElementById("logInButton").style.display = "none";
            document.getElementById("iniciar-sesion-header").style.display = "none";
        } else {
            document.getElementById("logInButton").style.display = "block";
            document.getElementById("iniciar-sesion-header").style.display = "block";
        }
    }, [user]);

    return (
        <div id="logInDiv">
            <div id="logIn-container">
                <h1>Iniciar Sesión</h1>
                <div id="logInButton"></div>
                {user && (
                    <>
                        <button onClick={handleSignOut}>Desconectarse</button>
                        <div>
                            <img src={user.picture} alt="User avatar" style={{width:100}}/>
                            <h3>{user.name}</h3>
                        </div>
                    </>
                 )}
                <Link to="/registro" id="link-login">
                ¿No estás registrado? Regístrate aquí.
                </Link>
                <div id="triangle-login"></div>
            </div>
            <div id="login-img"></div>
        </div>
    )
}

export default GoogleAuth