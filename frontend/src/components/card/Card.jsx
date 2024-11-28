import "./card.css";

const imageUrl = "/crash-bandicoot.webp"; 

const Card = ({ title, genre, price, onClick }) => { 
    return (
        <div className="card" onClick={onClick} style={{ backgroundImage: `url(${imageUrl})` }}>
            <div className="card-content">
                <h2 className="card-title">{title}</h2>
                <p className="card-genre">{genre}</p>
                <div className="card-bottom">
                    <button className="card-button">Comprar</button>
                    <span className="card-price">${price} </span>
                </div>
            </div>
        </div>
    );
};
  
export default Card;
  