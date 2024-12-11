import "./card.css";

const Card = ({ title, image, genre, price, onClick }) => { 
    return (
        <div className="card" onClick={onClick} 
            style={{ backgroundImage: `url(${image && image.startsWith('https') ? 
            image : '/images/default-image.png'})` }}>
            <div className="card-content">
                <h2 className="card-title">{title}</h2>
                <p className="card-genre">{genre}</p>
                <div className="card-bottom">
                    <button className="card-button">Detalle</button>
                    <span className="card-price">${price} </span>
                </div>
            </div>
        </div>
    );
};
  
export default Card;
  