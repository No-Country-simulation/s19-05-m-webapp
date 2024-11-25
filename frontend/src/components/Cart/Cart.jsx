// import React, { useState, useEffect, useContext } from "react";
// import { Link } from "react-router-dom";
// import useFetch from "../../hooks/useFetch";

// const Cart = () => {
//     const [cartItems, setCartItems] = useState();
//     //product.price, title, stock, image, id_product


//     const addToCart = (product) => {

//     }
//     const removeFromCart = () => {

//     }

//     return (
//         <div className="container-cart">

//         </div>
//     );
// }

// export default Cart;
import React from 'react';
import { useCart } from './CartContext';

function Cart() {
    const { state, dispatch } = useCart();

    const removeItem = (id) => {
        dispatch({ type: 'REMOVE_ITEM', payload: { id } });
    };

    const updateQuantity = (id, quantity, stock) => {
        if (quantity > stock) {
            alert('No hay suficiente stock disponible.');
            return;
        }
        dispatch({ type: 'UPDATE_QUANTITY', payload: { id, quantity } });
    };

    const total = state.reduce((sum, item) => sum + item.price * item.quantity, 0);

    return (
        <div>
            <h2>Carrito de Compras</h2>
            {state.length === 0 && <p>Tu carrito está vacío.</p>}
            {state.map((item) => (
                <div key={item.id}>
                    <h4>{item.title}</h4>
                    <p>Precio unitario: ${item.price.toFixed(2)}</p>
                    <p>Total: ${(item.price * item.quantity).toFixed(2)}</p>
                    <input
                        type="number"
                        value={item.quantity}
                        min="1"
                        max={item.stock}
                        onChange={(e) =>
                            updateQuantity(item.id, parseInt(e.target.value, 10), item.stock)
                        }
                    />
                    <button onClick={() => removeItem(item.id)}>Eliminar</button>
                </div>
            ))}
            <h3>Total del carrito: ${total.toFixed(2)}</h3>
        </div>
    );
}

export default Cart;


