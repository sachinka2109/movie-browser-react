import React, { createContext, useContext, useEffect, useState } from "react";

const ThemeContext = createContext();

export const useTheme = () => {
  return useContext(ThemeContext);
};

const ThemeProvider = ({ children }) => {
  const pageTheme = localStorage.getItem("theme");
  const [theme, setTheme] = useState(pageTheme ? pageTheme : "light");

  const toggleTheme = () => {
    theme === "light"
      ? setTheme("dark") && localStorage.setItem("theme", "dark")
      : setTheme("light") && localStorage.setItem("theme", "light");
  };

  useEffect(() => {
    localStorage.setItem("theme", theme);
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <div data-theme={theme}>{children}</div>
    </ThemeContext.Provider>
  );
};

export default ThemeProvider;
