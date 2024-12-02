import { jwtDecode } from "jwt-decode";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "../../store/slices/auth.slices";
import { setRegister } from "../../store/slices/user.slices";
import "./GoogleAuth.css";


const Registro = () => {
  const dispatch = useDispatch();
  const usuario = useSelector((state) => state.user.name);
  const [formData, setFormData] = useState({
      nombre: "",
      email: "",
      password: "",
      password2: "",
  });
  const [error, setError] = useState("");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const validateForm = () => {
    if (!formData.nombre || !formData.email || !formData.password || !formData.password2) {
      return "Todos los campos son obligatorios.";
    }
     if (formData.password.length < 6){
      return "La contraseña debe tener más de 6 caracteres.";
    }
    if (formData.password != formData.password2) {
      return "Las contraseñas deben coincidir."
    }
    return "";
  };
    
  const handleSubmit = (e) => {
    e.preventDefault();
    const errorMessage = validateForm();
    if (errorMessage) {
      setError(errorMessage);
    } else {
      dispatch(setRegister({ name: formData.nombre, email: formData.email, password: formData.password }));
      setError("");
      console.log("Usuario con nombre " + usuario)
    }
  };

  function handleCallbackResponse(response) {
    var userObject = jwtDecode(response.credential);
    dispatch(setUser(userObject));
  }

  useEffect(() => {
    google.accounts.id.initialize({
      client_id: import.meta.env.VITE_GOOGLE_CLIENT_ID,
      callback: handleCallbackResponse,
    })

    google.accounts.id.renderButton(
      document.getElementById("logInButton"),
      { theme: "filled_blue", size: "large", text: "signup_with" }
    )}, []);

  return (
      <div id="registerDiv">
        <div id="register-container">
          <h1>Regístrate</h1>
            {error && <div className="error"><h3>{error}</h3></div>}
            <form onSubmit={handleSubmit} id="register-form">
              <label>Nombre</label>
              <input
                  name="nombre"
                  onChange={handleInputChange}
                  className="input"
                  value={formData.nombre}
                  type="text"
              />

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

              <label>Repite tu contraseña</label>
              <input
                  name="password2"
                  onChange={handleInputChange}
                  className="input"
                  value={formData.password2}
                  type="password"
              />

              <button id="boton-submit" type="submit">Enviar</button>
            </form>
            <p>Regístrate con tu cuenta Google.</p>
            <div id="logInButton"></div>
            <div id="triangle-register"></div>
          </div>
        <div id="register-img"></div>
      </div>
    )
}

export default Registro;
