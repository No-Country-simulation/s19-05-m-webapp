import React, { createContext, useContext, useEffect, useReducer } from 'react';
import Cookies from 'js-cookie';

const CartContext = createContext(); //Guarda y comparte estado y acciones

const cartReducer = (state, action) => { //Estado actual y acción sobre como modificar el estado
    switch (action.type) {
        case 'ADD_ITEM': {
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
        case 'REMOVE_ITEM':
            //Filtro prods para excluir el que coincide con id
            return state.filter((item) => item.id !== action.payload.id);
        case 'UPDATE_QUANTITY':
            return state.map((item) =>
                item.id === action.payload.id
                    ? { ...item, quantity: action.payload.quantity }
                    : item
            );
        default:
            return state;
    }
};
//Se usa el reducer para manejar el estado y las acciones(dispatch)
//Children = quienes consumen el contexto
export const CartProvider = ({ children }) => {
    const loadCartFromCookies = () => {
        const cart = Cookies.get('cart');
        return cart ? JSON.parse(cart) : [];
    };
    const [state, dispatch] = useReducer(cartReducer, loadCartFromCookies());
    const totalQuantity = state.reduce((total, item) => total + item.quantity, 0);

    useEffect(() => {
        Cookies.set('cart', JSON.stringify(state), { expires: 7 }); 
    }, [state]);

    return (
        <CartContext.Provider value={{ state, dispatch, totalQuantity }}>
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => useContext(CartContext);
