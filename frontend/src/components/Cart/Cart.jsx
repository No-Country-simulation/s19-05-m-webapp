import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../../contexts/CartContext/CartContext';
import shoppingCartService from '../../services/shoppingCart';
import './cart.css';

function Cart({ onClose }) {
    const { state, dispatch } = useCart();
    const navigate = useNavigate();
    const user_id = localStorage.getItem('user.id_users');

    useEffect(() => {
        const fetchCart = async () => {
            if (!user_id) return;
            try {
                const cartItems = await shoppingCartService.getCart(user_id);
                if (Array.isArray(cartItems)) {
                    dispatch({ type: 'SET_CART', payload: cartItems }); // Usa SET_CART para inicializar
                } else {
                    console.error('Formato de datos incorrecto:', cartItems);
                }
            } catch (error) {
                console.error('Error al cargar el carrito:', error);
            }
        };
        fetchCart();
    }, [dispatch, user_id]);

    const removeItem = async (id) => {
        try {
            dispatch({ type: 'REMOVE_ITEM', payload: { id } });
            await shoppingCartService.removeProductFromCart(user_id, id);
        } catch (error) {
            console.error('Error al eliminar el producto:', error);
        }
    };

    const updateQuantity = async (id, quantity, stock) => {
        if (quantity > stock || quantity <= 0) {
            toast.error('Cantidad no válida o supera el stock disponible.');
            return;
        }
        try {
            await shoppingCartService.addOrUpdateProductInCart(user_id, id, quantity);
            dispatch({ type: 'UPDATE_QUANTITY', payload: { id, quantity } });
        } catch (error) {
            console.error('Error al actualizar la cantidad:', error);
        }
    };

    const total = Array.isArray(state)
        ? state.reduce((sum, item) => sum + item.price * item.quantity, 0)
        : 0;

    const handleCheckout = () => {
        onClose();
        navigate('/checkout');
    };

    return (
        <div className='cart'>
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
            <div className=''>
                <button onClick={handleCheckout}>Comprar</button>
            </div>
        </div>
    );
}

export default Cart;