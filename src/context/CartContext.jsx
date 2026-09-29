import React, { createContext, useContext, useEffect, useMemo, useState } from "react";

const STORAGE_KEY = "kalamandir_cart_v1";
const CartContext = createContext(null);

function loadInitial() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) return JSON.parse(raw);
  } catch {
  }
  return [];
}

const lineKey = (productId, size, color) => `${productId}__${size}__${color}`;

export function CartProvider({ children }) {
  const [lines, setLines] = useState(loadInitial);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(lines));
    } catch {
    }
  }, [lines]);

  const addToCart = (product, { size, color, qty = 1 }) => {
    const key = lineKey(product.id, size, color);
    setLines((prev) => {
      const existing = prev.find((l) => l.key === key);
      if (existing) {
        return prev.map((l) => (l.key === key ? { ...l, qty: l.qty + qty } : l));
      }
      return [
        ...prev,
        {
          key,
          productId: product.id,
          name: product.name,
          image: product.images[0],
          price: product.price,
          mrp: product.mrp,
          size,
          color,
          qty,
          selected: true
        }
      ];
    });
  };

  const removeLine = (key) => setLines((prev) => prev.filter((l) => l.key !== key));
  const setQty = (key, qty) =>
    setLines((prev) => prev.map((l) => (l.key === key ? { ...l, qty: Math.max(1, qty) } : l)));
  const toggleSelected = (key) =>
    setLines((prev) => prev.map((l) => (l.key === key ? { ...l, selected: !l.selected } : l)));
  const selectAll = () => setLines((prev) => prev.map((l) => ({ ...l, selected: true })));
  const deselectAll = () => setLines((prev) => prev.map((l) => ({ ...l, selected: false })));
  const clearCart = () => setLines([]);
  const clearSelected = () => setLines((prev) => prev.filter((l) => !l.selected));

  const totals = useMemo(() => {
    const selectedLines = lines.filter((l) => l.selected);
    const itemCount = selectedLines.reduce((s, l) => s + l.qty, 0);
    const subtotal = selectedLines.reduce((s, l) => s + l.price * l.qty, 0);
    const mrpTotal = selectedLines.reduce((s, l) => s + (l.mrp || l.price) * l.qty, 0);
    const savings = Math.max(0, mrpTotal - subtotal);
    const shipping = subtotal === 0 || subtotal >= 1499 ? 0 : 79;
    const tax = Math.round(subtotal * 0.05);
    const total = subtotal + shipping + tax;
    return { itemCount, subtotal, mrpTotal, savings, shipping, tax, total, selectedLines };
  }, [lines]);

  const cartCount = lines.reduce((s, l) => s + l.qty, 0);

  return (
    <CartContext.Provider
      value={{
        lines,
        cartCount,
        addToCart,
        removeLine,
        setQty,
        toggleSelected,
        selectAll,
        deselectAll,
        clearCart,
        clearSelected,
        totals
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => useContext(CartContext);
