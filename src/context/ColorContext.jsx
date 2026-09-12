import React, { createContext, useContext, useEffect, useState } from "react";
import { DEFAULT_COLOR_PALETTE } from "../data/colorPalette.js";

const STORAGE_KEY = "kalamandir_colors_v1";
const ColorContext = createContext(null);

function loadInitial() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const saved = JSON.parse(raw);
      const savedNames = new Set(saved.map((c) => c.name.toLowerCase()));
      const missingDefaults = DEFAULT_COLOR_PALETTE.filter((c) => !savedNames.has(c.name.toLowerCase()));
      return [...saved, ...missingDefaults];
    }
  } catch {
  }
  return DEFAULT_COLOR_PALETTE;
}

export function ColorProvider({ children }) {
  const [palette, setPalette] = useState(loadInitial);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(palette));
    } catch {
    }
  }, [palette]);

  const addColor = (name, hex) => {
    const clean = name.trim();
    if (!clean) return;
    setPalette((prev) =>
      prev.some((c) => c.name.toLowerCase() === clean.toLowerCase())
        ? prev
        : [...prev, { name: clean, hex: hex || "#7b2d3b" }]
    );
  };

  const removeColor = (name) => setPalette((prev) => prev.filter((c) => c.name !== name));

  const getHex = (name) => palette.find((c) => c.name === name)?.hex || "#cbbca0";

  return (
    <ColorContext.Provider value={{ palette, addColor, removeColor, getHex }}>
      {children}
    </ColorContext.Provider>
  );
}

export const useColors = () => useContext(ColorContext);
