import { useTheme } from "../../context/ThemeContext"; // шлях до вашого контексту
import css from "./ThemeToggleButton.module.css";

const ThemeToggleButton = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <div
      className={`${css.slider} ${
        theme === "dark" ? css["slider--dark"] : css["slider--light"]
      }`}
      onClick={toggleTheme}
    >
      <span className={css.thumb}>
        <span className={css.knob}>
          <span className={css.centralKnob}>.
        </span>
        </span>
      </span>
    </div>
  );
};

export default ThemeToggleButton;