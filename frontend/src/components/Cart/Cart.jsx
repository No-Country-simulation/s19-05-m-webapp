import { useNavigate } from "react-router-dom";
import { useCart } from "../../contexts/CartContext/CartContext";
import "./cart.css";
import { useSelector } from "react-redux";
import shoppingService from "../../services/shopping";

function Cart({ onClose }) {
  const { state, dispatch } = useCart();
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth.user);
  const isPaymentPending = JSON.parse(localStorage.getItem("payment")) !== null;

  const removeItem = async (id) => {
    try {
      const localUser = JSON.parse(localStorage.getItem("user") || "{}");
      if (!localUser?.id_users) {
        throw new Error("El usuario no tiene un ID válido.");
      }
      const response = await shoppingService.deleteShopping(user.id_users, id);

      if (response.success) {
        dispatch({ type: "REMOVE_ITEM", payload: id });
      }
    } catch (error) {
      console.error("Error al eliminar el producto del carrito:", error);
    }
  };

  const updateQuantity = async (id, quantity, stock) => {
    try {
      if (quantity > stock) {
        alert("No hay suficiente stock disponible.");
        return;
      }

      const localUser = JSON.parse(localStorage.getItem("user") || "{}");
      if (!localUser?.id_users) {
        throw new Error("El usuario no tiene un ID válido.");
      }

      const response = await shoppingService.updateShopping(
        user.id_users,
        id,
        quantity
      );

      dispatch({ type: "UPDATE_QUANTITY", payload: { id, quantity } });
    } catch (error) {
      console.error("Error al actualizar la cantidad:", error);
    }
  };

  const total = state.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const handleCheckout = () => {
    onClose();
    navigate("/checkout");
  };

  return (
    <div className="cart">
      {isPaymentPending && (
        <div className="payment-pending">
          <p>El pago está pendiente.</p>
        </div>
      )}
      {!isPaymentPending && state.length === 0 && (
        <p className="cart-empty">Tu carrito está vacío.</p>
      )}
      {!isPaymentPending &&
        state.map((item) => (
          <div key={item.id} className="cart-item">
            <h4>{item.title}</h4>
            <p>Precio unitario: ${item.price.toFixed(2)}</p>
            <p>Total: ${(item.price * item.quantity).toFixed(2)}</p>
            <div className="number-input-container">
              <button
                className="number-input-button"
                onClick={() =>
                  updateQuantity(item.id, item.quantity - 1, item.stock)
                }
              >
                -
              </button>
              <input
                type="number"
                value={item.quantity}
                min="1"
                max={item.stock}
                onChange={(e) =>
                  updateQuantity(
                    item.id,
                    parseInt(e.target.value, 10),
                    item.stock
                  )
                }
              />
              <button
                className="number-input-button"
                onClick={() =>
                  updateQuantity(item.id, item.quantity + 1, item.stock)
                }
              >
                +
              </button>

              <button
                className="cart-button"
                onClick={() => removeItem(item.id)}
              >
                Eliminar
              </button>
            </div>
          </div>
        ))}
      {state.length > 0 && (
        <>
          <h3 className="cart-total">Total del carrito: ${total.toFixed(2)}</h3>
          <div className="cart-checkout">
            <button className="cart-button" onClick={handleCheckout}>
              Pagar
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default Cart;
