import css from './Footer.module.css';

// TODO does we need that?

export default function Footer() {
  return (
    <footer className={css.footer}>
      <div className={css.container}>
        <p>&copy; 2024 Tracker of Water. All rights reserved.</p>
      </div>
    </footer>
  );
}