import { useContext } from "react";
import { ThemeContext } from "../context/ThemeContext";

export const useThemeContext = () => {
  const context = useContext(ThemeContext);

  if (!context) {
    throw new Error(
      "useThemeContext() needs to be inside of a ThemeContextProvider."
    );
  }

  return context;
};
