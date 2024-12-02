import { jwtDecode } from "jwt-decode";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setUser, logout } from "../../store/slices/auth.slices";
import "./GoogleAuth.css";

const Registro = () => {
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
      context: "signup",
    });

    google.accounts.id.renderButton(document.getElementById("logInButton"), {
      theme: "filled_blue",
      size: "large",
      text: "signup_with",
    });
    if (user) {
      document.getElementById("logInButton").style.display = "none";
    } else {
      document.getElementById("logInButton");
    }
  }, [user]);

  return (
    <div id="logInDiv">
      <div id="logIn-container">
        <h1>Regístrate</h1>
        <div id="logInButton"></div>
        {user && (
          <>
            <button onClick={handleSignOut}>Desconectarse</button>
            <div>
              <img
                src={user.picture}
                alt="User avatar"
                style={{ width: 100 }}
              />
              <h3>{user.name}</h3>
            </div>
          </>
        )}
        <Link to="/login" id="link-login">
          ¿Ya estás registrado? Inicia sesión.
        </Link>
        <div id="triangle-login"></div>
      </div>
      <div id="login-img"></div>
    </div>
  );
};

export default Registro;
