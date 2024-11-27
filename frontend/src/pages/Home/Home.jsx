import React from "react";
import "./Home.css";
import Trends from "../../components/home/Trends";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="home page-container">
      <section className="hero-home">
        <article
          className="hero-img"
          style={{ backgroundImage: 'url("hero-img.png")' }}
        >
          <aside className="hero-img-opacity">
            <div className="hero-img-content">
              <h2 className="hero-title">Minecraft</h2>
              <p className="hero-p">
                Es un juego de mundo abierto donde los jugadores pueden
                explorar, construir y sobrevivir en un entorno hecho de bloques.
                Ofrece infinitas posibilidades de creatividad, desde crear
                estructuras increíbles hasta enfrentar desafíos en modo
                supervivencia. Con sus distintos modos de juego y opciones
                multijugador, es una experiencia para todas las edades.
              </p>
              <Link to="/products" className="hero-btn">
                Obtenlo Ahora
              </Link>
            </div>
          </aside>
        </article>
      </section>
      <section className="home-trends">
        <Trends />
      </section>
      <section className="about">
        <article>
          <p>
            En Checkpoint Zone amamos los videojuegos tanto como tú. Aquí
            encontrarás desde los últimos lanzamientos hasta esos clásicos que
            siempre quieres volver a jugar. Nos encanta ser parte de tus
            aventuras y ayudarte a llevar tu experiencia gamer al siguiente
            nivel. Regístrate ahora y disfruta de descuentos exclusivos y accede
            a contenido especial pensado solo para nuestra comunidad. ¡Haz de
            cada compra tu próximo checkpoint!
          </p>
        </article>
        <img className="about-img" src="/about-img.png" alt="about" />
      </section>
      <section className="categories">
        <article className="categories-card">
          <img className="img-1" src="home-avatar-1.png" alt="Avatar 1" />
          <img className="img-2" src="/home-avatar-2.png" alt="Avatar 2" />
          <div className="categories-content">
            <h2>Observa todas las categorias de juegos que hay disponibles</h2>
            <h5>
              Tenemos gran diversidad de géneros de juegos, échale un vistazo
            </h5>
            <Link to="/products" className="categories-btn">
              Ver Categorias
            </Link>
            {/* <button className="categories-btn">Ver Categorias</button> */}
          </div>
        </article>
      </section>
    </div>
  );
};

export default Home;
