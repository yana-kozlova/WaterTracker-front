import { useEffect } from 'react';
import PropTypes from 'prop-types';
import styles from './DaysGeneralStats.module.css';

const DaysGeneralStats = ({
  selectedDate, dailyNorma, progress, portions, onClose,
}) => {
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    const handleOutsideClick = (e) => {
      if (e.target === e.currentTarget) {
        onClose();
      }
    };

    document.addEventListener('keydown', handleEsc);
    document.addEventListener('click', handleOutsideClick);

    return () => {
      document.removeEventListener('keydown', handleEsc);
      document.removeEventListener('click', handleOutsideClick);
    };
  }, [onClose]);

  return (<div className={styles.overlay}>
    <div className={styles.modal}>
      <ul className={styles.list}>
        <li>
          <span className={styles.value}>{selectedDate}</span>
        </li>
        <li>
          <span className={styles.label}>Daily Norm:</span>
          <span className={styles.value}>{dailyNorma} L</span>
        </li>
        <li>
          <span className={styles.label}>Fulfillment of the daily norm:</span>
          <span className={styles.value}>
            {progress}%
          </span>
        </li>
        <li>
          <span className={styles.label}>How many servings of water:</span>
          <span className={styles.value}>{portions}</span>
        </li>
      </ul>
    </div>
  </div>);
};

DaysGeneralStats.propTypes = {
  selectedDate: PropTypes.instanceOf(Date), // Необов'язковий
  dailyNorma: PropTypes.number.isRequired,
  progress: PropTypes.number.isRequired,
  portions: PropTypes.number.isRequired,
  onClose: PropTypes.func.isRequired, // Функція для закриття модалки
};

DaysGeneralStats.defaultProps = {
  selectedDate: new Date(), // Якщо не передано selectedDate, використовуємо поточну дату
};

export default DaysGeneralStats;
