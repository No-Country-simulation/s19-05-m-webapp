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
            client_id: "152919958051-h2t2jisgn1hl97egdrst3uphhecsqp7s.apps.googleusercontent.com",
            callback: handleCallbackResponse,
        })
            
        google.accounts.id.renderButton(
            document.getElementById("logInButton"),
            { theme: "filled_blue", size: "large" }
        )
        if (user) {
            document.getElementById("logInButton").style.display = "none";
        } else {
            document.getElementById("logInButton").style.display = "block";
        }
    }, [user]);

    return (
        <div id="logInDiv">
            <div id="logIn-container">
                <h1>Iniciar Sesión</h1>
                <div id="logInButton"></div>
                {user && (
                    <>
                        <button onClick={handleSignOut}>Sign Out</button>
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