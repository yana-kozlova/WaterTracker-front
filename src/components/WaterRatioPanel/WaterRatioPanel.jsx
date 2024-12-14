import React, { useState } from "react";
import css from "./WaterRatioPanel.module.css";
import { ReactComponent as AddIcon } from "../../assets/images/outline.svg";

export default function WaterRatioPanel() {
const [ratio, setRatio] = useState(50);

const handleSliderChange = (e) => {
    setRatio(e.target.value);
  };
  
    return (
        <div className="water-ratio-panel">
        <div className="panel-header">Today</div>
        <div className="slider-container">
          <span className="slider-label">0%</span>
          <input
            type="range"
            min="0"
            max="100"
            value={ratio}
            onChange={handleSliderChange}
            className="slider"
          />
          <span className="slider-label">100%</span>
        </div>
        <button className="add-water-button">
            <AddIcon />
            Add Water
        </button>
      </div>
    );
}