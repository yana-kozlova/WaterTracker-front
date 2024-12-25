import { useState, useRef, useEffect } from "react";
import css from "./DayComponent.module.css";
import DaysGeneralStats from "../DaysGeneralStats/DaysGeneralStats";

export default function DayComponent({
  calendarRef,
  day,
  dayLabel,
  waterStats,
}) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalPosition, setModalPosition] = useState({
    top: "0px",
    left: "0px",
    transform: "none",
  });
  const dayRef = useRef(null);

  const handleClick = (event) => {
    if (dayRef.current && !dayRef.current.contains(event.target)) {
      setIsModalOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClick);
    return () => {
      document.removeEventListener("click", handleClick);
    };
  }, []);

  const toggleModalVisibility = () => {
    if (!isModalOpen) {
      if (!dayRef.current || !calendarRef?.current) {
        console.warn("References are not yet set.");
        return;
      }

      const dayRect = dayRef.current.getBoundingClientRect();
      const calendarRect = calendarRef.current.getBoundingClientRect();
      const isMobile = calendarRef.current.clientWidth <= 425;
      const modalWidth = 292;
      const modalHeight = 188;

      let top, left, transform;

      if (isMobile) {
        top = dayRect.top - calendarRect.top - modalHeight - 10;
        left = "50%";
        transform = "none";
      } else {
        top = dayRect.top - calendarRect.top - modalHeight - 10;

        left = dayRect.left - calendarRect.left + dayRect.width / 2 - modalWidth / 2;

        if (left + modalWidth > calendarRect.width) {
          left = calendarRect.width - modalWidth + 18;
        }

        if (left < 0) {
          left = left + modalWidth / 2 - 18; // Якщо попап виходить за ліву межу, коригуємо значення left
        }
      }

      setModalPosition({ top: `${top}px`, left: `${left}px`, transform: transform || "none" });
    }

    setIsModalOpen((prevState) => !prevState); // Тогл видимості модального вікна
  };

  return (
    <div className={css.wrapperDay}>
      {isModalOpen && (
        <DaysGeneralStats
          selectedDate={dayLabel}
          dailyNorma={waterStats?.dailyNorma / 1000 || 0}
          progress={waterStats?.progress || 0}
          portions={waterStats?.totalServings || 0}
          modalPosition={modalPosition}
          onClose={() => setIsModalOpen(false)}
        />
      )}
      <div
        className={`${css.day} ${waterStats?.progress < 100 ? css.incomplete : css.complete}`}
        onClick={toggleModalVisibility}
        ref={dayRef}
      >
        {day}
      </div>
      <div className={css.dayPercent}>
        {waterStats?.progress ? `${Math.min(waterStats.progress, 100)}%` : "0%"}
      </div>
    </div>
  );
}




