import { useState } from 'react';
import css from './TodayListModal.module.css';
import Icon from "../Svg/Svg";
// import { ReactComponent as CloseIcon } from '../../public/svg/x.svg';

export default function TodayListModal({ onClose, onSave }) {
  const [waterAmount, setWaterAmount] = useState(50);
  const [time, setTime] = useState('07:00');
  const [value, setValue] = useState(waterAmount);

  const handleIncrement = () => {
    setWaterAmount((prev) => prev + 50);
  };

  const handleDecrement = () => {
    setWaterAmount((prev) => (prev > 50 ? prev - 50 : prev));
  };

  const handleSave = () => {
    onSave(waterAmount);
  };

  return (
    <div className={css.modalOverlay}>
      <div className={css.modalContainer}>
        <div className={css.modalHeader}>
          <h2 className={css.modalTitle}>Add water</h2>
          <button className={css.closeButton} onClick={onClose} aria-label="Close">
            <Icon
              name="x"
              // color="#2f2f2f"
              className={css.icon}
            />
            {/* <svg>
          <use href="../../public/svg/x.svg" alt="Add Icon" className={css.icon}></use>
          </svg> */}
          </button>
        </div>
        <div className={css.inputGroup}>
          <label htmlFor="amount">Choose a value:</label>
          <h3>Amount of water</h3>
          <div className={css.stepper}>
            <button onClick={handleDecrement} aria-label="Decrease water amount">-</button>
            <span>{waterAmount} ml</span>
            <button onClick={handleIncrement} aria-label="Increase water amount">+</button>
          </div>
        </div>
        <div className={css.inputGroup}>
          <label htmlFor="time" className={css.inputTime}>Recording time:</label>
          <input
            type="time"
            id="time"
            name="time"
            defaultValue="07:00"
            onChange={(e) => setTime(e.target.value)} />
        </div>
        <div className={css.inputGroup}>
          <label htmlFor="value" className={css.inputValue}>Enter the value of the water used:</label>
          <input
            type="number"
            id="value"
            name="value"
            value={waterAmount}
            readOnly
          />
        </div>
        <div className={css.modalActions}>
          <span className={css.waterAmountLabel}>{waterAmount} ml</span>
          <button className={css.saveButton} onClick={handleSave}>
            Save
          </button>
        </div>
      </div>
    </div>
  );
}