import css from "./Header.module.css";

export default function Header() {
  return (
    <div div>
      <header class="header">
        <div class="container">
          <a href="#" class="logo">
            Tracker of Water
          </a>
          <nav class="nav">
            <a href="/signin" class="nav-link">
              Sign in
            </a>
          </nav>
        </div>
      </header>
    </div>
  );
}
