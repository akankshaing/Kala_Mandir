import React, { createContext, useContext, useEffect, useState } from "react";

const STORAGE_KEY = "kalamandir_account_v1";
const AuthContext = createContext(null);

function loadInitial() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      return {
        user: parsed.user || null,
        addresses: Array.isArray(parsed.addresses) ? parsed.addresses : [],
        accounts: Array.isArray(parsed.accounts) ? parsed.accounts : []
      };
    }
  } catch {
  }
  return { user: null, addresses: [], accounts: [] };
}

async function hashPassword(password, email) {
  const data = new TextEncoder().encode(`kalamandir:${email}:${password}`);
  const buf = await crypto.subtle.digest("SHA-256", data);
  return Array.from(new Uint8Array(buf)).map((b) => b.toString(16).padStart(2, "0")).join("");
}

export function AuthProvider({ children }) {
  const [state, setState] = useState(loadInitial);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch {
    }
  }, [state]);

  const emailExists = (email) => state.accounts.some((a) => a.email === email.trim().toLowerCase());

  // Returns { ok: true } or { ok: false, error }
  const signup = async (name, email, password) => {
    const mail = email.trim().toLowerCase();
    if (state.accounts.some((a) => a.email === mail)) {
      return { ok: false, error: "An account with this email already exists. Please sign in." };
    }
    const hash = await hashPassword(password, mail);
    setState((s) => ({
      ...s,
      accounts: [...s.accounts, { name: name.trim(), email: mail, hash }],
      user: { name: name.trim(), email: mail }
    }));
    return { ok: true };
  };

  const signin = async (email, password) => {
    const mail = email.trim().toLowerCase();
    const account = state.accounts.find((a) => a.email === mail);
    if (!account) return { ok: false, error: "No account found with this email. Please create one." };
    const hash = await hashPassword(password, mail);
    if (hash !== account.hash) return { ok: false, error: "Incorrect password. Please try again." };
    setState((s) => ({ ...s, user: { name: account.name, email: account.email } }));
    return { ok: true };
  };

  const logout = () => setState((s) => ({ ...s, user: null }));

  const addAddress = (address) =>
    setState((s) => ({ ...s, addresses: [...s.addresses, { ...address, id: Date.now() }] }));
  const removeAddress = (id) =>
    setState((s) => ({ ...s, addresses: s.addresses.filter((a) => a.id !== id) }));

  return (
    <AuthContext.Provider value={{ user: state.user, addresses: state.addresses, signup, signin, emailExists, logout, addAddress, removeAddress }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
