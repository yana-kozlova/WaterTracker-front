import css from "./Button.module.css";

export default function Button({ type, name, className, onClick }) {
  return (
    <button
      type={type}
      className={`${css.baseButton} ${className || ""}`}
      onClick={onClick}
    >
      {name}
    </button>
  );
}
