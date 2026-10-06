"use client";

import React, { createContext, useContext, useEffect, useMemo, useReducer } from "react";
import type { CartItem, Product } from "@/types";
import { lineTotalFor } from "@/lib/pricing";

type AddPayload = { product: Product; weight?: number; quantity?: number };

type State = { items: CartItem[] };

type Action =
  | { type: "hydrate"; items: CartItem[] }
  | { type: "add"; payload: AddPayload }
  | { type: "setWeight"; productId: string; weight: number }
  | { type: "setQuantity"; productId: string; quantity: number }
  | { type: "remove"; productId: string }
  | { type: "clear" };

function buildItem(product: Product, weight: number | undefined, quantity: number): CartItem {
  const w = product.pricingMode === "weight" ? weight ?? product.defaultWeight : undefined;
  return {
    productId: product.id,
    name: product.name,
    image: product.images[0],
    pricingMode: product.pricingMode,
    weight: w,
    unit: product.unit,
    quantity,
    pricePerKg: product.pricePerKg,
    price: product.price,
    lineTotal: lineTotalFor(product, { weight: w, quantity }),
  };
}

function recompute(item: CartItem): CartItem {
  return {
    ...item,
    lineTotal: lineTotalFor(
      { pricingMode: item.pricingMode, pricePerKg: item.pricePerKg, price: item.price },
      { weight: item.weight, quantity: item.quantity }
    ),
  };
}

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case "hydrate":
      return { items: action.items };
    case "add": {
      const { product, weight, quantity = 1 } = action.payload;
      const existing = state.items.find((i) => i.productId === product.id);
      if (existing) {
        return {
          items: state.items.map((i) =>
            i.productId === product.id
              ? recompute({
                  ...i,
                  weight: product.pricingMode === "weight" ? weight ?? i.weight : undefined,
                  quantity: product.pricingMode === "weight" ? 1 : i.quantity + quantity,
                })
              : i
          ),
        };
      }
      return { items: [...state.items, buildItem(product, weight, quantity)] };
    }
    case "setWeight":
      return {
        items: state.items.map((i) =>
          i.productId === action.productId ? recompute({ ...i, weight: action.weight }) : i
        ),
      };
    case "setQuantity":
      if (action.quantity <= 0) {
        return { items: state.items.filter((i) => i.productId !== action.productId) };
      }
      return {
        items: state.items.map((i) =>
          i.productId === action.productId ? recompute({ ...i, quantity: action.quantity }) : i
        ),
      };
    case "remove":
      return { items: state.items.filter((i) => i.productId !== action.productId) };
    case "clear":
      return { items: [] };
    default:
      return state;
  }
}

interface CartContextValue {
  items: CartItem[];
  addToCart: (payload: AddPayload) => void;
  setWeight: (productId: string, weight: number) => void;
  setQuantity: (productId: string, quantity: number) => void;
  removeFromCart: (productId: string) => void;
  clearCart: () => void;
  count: number;
  subtotal: number;
}

const CartContext = createContext<CartContextValue | undefined>(undefined);
const STORAGE_KEY = "eatcorrect.cart";

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(reducer, { items: [] });

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) dispatch({ type: "hydrate", items: JSON.parse(raw) });
    } catch {
      /* ignore */
    }
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state.items));
    } catch {
      /* ignore */
    }
  }, [state.items]);

  const value = useMemo<CartContextValue>(() => {
    const count = state.items.reduce((s, i) => s + (i.pricingMode === "weight" ? 1 : i.quantity), 0);
    const subtotal = state.items.reduce((s, i) => s + i.lineTotal, 0);
    return {
      items: state.items,
      addToCart: (payload) => dispatch({ type: "add", payload }),
      setWeight: (productId, weight) => dispatch({ type: "setWeight", productId, weight }),
      setQuantity: (productId, quantity) => dispatch({ type: "setQuantity", productId, quantity }),
      removeFromCart: (productId) => dispatch({ type: "remove", productId }),
      clearCart: () => dispatch({ type: "clear" }),
      count,
      subtotal,
    };
  }, [state.items]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}
