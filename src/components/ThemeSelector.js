import styles from "./ThemeSelector.module.css";
import { useThemeContext } from "../hooks/useThemeContext";

const themeColors = ["#effaf0", "#249c6b", "#b70233"];

const ThemeSelector = () => {
  const { changeColor } = useThemeContext();

  return (
    <div className={styles["theme-selector"]}>
      <div className={styles["theme-buttons"]}>
        {themeColors.map((color) => (
          <div
            key={color}
            style={{ backgroundColor: color }}
            onClick={() => changeColor(color)}
          />
        ))}
      </div>
    </div>
  );
};

export default ThemeSelector;
