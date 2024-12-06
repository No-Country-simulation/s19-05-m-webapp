import React from "react";
import "./about.css";

const About = () => {
  return (
    <section id="about-us" className="about-us-section ">
      <article className="container">
        <div className="about-content">
          <h2>Sobre Nosotros</h2>
          <p>
            ¡Bienvenidos a <strong>Checkpoint Zone</strong>! Nacimos en
            noviembre de 2024 con la visión de convertirnos en el destino
            favorito de todos los apasionados por los videojuegos. Fundada por
            un grupo de desarrolladores web con amor por los videojuegos,
            nuestra tienda reúne las mejores categorías de juegos como{" "}
            <em>aventura</em>, <em>acción</em>, <em>arcade</em>,{" "}
            <em>deportes</em>, y<em>carreras</em>.
          </p>
          <p>
            Trabajamos para ofrecer una experiencia de compra única, con una
            interfaz amigable y llamativa donde podrás explorar los últimos
            lanzamientos para tus plataformas favoritas: <strong>PC</strong>,
            <strong>Nintendo</strong>, <strong>PlayStation</strong> y{" "}
            <strong>Xbox</strong>.
          </p>
          <p>
            En Checkpoint Zone, no solo compras videojuegos, ¡también celebras
            tu pasión por este increíble mundo digital!
          </p>
        </div>
      </article>
      <article className="about-image">
        <img
          src="home-avatar-2.png"
          alt="Checkpoint Zone - Tienda de Videojuegos"
        />
      </article>
    </section>
  );
};

export default About;
