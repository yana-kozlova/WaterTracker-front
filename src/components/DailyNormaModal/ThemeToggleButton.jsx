import { useTheme } from '../DarkTheme/context/ThemeContext';

const ThemeToggleButton = () => {
  const { ThemeToggle } = useTheme();

  return (
    <button onClick={ThemeToggle}>
      Перемкнути тему
    </button>
  );
};

export default ThemeToggleButton;