import css from "./Header.module.css";
import Logo from "../Logo/Logo";
import { Link } from "react-router-dom";
import Navigation from "../Navigation/Navigation";

export default function Header() {
  return (
    <header className={css.header}>
      <div className={css.container}>
        <Link to="/welcome">
          <Logo />
        </Link>
        <Navigation />
      </div>
    </header>
  );
}
