import React, { useState } from "react";
import BaseModal from "./BaseModal";
import styles from "./DailyNorma.module.css";

const DailyNorma = () => {
  const [dailyNorm, setDailyNorm] = useState(2.0); // мінімальна норма 2л
  const [isModalOpen, setIsModalOpen] = useState(true);
  const [newNorm, setNewNorm] = useState(dailyNorm);

  const handleEditClick = () => {
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setNewNorm(dailyNorm);
  };

  const handleSave = () => {
    setDailyNorm(newNorm);
    setIsModalOpen(false);
  };

  return (
    <div className={styles.container}>
      <div className={styles.info}>
        <h2>Your Daily Water Intake</h2>
        <p>{dailyNorm} liters</p>
      </div>
      <button className={styles.editButton} onClick={handleEditClick}>
        Edit
      </button>
      <BaseModal isOpen={isModalOpen} onClose={handleModalClose}>
        <div className={styles.modalContent}>
          <h3>Edit Daily Water Intake</h3>
          <input
            type="number"
            value={newNorm}
            onChange={(e) => setNewNorm(parseFloat(e.target.value) || 0)}
            className={styles.input}
            min="0"
          />
          <div className={styles.modalActions}>
            <button className={styles.saveButton} onClick={handleSave}>
              Save
            </button>
            <button className={styles.cancelButton} onClick={handleModalClose}>
              Cancel
            </button>
          </div>
        </div>
      </BaseModal>
    </div>
  );
};

export default DailyNorma;
