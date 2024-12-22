import { useTheme } from "../../context/ThemeContext";
import lightModeIcon from "../../assets/moon.svg";
import darkModeIcon from "../../assets/sun.svg";

const ThemeToggleButton = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <button onClick={toggleTheme} className="theme-toggle-btn">
      <img src={theme === "light" ? lightModeIcon : darkModeIcon} alt="Toggle Theme" />
    </button>
  );
};

export default ThemeToggleButton;