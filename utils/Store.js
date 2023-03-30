import { createContext, useReducer } from "react";

export const Store = createContext();

const initialState = {
  cart: { cartItems: [] },
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
      return { ...state, cart: { cartItems: cartItems } }; // Add missing "s" to cartItems and return updated state
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
