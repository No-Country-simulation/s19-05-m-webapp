import React from 'react';
import { useCart } from '../CartContext/CartContext';
import { Toaster, toast } from 'sonner';

function AddToCartButton({ product }) {
    //Usa el contexto para poder "mandar" las acciones
    const { dispatch } = useCart();
    

    const addToCart = () => {
        if (product.stock > 0) {
            dispatch({ type: 'ADD_ITEM', payload: product });
            toast.success('Artículo añadido al carrito')
        } else {
            toast.error('El producto no tiene stock disponible');
        }
    };

    return (
        //Modificar el icono cart acá
        <>
        <Toaster
            richColors
            position="top-center" />
        <button onClick={() => {
            addToCart()
            }
        }
        disabled={product.stock === 0}>
        Añadir al carrito
        </button>
        </>
    );
}

export default AddToCartButton;
