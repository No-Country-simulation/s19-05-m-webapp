import React from 'react';
import { useCart } from '../CartContext/CartContext';

function AddToCartButton({ product }) {
    //Usa el contexto para poder "mandar" las acciones
    const { dispatch } = useCart();
    

    const addToCart = () => {
        if (product.stock > 0) {
            dispatch({ type: 'ADD_ITEM', payload: product });
            console.log("Agregado");
        } else {
            alert('El producto no tiene stock disponible.');
        }
    };

    return (
        //Modificar el icono cart acá
        <button onClick={addToCart} disabled={product.stock === 0}>
            Añadir al carrito
        </button>
    );
}

export default AddToCartButton;
