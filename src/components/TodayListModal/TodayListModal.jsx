import React, { useState } from 'react';
import css from './TodayListModal.module.css';

const TodayListModal = ({ onClose, onSave }) => {
  const [waterAmount, setWaterAmount] = useState(50);

  const handleIncrement = () => {
    setWaterAmount(prev => prev + 50);
  };

  const handleDecrement = () => {
    setWaterAmount(prev => (prev > 50 ? prev - 50 : prev));
  };

  const handleSave = () => {
    onSave(waterAmount);
  };

  return (
    <div className={css.modalOverlay}>
      <div className={css.modalContainer}>
        <div className={css.modalHeader}>
          <h2 className={css.modalTitle}>Add water</h2>
          <button className={css.closeButton} onClick={onClose}>X</button>
        </div>
        <div className={css.inputGroup}>
          <label htmlFor="amount">Choose a value:</label>
          <h3>Amount of water</h3>
          <div className={css.stepper}>
            <button onClick={handleDecrement}>-</button>
            <span>{waterAmount} ml</span>
            <button onClick={handleIncrement}>+</button>
          </div>
        </div>
        <div className={css.inputGroup}>
          <label htmlFor="time">Recording time:</label>
          <input type="time" id="time" name="time" defaultValue="07:00" />
        </div>
        <div className={css.inputGroup}>
          <label htmlFor="value">Enter the value of the water used:</label>
          <input type="number" id="value" name="value" defaultValue={waterAmount} />
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
};

export default TodayListModal;
