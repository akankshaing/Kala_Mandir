import React, { createContext, useContext, useEffect, useState } from "react";

const STORAGE_KEY = "kalamandir_reviews_v1";
const ReviewContext = createContext(null);

function loadInitial() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) return JSON.parse(raw);
  } catch {
  }
  return {};
}

export function ReviewProvider({ children }) {
  const [byProduct, setByProduct] = useState(loadInitial);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(byProduct));
    } catch {
    }
  }, [byProduct]);

  const addReview = (productId, review) => {
    const entry = { id: `user-${Date.now()}`, date: new Date().toISOString(), ...review };
    setByProduct((prev) => ({ ...prev, [productId]: [entry, ...(prev[productId] || [])] }));
  };

  const getReviews = (productId) => byProduct[productId] || [];

  return (
    <ReviewContext.Provider value={{ addReview, getReviews }}>
      {children}
    </ReviewContext.Provider>
  );
}

export const useReviews = () => useContext(ReviewContext);
