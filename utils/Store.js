import { createContext, useReducer } from "react";
import Cookies from "js-cookie";
export const Store = createContext();

const initialState = {
  cart: Cookies.get('cart') ? JSON.parse(Cookies.get('cart')):{cartItems:[]},
};

function reducer(state, action) {
  switch (action.type) {
    case "CART_ADD_ITEM": {
      const newItem = action.payload;
      const existItem = state.cart.cartItems.find(
        (item) => item.id === newItem.id // Use triple equals to compare values
      );
      const cartItems = existItem
        ? state.cart.cartItems.map(
            (item) => (item.id === existItem.id ? newItem : item) // Compare IDs instead of names
          )
        : [...state.cart.cartItems, newItem]; // Fix typo in cartItems variable name
      Cookies.set ('cart', JSON.stringify({ cartItems: cartItems }));
      return { ...state, cart: { cartItems: cartItems } }; // Add missing "s" to cartItems and return updated state
    }
    case 'CART_REMOVE_ITEM': {
      const cartItems = state.cart.cartItems.filter(
        (item) => item.id !== action.payload.id
      )
      Cookies.set ('cart', JSON.stringify({ cartItems: cartItems }));
      return {...state ,cart :{...state.cart,cartItems}}
      }
    default:
      return state;
  }
}

export function StoreProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const value = { state, dispatch };
  return <Store.Provider value={value}>{children}</Store.Provider>;
}
