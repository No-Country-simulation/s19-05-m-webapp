import { jwtDecode } from "jwt-decode";
import { useEffect, useState } from "react";
import "./GoogleAuth.css";
import createUser from "../../services/register";


const Registro = () => {
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
    if (formData.nombre.length > 20 ){
      return "El nombre no debe tener más de 20 caracteres.";
    }
    if (formData.password != formData.password2) {
      return "Las contraseñas deben coincidir."
    }
    return "";
  };
    
  const handleSubmit = async (e) => {
    e.preventDefault();
    const errorMessage = validateForm();
    if (errorMessage) {
      setError(errorMessage);
    } else {
      const userData = {
        name: formData.nombre,
        email: formData.email,
        password: formData.password,  
        active: true,
        address: "",
        phone: ""
      }
      setError("Cargando...");
      createUser(userData, setError);
    }
  };

  function handleCallbackResponse(response) {
    var userObject = jwtDecode(response.credential); //checkear si existe ya usuario con ese correo
    const userData = {
      name: userObject.name,
      email: userObject.email,
      password: userObject.sub,
      active: true,
      address: "",
      phone: ""
    };
    createUser(userData, setError)
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
