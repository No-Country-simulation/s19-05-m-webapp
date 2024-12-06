import { useCart } from '../../contexts/CartContext/CartContext';
import { Toaster, toast } from 'sonner';
import "./addToCartButton.css";
import shoppingCartService from '../../services/shoppingCart';

function AddToCartButton({ product, openModal }) {
    //Usa el contexto para poder "mandar" las acciones
    const { dispatch } = useCart();
    const userId = 1;

    const addToCart = async() => {
        if (!userId) {
            toast.error('Debes iniciar sesión para agregar productos al carrito');
            return;
        }
        if (product.stock > 0) {
            try {
                await shoppingCartService.addOrUpdateProductInCart(userId, product.id_product, 1);
                dispatch({ type: 'ADD_ITEM', payload: { ...product, id: product.id_product } });
                toast.success('Artículo añadido al carrito');
                openModal();
            } catch (error) {
                toast.error('Error al añadir el producto al carrito');
            }
        } else {
            toast.error('El producto no tiene stock disponible');
        }
    };

    return (
        <>
            <Toaster
                richColors
                position="bottom-center"
            />
            <button className="add-cart" onClick={() => { addToCart() }} disabled={product.stock === 0}>
                <i className="bx bxs-cart"></i> Añadir al carrito
            </button>
        </>
    );
}

export default AddToCartButton;
