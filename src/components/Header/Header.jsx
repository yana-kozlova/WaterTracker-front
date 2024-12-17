import css from "./Header.module.css";
import Logo from "../Logo/Logo";
import UserLogo from "../UserLogo/UserLogo";
import UserLogoModal from "../UserLogoModal/UserLogoModal";

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
            <UserLogo />
          </a>
          <UserLogoModal/>
        </nav>
      </div>
    </header>
  );
}
