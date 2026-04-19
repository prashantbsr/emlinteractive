"use client";

import { createContext, useContext, useEffect, useState } from "react";

type Theme = "light" | "dark";

interface ThemeContextValue {
  theme: Theme;
  toggle: () => void;
}

const ThemeContext = createContext<ThemeContextValue | undefined>(undefined);

function readInitialTheme(): Theme {
  if (typeof document === "undefined") return "dark";
  return document.documentElement.classList.contains("dark") ? "dark" : "light";
}

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>(readInitialTheme);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
    try {
      localStorage.setItem("eml-theme", theme);
    } catch {
      // localStorage may be unavailable (private browsing, SSR edge cases)
    }
  }, [theme]);

  const toggle = () => setTheme((t) => (t === "dark" ? "light" : "dark"));

  return (
    <ThemeContext.Provider value={{ theme, toggle }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error("useTheme must be used within ThemeProvider");
  return ctx;
}

// Inline pre-hydration script that runs before React mounts. Reads the stored
// preference (or system preference) and applies the `dark` class to <html>
// synchronously. This prevents a flash of the wrong theme on first paint.
export const themeInitScript = `
(function(){try{
var s=localStorage.getItem('eml-theme');
var d=s?s==='dark':true;
document.documentElement.classList.toggle('dark',d);
}catch(e){document.documentElement.classList.add('dark');}})();
`;
