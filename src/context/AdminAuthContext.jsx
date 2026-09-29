import React, { createContext, useContext, useState } from "react";

const SESSION_KEY = "kalamandir_admin_session_v1";
const AdminAuthContext = createContext(null);

const DEMO_PASSCODE = "kalamandir-admin";

export function AdminAuthProvider({ children }) {
  const [isAdmin, setIsAdmin] = useState(() => sessionStorage.getItem(SESSION_KEY) === "1");

  const login = (passcode) => {
    if (passcode === DEMO_PASSCODE) {
      sessionStorage.setItem(SESSION_KEY, "1");
      setIsAdmin(true);
      return true;
    }
    return false;
  };

  const logout = () => {
    sessionStorage.removeItem(SESSION_KEY);
    setIsAdmin(false);
  };

  return (
    <AdminAuthContext.Provider value={{ isAdmin, login, logout, DEMO_PASSCODE }}>
      {children}
    </AdminAuthContext.Provider>
  );
}

export const useAdminAuth = () => useContext(AdminAuthContext);
