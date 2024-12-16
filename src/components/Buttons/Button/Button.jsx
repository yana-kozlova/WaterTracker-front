import css from "./Button.module.css";

export default function Button({ type, name, className }) {
  return (
    <button type={type} className={`${css.button} ${className || ""}`}>
      {name}
    </button>
  );
}
