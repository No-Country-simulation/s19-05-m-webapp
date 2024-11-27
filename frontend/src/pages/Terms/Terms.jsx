import React from "react";
import "./terms.css";

const Terms = () => {
  return (
    <section id="terms-and-conditions" className="terms-section page-container">
      <div className="container">
        <h2>Términos y Condiciones</h2>
        <div className="terms-content">
          <div className="terms-section">
            <h3>1. Cómo contactarnos</h3>
            <p>
              Si tienes preguntas, inquietudes o necesitas asistencia, puedes
              contactarnos en{" "}
              <a href="mailto:support@checkpointzone.com">
                support@checkpointzone.com
              </a>
              . Estamos aquí para ayudarte.
            </p>
          </div>

          <div className="terms-section">
            <h3>2. Tu dispositivo y tus datos</h3>
            <p>
              Eres responsable de cualquier acceso o tarifa de datos que se
              genere al usar nuestros servicios. Asegúrate de que tu dispositivo
              sea compatible con nuestra plataforma y de mantener la seguridad
              de tu información personal durante la navegación.
            </p>
          </div>

          <div className="terms-section">
            <h3>3. Privacidad y datos personales</h3>
            <p>
              Nos comprometemos a proteger tu privacidad. Tus datos personales
              se recopilan únicamente para procesar tus pedidos, mejorar tu
              experiencia y cumplir con requisitos legales. Consulta nuestra
              <a href="#privacy-policy"> Política de Privacidad</a> para más
              información sobre cómo gestionamos tu información.
            </p>
          </div>

          <div className="terms-section">
            <h3>4. Precios y pagos</h3>
            <p>
              Todos los precios están sujetos a cambios sin previo aviso.
              Aceptamos métodos de pago seguros como tarjetas de crédito, débito
              y billeteras digitales. Los pagos deben completarse antes del
              envío del producto o acceso al contenido adquirido.
            </p>
          </div>

          <div className="terms-section">
            <h3>5. Tus derechos</h3>
            <p>
              Como usuario de Checkpoint Zone, tienes derecho a un acceso justo
              y transparente a nuestros productos y servicios. También puedes
              solicitar soporte para cualquier problema relacionado con tu
              compra y conocer más sobre tus derechos en nuestra plataforma.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Terms;
