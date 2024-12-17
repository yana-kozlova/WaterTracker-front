import css from "./BaseModal.module.css";
import Icon from "../Svg/Svg";

export default function BaseModal({ isOpen, onClose, children, className }) {
  if (!isOpen) return null;

  return (
    <div className={css.modalOverlay} onClick={onClose}>
      <div
        className={`${css.modalContent} ${className || ""}`}
        onClick={(e) => e.stopPropagation()}
      >
        <button className={css.modalClose} onClick={onClose}>
          <Icon name="icon-close" size={14} color="#407bff" />
        </button>
        {children}
      </div>
    </div>
  );
}
