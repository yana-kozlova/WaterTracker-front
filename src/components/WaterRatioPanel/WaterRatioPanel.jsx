import { useEffect, useState } from 'react';
import Icon from '../Svg/Svg.jsx';
import css from "./WaterRatioPanel.module.css";
import TodayListModal from '../TodayListModal/TodayListModal.jsx'

export default function WaterRatioPanel() {
  const [ratio, setRatio] = useState(50);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);
  const handleSave = (waterAmount) => {
    // Логіка для обробки збереження даних
    console.log(`Збережено ${waterAmount} мл води`);
    closeModal();

  useEffect(() => {
    setRatio(50);
  }, [])
  
    return (
        <div className={css.waterRatioPanel}>
        <div className={css.panelHeader}>Today</div>
        <div className={css.sliderContainer}>
          <span className={css.sliderLabel}>0%</span>
          <input
            type="range"
            min="0"
            max="100"
            value={ratio}
            className={css.slider}
          />
          <span className={css.sliderLabel}>100%</span>
          <div className={css.sliderCenterLabel}>50%</div>
        </div>
      
        <div>
        <button className={css.addWaterButton} onClick={openModal}>
         <Icon
             name="plus-circleoutline"
             color="#000000"
             className={css.addIcon}
           />
            Add Water
        </button>
        {isModalOpen && (
        <TodayListModal onClose={closeModal} onSave={handleSave} />
        )}
        </div>
        
    </div>
  );
}
