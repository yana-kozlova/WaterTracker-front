import { useEffect } from "react";
import PropTypes from "prop-types";
import styles from "./DaysGeneralStats.module.css";

const DaysGeneralStats = ({
  selectedDate,
  dailyNorm,
  consumedWater,
  portions,
  onClose, // Функція для закриття модалки
}) => {
  // Якщо selectedDate не передано, використовуємо поточну дату
  // const dateToDisplay = selectedDate || new Date();

  // Форматування дати у вигляді "5, April"
  const formatDate = (date) => {
    const months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    const day = date.getDate();
    const month = months[date.getMonth()];
    return `${day}`, `${month}`;
  };

  // Обчислення виконання денної норми
  const calculateCompletionPercentage = () => {
    if (dailyNorm === 0) return "0%";
    return `${Math.min(((consumedWater / dailyNorm) * 100).toFixed(0), 100)}%`;
  };

  // Закриваємо модалку при натисканні на поле за нею або на клавішу ESC
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    const handleOutsideClick = (e) => {
      if (e.target === e.currentTarget) {
        onClose();
      }
    };

    document.addEventListener("keydown", handleEsc);
    document.addEventListener("click", handleOutsideClick);

    return () => {
      document.removeEventListener("keydown", handleEsc);
      document.removeEventListener("click", handleOutsideClick);
    };
  }, [onClose]);

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <ul className={styles.list}>
          <li>
            <span className={styles.value}>{selectedDate}</span>
          </li>
          <li>
            <span className={styles.label}>Daily Norm:</span>
            <span className={styles.value}>{dailyNorm} L</span>
          </li>
          <li>
            <span className={styles.label}>Fulfillment of the daily norm:</span>
            <span className={styles.value}>
              {calculateCompletionPercentage()}
            </span>
          </li>
          <li>
            <span className={styles.label}>How many servings of water:</span>
            <span className={styles.value}>{portions}</span>
          </li>
        </ul>
      </div>
    </div>
  );
};

DaysGeneralStats.propTypes = {
  selectedDate: PropTypes.instanceOf(Date), // Необов'язковий
  dailyNorm: PropTypes.number.isRequired,
  consumedWater: PropTypes.number.isRequired,
  portions: PropTypes.number.isRequired,
  onClose: PropTypes.func.isRequired, // Функція для закриття модалки
};

DaysGeneralStats.defaultProps = {
  selectedDate: new Date(), // Якщо не передано selectedDate, використовуємо поточну дату
};

export default DaysGeneralStats;
