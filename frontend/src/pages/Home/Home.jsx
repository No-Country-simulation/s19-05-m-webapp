import React from "react";
import "./Home.css";
import Trends from "../../components/home/Trends";

const Home = () => {
  return (
    <div className="home page-container">
      <section className="hero-home">
        <article
          className="hero-img"
          style={{ backgroundImage: 'url("hero-img.png")' }}
        >
          <aside className="hero-img-aside">
            <div className="hero-img-content">
              <h2 className="hero-title">Minecraft</h2>
              <p className="hero-p">
                Es un juego de mundo abierto donde los jugadores pueden
                explorar, construir y sobrevivir en un entorno hecho de bloques.
              </p>
              <button className="hero-btn">Obtenlo Ahora</button>
            </div>
          </aside>
        </article>
      </section>
      <section className="home-tendencias">
        <Trends />
      </section>
    </div>
  );
};

export default Home;
