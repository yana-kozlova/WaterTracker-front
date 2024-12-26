import { useEffect, useState } from "react";
import Icon from "../Svg/Svg.jsx";
import css from "./WaterRatioPanel.module.css";
import AddWater from "../TodayWaterList/AddWater/AddWater.jsx";
import { selectMonthItem } from "../../redux/water/selectors.js";
import { useSelector, useDispatch } from "react-redux";
import { getMonthWater } from "../../redux/water/operations.js";

export default function WaterRatioPanel() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getMonthWater());
  }, [dispatch]);

  const today = new Date();
  const monthStats = useSelector(selectMonthItem);
  const todayId = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, "0")}-${String(today.getDate()).padStart(2, "0")}`;

  const progress = monthStats.find((item) => item._id === todayId)?.progress;

  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <div className={css.ratioContainer}>
      <p className={css.panelHeader}>Today</p>
      <div className={css.waterRatioPanel}>
        <div className={css.sliderContainer}>
          <span className={css.sliderLabel}>0%</span>
          <input
            type="range"
            min="0"
            max="100"
            value={progress ? progress : "50"}
            className={css.slider}
          />
          <span className={css.sliderLabel}>100%</span>
          <div className={css.sliderCenterLabel}>{progress}%</div>
        </div>

        <div>
          <button className={css.addWaterButton} onClick={openModal}>
            <div className={css.addWaterButtonContainer}>
              <Icon name="plus-circleoutline" className={css.addIcon} />
              Add Water
            </div>
          </button>
        </div>
      </div>
      <AddWater isOpen={isModalOpen} onClose={closeModal} />
    </div>
  );
}
