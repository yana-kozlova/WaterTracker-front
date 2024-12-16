import css from "./Header.module.css";
import Logo from "../Logo/Logo";
import UserLogo from "../UserLogo/UserLogo";
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
        {/* <a href="#" className={css.logo}>
          <Logo />
        </a>
        <nav className={css.nav}>
          <a href="/signin" className={css.navLink}>
            Sign in
            <UserLogo />
          </a>
        </nav> */}
      </div>
    </header>
  );
}
