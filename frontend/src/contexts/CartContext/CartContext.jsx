import { act, createContext, useContext, useEffect, useReducer } from "react";

const CartContext = createContext(); //Guarda y comparte estado y acciones

const cartReducer = (state, action) => {
  //Estado actual y acción sobre como modificar el estado
  switch (action.type) {
    case "ADD_ITEM": {
      const existingItem = state.find((item) => item.id === action.payload.id);
      //Si existe actualizo el prod encontrado
      if (existingItem) {
        return state.map((item) =>
          item.id === action.payload.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...state, { ...action.payload, quantity: 1 }];
    }
    case "REMOVE_ITEM":
      //Filtro prods para excluir el que coincide con id
      return state.filter((item) => item.id !== action.payload);
    case "UPDATE_QUANTITY":
      return state.map((item) =>
        item.id === action.payload.id
          ? { ...item, quantity: action.payload.quantity }
          : item
      );

    case "CLEAR_CART":
      return (action.state = []);
    case "SET_CART": {
      const newCart = action.payload.map((item) => ({
        ...item,
        id: item.id_product,
        title: item.name,
      }));     
      // Filtrar los elementos con "state": "PENDING"
      const pendingItems = newCart.filter(item => item.state === "PENDING");
      return state
        .map((existingItem) => {
          const newItem = pendingItems.find((item) => item.id === existingItem.id);
          return newItem ? { ...existingItem, ...newItem } : existingItem;
        })
        .concat(
          pendingItems.filter(
            (item) => !state.some((existingItem) => existingItem.id === item.id)
          )
        );
    }
    default:
      return state;
  }
};
//Se usa el reducer para manejar el estado y las acciones(dispatch)
//Children = quienes consumen el contexto
export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, []);
  const totalQuantity = state.reduce((total, item) => total + item.quantity, 0);

  return (
    <CartContext.Provider value={{ state, dispatch, totalQuantity }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
