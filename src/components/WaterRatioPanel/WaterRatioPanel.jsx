import React, { useState } from "react";
import css from "./WaterRatioPanel.module.css";
// import Icon from "../../Svg/Svg.jsx";
// import { ReactComponent as AddIcon } from "../../assets/images/outline.svg";

export default function WaterRatioPanel() {
  const [ratio, setRatio] = useState(50);

  const handleSliderChange = (e) => {
    setRatio(e.target.value);
  };
  
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
            onChange={handleSliderChange}
            className={css.slider}
          />
          <span className={css.sliderLabel}>100%</span>
          <div className={css.sliderCenterLabel}>50%</div>
        </div>
      
        <div>
        <button className={css.addWaterButton}>
        {/* <Icon */}
            {/* name="plus-circleoutline" */}
            {/* // color="#2f2f2f" */}
            {/* className={css.addIcon} */}
          {/* /> */}
            {/* <AddIcon /> */}
            Add Water
        </button>
        </div>
        
    </div>
  );
}
