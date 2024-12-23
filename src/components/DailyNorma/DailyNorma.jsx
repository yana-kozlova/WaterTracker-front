import { useState } from "react";
import DailyNormaModal from "../DailyNormaModal/DailyNormaModal";
import styles from "./DailyNorma.module.css";

const DailyNorma = () => {
  const [dailyNorm, setDailyNorm] = useState(2.0); // Початкове значення: 2.0 літри
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleEditClick = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const updateDailyNorm = (newNorm) => {
    setDailyNorm(newNorm);
    closeModal();
  };

  return (
    <div className={styles["daily-norma"]}>
      <p className={styles["daily-norma-p"]}>My daily norma </p>
      <div className={styles["edit-container"]}>
        <p className={styles["daily-norma-l"]}>{dailyNorm} L</p>
        <button className={styles["edit-button"]} onClick={handleEditClick}>
          Edit
        </button>
        {isModalOpen && (
          <DailyNormaModal currentNorm={dailyNorm} onSave={updateDailyNorm} />
        )}
      </div>
    </div>
  );
};

export default DailyNorma;
