import css from "./Header.module.css"
import Logo from "../Logo/Logo";
import UserLogo from "../UserLogo/UserLogo"

export default function Header() {
  return (
    <header className={css.header}>
      <div className={css.container}>
        <a href="#" className={css.logo}>
          <Logo />
        </a>
        <nav className={css.nav}>
          <a href="/signin" className={css.navLink}>
            Sign in
            <UserLogo  />
          </a>
        </nav>
      </div>
    </header>
  );
}