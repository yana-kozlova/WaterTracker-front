import css from "./Header.module.css";
import Logo from "../Logo/Logo";
import { Link } from "react-router-dom";
import Navigation from "./Navigation/Navigation";
import Container from "../Container/Container";
import { useTheme } from "../../context/ThemeContext";
import ThemeToggleButton from "../ThemeToggle/ThemeToggleButton";

export default function Header() {
  const { theme } = useTheme();

  return (
    <header className={`${css.header} ${theme === "dark" ? css.darkHeader : css.lightHeader}`}>
      <Container className={css.containerRow}>
        <Link to="/welcome">
          <Logo />
        </Link>
        <ThemeToggleButton />
        <Navigation />
      </Container>
    </header>
  );
}
