// src/contexts/CartContext.tsx
import React, { createContext, useContext, useEffect, useMemo, useReducer } from "react";
import { type Product } from "../types/product";


type CartState = {
  items: Record<number, { product: Product; quantity: number }>;
};

type Action =
  | { type: "add"; payload: { product: Product; qty?: number } }
  | { type: "remove"; payload: { id: number } }
  | { type: "setQty"; payload: { id: number; qty: number } }
  | { type: "clear" }
  | { type: "replace"; payload: CartState };

const STORAGE_KEY = "ecomlite_cart_v1";

const initialState: CartState = { items: {} };

function reducer(state: CartState, action: Action): CartState {
  switch (action.type) {
    case "add": {
      const { product, qty = 1 } = action.payload;
      const id = Number(product.id);
      const existing = state.items[id];
      const nextQty = (existing?.quantity ?? 0) + qty;
      return {
        ...state,
        items: {
          ...state.items,
          [id]: { product, quantity: nextQty },
        },
      };
    }

    case "remove": {
      const id = action.payload.id;
      const next = { ...state.items };
      delete next[id];
      return { ...state, items: next };
    }

    case "setQty": {
      const { id, qty } = action.payload;
      if (qty <= 0) {
        const next = { ...state.items };
        delete next[id];
        return { ...state, items: next };
      }
      const entry = state.items[id];
      if (!entry) return state;
      return {
        ...state,
        items: { ...state.items, [id]: { ...entry, quantity: qty } },
      };
    }

    case "clear":
      return { items: {} };

    case "replace":
      return action.payload;

    default:
      return state;
  }
}

const CartContext = createContext<{
  state: CartState;
  totalItems: number;
  totalPrice: number;
  addToCart: (product: Product, qty?: number) => void;
  removeFromCart: (id: number) => void;
  setQuantity: (id: number, qty: number) => void;
  clearCart: () => void;
}>({
  state: initialState,
  totalItems: 0,
  totalPrice: 0,
  addToCart: () => {},
  removeFromCart: () => {},
  setQuantity: () => {},
  clearCart: () => {},
});

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState, (init) => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return init;
      return JSON.parse(raw) as CartState;
    } catch {
      return init;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch {
  
    }
  }, [state]);

  const addToCart = (product: Product, qty: number = 1) => {
    dispatch({ type: "add", payload: { product, qty } });
  };

  const removeFromCart = (id: number) => {
    dispatch({ type: "remove", payload: { id } });
  };

  const setQuantity = (id: number, qty: number) => {
    dispatch({ type: "setQty", payload: { id, qty } });
  };

  const clearCart = () => dispatch({ type: "clear" });

  const { totalItems, totalPrice } = useMemo(() => {
    const entries = Object.values(state.items);
    const totalItems = entries.reduce((s, e) => s + e.quantity, 0);
    const totalPrice = entries.reduce((s, e) => s + (Number(e.product.price) || 0) * e.quantity, 0);
    return { totalItems, totalPrice };
  }, [state]);

  return (
    <CartContext.Provider value={{ state, totalItems, totalPrice, addToCart, removeFromCart, setQuantity, clearCart }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within <CartProvider>");
  return ctx;
};
