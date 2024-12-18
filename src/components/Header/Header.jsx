import css from "./Header.module.css";
import Logo from "../Logo/Logo";
import { Link } from "react-router-dom";
import Navigation from "../Navigation/Navigation";
import Container from "../../Container/Container";

export default function Header() {
  return (
    <header className={css.header}>
      <Container className={css.containerRow}>
        <Link to="/welcome">
          <Logo />
        </Link>
        <Navigation />
      </Container>
    </header>
  );
}
