import React, { createContext, useContext, useEffect, useState } from "react";
import { PRODUCTS as SEED_PRODUCTS } from "../data/products.js";

const STORAGE_KEY = "kalamandir_products_v1";
const ProductContext = createContext(null);

function loadInitial() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) return JSON.parse(raw);
  } catch {
  }
  return SEED_PRODUCTS;
}

export function ProductProvider({ children }) {
  const [products, setProducts] = useState(loadInitial);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(products));
    } catch {
    }
  }, [products]);

  const addProduct = (product) => {
    const id = product.id || `KM-${Date.now()}`;
    setProducts((prev) => [{ ...product, id, createdAt: new Date().toISOString() }, ...prev]);
    return id;
  };

  const updateProduct = (id, patch) => {
    setProducts((prev) => prev.map((p) => (p.id === id ? { ...p, ...patch } : p)));
  };

  const deleteProduct = (id) => {
    setProducts((prev) => prev.filter((p) => p.id !== id));
  };

  const resetToSeed = () => setProducts(SEED_PRODUCTS);

  return (
    <ProductContext.Provider value={{ products, addProduct, updateProduct, deleteProduct, resetToSeed }}>
      {children}
    </ProductContext.Provider>
  );
}

export const useProducts = () => useContext(ProductContext);
