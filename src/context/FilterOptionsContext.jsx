import React, { createContext, useContext, useEffect, useState } from "react";
import {
  FABRICS,
  OCCASIONS,
  PATTERNS,
  SLEEVES,
  NECKS,
  FITS,
  LENGTHS,
  COLLECTIONS
} from "../data/filterOptions.js";

const STORAGE_KEY = "kalamandir_filter_options_v1";
const FilterOptionsContext = createContext(null);

const DEFAULTS = {
  fabrics: FABRICS,
  patterns: PATTERNS,
  occasions: OCCASIONS,
  sleeves: SLEEVES,
  necks: NECKS,
  fits: FITS,
  lengths: LENGTHS,
  collections: COLLECTIONS
};

function mergeWithDefaults(saved) {
  const merged = {};
  Object.keys(DEFAULTS).forEach((key) => {
    const savedList = Array.isArray(saved?.[key]) ? saved[key] : [];
    const savedLower = new Set(savedList.map((v) => v.toLowerCase()));
    const missingDefaults = DEFAULTS[key].filter((v) => !savedLower.has(v.toLowerCase()));
    merged[key] = [...savedList, ...missingDefaults];
  });
  return merged;
}

function loadInitial() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) return mergeWithDefaults(JSON.parse(raw));
  } catch {
  }
  return mergeWithDefaults(null);
}

export function FilterOptionsProvider({ children }) {
  const [options, setOptions] = useState(loadInitial);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(options));
    } catch {
    }
  }, [options]);

  const addOption = (field, value) => {
    const clean = (value || "").trim();
    if (!clean) return;
    setOptions((prev) => {
      const list = prev[field] || [];
      if (list.some((v) => v.toLowerCase() === clean.toLowerCase())) return prev;
      return { ...prev, [field]: [...list, clean] };
    });
    return clean;
  };

  const removeOption = (field, value) => {
    setOptions((prev) => ({ ...prev, [field]: (prev[field] || []).filter((v) => v !== value) }));
  };

  return (
    <FilterOptionsContext.Provider value={{ options, addOption, removeOption }}>
      {children}
    </FilterOptionsContext.Provider>
  );
}

export const useFilterOptions = () => useContext(FilterOptionsContext);
