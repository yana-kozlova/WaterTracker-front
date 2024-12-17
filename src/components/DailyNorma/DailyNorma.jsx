import React, { useState } from "react";
import DailyNormaModal from "./DailyNormaModal";
import "./DailyNorma.css";

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
    <div className="daily-norma">
      <p>Запланована денна норма води: {dailyNorm} л</p>
      <button className="edit-button" onClick={handleEditClick}>
        Edit
      </button>
      {isModalOpen && (
        <DailyNormaModal currentNorm={dailyNorm} onSave={updateDailyNorm} />
      )}
    </div>
  );
};

export default DailyNorma;
