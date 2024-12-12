import { useCart } from '../../contexts/CartContext/CartContext';
import { Toaster, toast } from 'sonner';
import "./addToCartButton.css";
import shoppingCartService from '../../services/shoppingCart';
import { useState } from 'react';
import Cookies from 'js-cookie';

function AddToCartButton({ product }) {
    const { dispatch } = useCart();
    const userData = localStorage.getItem('user');
    const [prueba, setPrueba] = useState(false);

    const addToCart = async () => {
        if (userData) {
            const user = JSON.parse(userData);
            const user_id = user.id_users;

            if (!user_id) {
                toast.error('Debes iniciar sesión para agregar productos al carrito');
                return;
            }

            try {
                const existingCart = await shoppingCartService.getCart(user_id);

                if (existingCart?.products && existingCart.products.some(p => p.id === product.id_product)) {
                    toast.info('Este producto ya está en el carrito.');
                    return;
                }

                const cart = Cookies.get('cart') ? JSON.parse(Cookies.get('cart')) : [];
                const updatedCart = [...cart, { id: product.id_product, quantity: 1 }];

                if (product.stock > 0) {
                    await shoppingCartService.createCart(user_id, product.id_product, 1);
                    Cookies.set('cart', JSON.stringify(updatedCart), { expires: 7 });
                    dispatch({
                        type: 'ADD_ITEM',
                        payload: { ...product, id: product.id_product, user_id, quantity: 1 }
                    });

                    toast.success('Artículo añadido al carrito');
                    setPrueba(true);
                } else {
                    toast.error('El producto no tiene stock disponible');
                }
            } catch (error) {
                toast.error('Error al añadir el producto al carrito');
                console.error("Error al añadir producto al carrito:", error);
            }
        }
    };

    return (
        <>
            <Toaster
                richColors
                position="bottom-center"
            />
            <button className="add-cart" onClick={addToCart} disabled={prueba}>
                <i className="bx bxs-cart"></i> Añadir al carrito
            </button>
        </>
    );
}
export default AddToCartButton;