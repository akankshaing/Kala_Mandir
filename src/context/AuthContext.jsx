import React, { createContext, useContext, useEffect, useState } from "react";

const STORAGE_KEY = "kalamandir_account_v1";
const AuthContext = createContext(null);

function loadInitial() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) return JSON.parse(raw);
  } catch {
  }
  return { user: null, addresses: [] };
}

export function AuthProvider({ children }) {
  const [state, setState] = useState(loadInitial);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch {
    }
  }, [state]);

  const login = (name, email) => setState((s) => ({ ...s, user: { name, email } }));
  const logout = () => setState((s) => ({ ...s, user: null }));

  const addAddress = (address) =>
    setState((s) => ({ ...s, addresses: [...s.addresses, { ...address, id: Date.now() }] }));
  const removeAddress = (id) =>
    setState((s) => ({ ...s, addresses: s.addresses.filter((a) => a.id !== id) }));

  return (
    <AuthContext.Provider value={{ ...state, login, logout, addAddress, removeAddress }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
