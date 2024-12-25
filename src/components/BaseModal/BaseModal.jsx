import css from "./BaseModal.module.css";
import Icon from "../Svg/Svg";
import ReactDOM from "react-dom";
import { useEffect } from "react";

export default function BaseModal({ isOpen, onClose, children, className }) {
    useEffect(() => {
      const handleKeyDown = (event) => {
        if (event.key === "Escape") {
          onClose();
        }
      };

      if (isOpen) {
        window.addEventListener("keydown", handleKeyDown);
      }

      return () => {
        window.removeEventListener("keydown", handleKeyDown);
      };
    }, [isOpen, onClose]);

    if (!isOpen) return null;


  if (!isOpen) return null;

  return ReactDOM.createPortal(
    <div className={css.modalOverlay} onClick={onClose}>
      <div
        className={`${css.modalContent} ${className || ""}`}
        onClick={(e) => e.stopPropagation()}
      >
        <button className={css.modalClose} onClick={onClose}>
          <Icon name="x" size={14} color="#407bff" />
        </button>
        {children}
      </div>
    </div>,
    document.body
  );
}
