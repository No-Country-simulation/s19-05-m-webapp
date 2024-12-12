import { useCart } from "../../contexts/CartContext/CartContext";
import { Toaster, toast } from "sonner";
import "./addToCartButton.css";
import shoppingService from "../../services/shopping";

function AddToCartButton({ product }) {
  //Usa el contexto para poder "mandar" las acciones
  const { state, dispatch } = useCart();
  const user = JSON.parse(localStorage.getItem("user") || "{}");
  const isProductInCart = state.some(
    (cartItem) => cartItem.id === product.id_product
  );

  const isPaymentPending = JSON.parse(localStorage.getItem("payment")) !== null;

  const addToCart = async () => {
    if (product.stock > 0) {
      if (!user.id_users) {
        toast.error("Debes iniciar sesión para añadir al carrito");
        return;
      }
      if (!product) {
        return toast.error("El producto no existe");
      }

      const newProduct = await shoppingService.postShopping(
        user.id_users,
        product.id_product,
        1
      );

      if (!newProduct) {
        return toast.error("No se pudo agregar al carrito");
      }

      dispatch({
        type: "ADD_ITEM",
        payload: { ...product, id: product.id_product },
      });
      toast.success("Artículo añadido al carrito");
    } else {
      toast.error("El producto no tiene stock disponible");
    }
  };

  return (
    <>
      <Toaster
        richColors
        //closeButton
        position="bottom-center"
      />
      {isPaymentPending ? (
        <p>El pago está pendiente. No puedes añadir más productos.</p>
      ) : isProductInCart ? (
        <p>Este producto ya está en tu carrito.</p>
      ) : (
        <button
          className="add-cart"
          onClick={() => {
            addToCart();
          }}
          disabled={product.stock === 0}
        >
          {" "}
          <i className="bx bxs-cart"></i> Añadir al carrito{" "}
        </button>
      )}
    </>
  );
}

export default AddToCartButton;
