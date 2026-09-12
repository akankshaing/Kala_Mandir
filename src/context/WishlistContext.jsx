import React, { createContext, useContext, useEffect, useState } from "react";

const STORAGE_KEY = "kalamandir_wishlist_v1";
const WishlistContext = createContext(null);

function loadInitial() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) return JSON.parse(raw);
  } catch {
  }
  return [];
}

export function WishlistProvider({ children }) {
  const [ids, setIds] = useState(loadInitial);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(ids));
    } catch {
    }
  }, [ids]);

  const isWishlisted = (id) => ids.includes(id);
  const toggleWishlist = (id) =>
    setIds((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]));

  return (
    <WishlistContext.Provider value={{ ids, isWishlisted, toggleWishlist }}>
      {children}
    </WishlistContext.Provider>
  );
}

export const useWishlist = () => useContext(WishlistContext);
