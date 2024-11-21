import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import useFetch from "../../hooks/useFetch";

const Cart = () => {
    const [cartItems, setCartItems] = useState();
    //product.price, title, stock, image, id_product


    const addToCart = (product) => {
        
    }
    const removeFromCart = () => {

    }

    return (
        <div className="container-cart">

        </div>
    );
}

export default Cart;