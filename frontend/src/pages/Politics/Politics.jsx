import React from "react";
import "./politics.css";

const Politics = () => {
  return (
    <section id="privacy-policy" className="privacy-section">
      <div className="container">
        <h2>Política de Privacidad</h2>
        <p>
          En <strong>Checkpoint Zone</strong>, valoramos la privacidad de
          nuestros usuarios y nos comprometemos a proteger tus datos personales.
          A continuación, te explicamos cómo gestionamos tu información y tus
          derechos.
        </p>

        <div className="privacy-section">
          <h3>1. Enlaces de terceros</h3>
          <p>
            Nuestro sitio web puede incluir enlaces a sitios web, complementos o
            aplicaciones de terceros. Al hacer clic en estos enlaces o habilitar
            esas conexiones, podrías permitir que terceros recopilen o compartan
            tus datos. No controlamos estas plataformas y no somos responsables
            de sus políticas de privacidad. Te recomendamos leer las políticas
            de privacidad de cada sitio web que visites.
          </p>
        </div>

        <div className="privacy-section">
          <h3>2. Tipos de datos personales que procesamos</h3>
          <p>
            Podemos procesar los siguientes tipos de datos personales según las
            interacciones que tengas con nuestra página:
          </p>
          <ul>
            <li>
              <strong>Datos de identidad y contacto:</strong> Nombre, correo
              electrónico, dirección postal y otros datos proporcionados al
              contactarnos o registrarte.
            </li>
            <li>
              <strong>Datos financieros:</strong> Información necesaria para
              procesar pagos, como detalles de tarjetas de crédito o débito.
            </li>
            <li>
              <strong>Datos técnicos:</strong> Dirección IP, tipo de navegador,
              sistema operativo y otras características técnicas relacionadas
              con tu dispositivo.
            </li>
          </ul>
        </div>

        <div className="privacy-section">
          <h3>3. Cómo recibimos tus datos personales</h3>
          <p>Recopilamos tus datos personales de las siguientes maneras:</p>
          <ul>
            <li>
              <strong>Interacciones directas:</strong> Información proporcionada
              al registrarte, realizar un pedido, contactarnos o participar en
              promociones.
            </li>
            <li>
              <strong>Tecnologías automatizadas:</strong> Uso de cookies y
              herramientas de análisis para recopilar datos técnicos y patrones
              de uso mientras navegas por nuestro sitio web.
            </li>
            <li>
              <strong>Fuentes de terceros:</strong> Información de proveedores
              de pagos, herramientas de análisis o redes sociales, según
              corresponda.
            </li>
          </ul>
        </div>

        <div className="privacy-section">
          <h3>4. Cómo usamos tus datos personales</h3>
          <p>Utilizamos tus datos personales para:</p>
          <ul>
            <li>
              Procesar tus pedidos y garantizar la entrega correcta de los
              productos adquiridos.
            </li>
            <li>
              Proporcionar soporte al cliente y responder a tus consultas.
            </li>
            <li>
              Mejorar tu experiencia de usuario en nuestra plataforma mediante
              el análisis de datos.
            </li>
            <li>Cumplir con nuestras obligaciones legales y normativas.</li>
          </ul>
        </div>

        <div className="privacy-section">
          <h3>5. Tus derechos legales</h3>
          <p>
            Como usuario, tienes derechos relacionados con tus datos personales,
            incluidos los siguientes:
          </p>
          <ul>
            <li>
              <strong>Acceso:</strong> Solicitar una copia de los datos
              personales que poseemos sobre ti.
            </li>
            <li>
              <strong>Corrección:</strong> Solicitar la actualización de datos
              inexactos o incompletos.
            </li>
            <li>
              <strong>Eliminación:</strong> Solicitar la eliminación de tus
              datos cuando no exista una razón legal para conservarlos.
            </li>
            <li>
              <strong>Restricción:</strong> Limitar el procesamiento de tus
              datos en ciertas circunstancias.
            </li>
          </ul>
          <p>
            Si deseas ejercer alguno de estos derechos, puedes contactarnos en{" "}
            <a href="mailto:support@checkpointzone.com">
              support@checkpointzone.com
            </a>
            .
          </p>
        </div>
      </div>
    </section>
  );
};

export default Politics;
