import React from "react";
import PropTypes from "prop-types";
import styles from "./DaysGeneralStats.module.css";

const DaysGeneralStats = ({
  selectedDate,
  dailyNorm,
  consumedWater,
  portions,
}) => {
  const formatDate = (date) => {
    const months = [
      "січня",
      "лютого",
      "березня",
      "квітня",
      "травня",
      "червня",
      "липня",
      "серпня",
      "вересня",
      "жовтня",
      "листопада",
      "грудня",
    ];
    const day = date.getDate();
    const month = months[date.getMonth()];
    return `${day} ${month}`;
  };

  const calculateCompletionPercentage = () => {
    if (dailyNorm === 0) return "0%";
    return `${Math.min(((consumedWater / dailyNorm) * 100).toFixed(0), 100)}%`;
  };

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <button
          className={styles.closeButton}
          onClick={() => window.dispatchEvent(new Event("closeModal"))}
        >
          ×
        </button>
        <h2 className={styles.title}>Статистика дня</h2>
        <ul className={styles.list}>
          <li>
            <span className={styles.label}>Дата:</span>
            <span className={styles.value}>{formatDate(selectedDate)}</span>
          </li>
          <li>
            <span className={styles.label}>Денна норма:</span>
            <span className={styles.value}>{dailyNorm} л</span>
          </li>
          <li>
            <span className={styles.label}>Виконання денної норми:</span>
            <span className={styles.value}>
              {calculateCompletionPercentage()}
            </span>
          </li>
          <li>
            <span className={styles.label}>Кількість порцій води:</span>
            <span className={styles.value}>{portions}</span>
          </li>
        </ul>
      </div>
    </div>
  );
};

DaysGeneralStats.propTypes = {
  selectedDate: PropTypes.instanceOf(Date).isRequired,
  dailyNorm: PropTypes.number.isRequired,
  consumedWater: PropTypes.number.isRequired,
  portions: PropTypes.number.isRequired,
};

export default DaysGeneralStats;
