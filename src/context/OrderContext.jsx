import React, { createContext, useContext, useEffect, useState } from "react";

const STORAGE_KEY = "kalamandir_orders_v1";
const OrderContext = createContext(null);

export const DELIVERY_STAGES = ["Order placed", "Packed", "Shipped", "Out for delivery", "Delivered"];

function loadInitial() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) return JSON.parse(raw);
  } catch {
  }
  return [];
}

export function OrderProvider({ children }) {
  const [orders, setOrders] = useState(loadInitial);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(orders));
    } catch {
    }
  }, [orders]);

  const placeOrder = (order) => {
    const id = `ORD-${Date.now().toString().slice(-8)}`;
    const ticketNumber = `KM-TCK-${Math.floor(100000 + Math.random() * 900000)}`;
    const newOrder = {
      ...order,
      id,
      ticketNumber,
      status: DELIVERY_STAGES[0],
      createdAt: new Date().toISOString()
    };
    setOrders((prev) => [newOrder, ...prev]);
    return newOrder;
  };

  const updateStatus = (id, status) =>
    setOrders((prev) => prev.map((o) => (o.id === id ? { ...o, status } : o)));

  return (
    <OrderContext.Provider value={{ orders, placeOrder, updateStatus }}>
      {children}
    </OrderContext.Provider>
  );
}

export const useOrders = () => useContext(OrderContext);
