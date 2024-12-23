import { useTheme } from "../../context/ThemeContext"; // шлях до вашого контексту
import styles from "./ThemeToggleButton.module.css";

const ThemeToggleButton = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <div
      className={`${styles.slider} ${
        theme === "dark" ? styles["slider--dark"] : styles["slider--light"]
      }`}
      onClick={toggleTheme}
    >
      <span className={styles.thumb}>
        <span className={styles.knob}>
          <span className={styles["central-knob"]}></span>
        </span>
      </span>
    </div>
  );
};

export default ThemeToggleButton;