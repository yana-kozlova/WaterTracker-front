import { useState, useRef, useEffect } from "react";
import css from "./DayComponent.module.css";
import DaysGeneralStats from "../DaysGeneralStats/DaysGeneralStats";

export default function DayComponent({
  calendarRef,
  day,
  dayLabel,
  waterStats,
}) {
  const [isModalOpen, setIsModalOpen] = useState(false); // відображення модального вікна.
  const dayRef = useRef(null); //для обробки кліків поза модальним вікном

  const handleClick = (event) => {
    if (dayRef.current && !dayRef.current.contains(event.target)) {
      setIsModalOpen(false);
    }
  }; //Закриваємо модальне вікно, якщо користувач клацає поза його межами.

  useEffect(() => {
    document.addEventListener("click", handleClick);
    return () => {
      document.removeEventListener("click", handleClick);
    };
  }, []);

  const toggleModalVisibility = () => {
    setIsModalOpen((prevState) => !prevState); //видимості модального вікна
  };

  // console.log(waterStats)
  return (
    <div className={css.wrapperDay}>
      {isModalOpen && (
        <DaysGeneralStats
          selectedDate={dayLabel}
          dailyNorma={waterStats?.dailyNorma / 1000 || 0}
          progress={waterStats?.progress || 0}
          portions={waterStats?.totalServings || 0}
          calendarRef={calendarRef}
          refData={dayRef}
          closeModal={() => setIsModalOpen(false)}
        />
      )}
      <div
        className={`${css.day} ${waterStats?.progress < 100 ? css.incomplete : css.complete
          }`}
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



//   const toggleModalVisibility = () => {
//   if (!isModalOpen) {
//     const dayRect = dayRef.current.getBoundingClientRect(); // Отримуємо позицію дня
//     const isMobile = window.innerWidth <= 768;

//     if (isMobile) {
//       setModalPosition({ top: "10%", left: "50%", transform: "translateX(-50%)" });
//     } else {
//       const modalTop = dayRect.top - 195; // Розташування по центру відносно дня
//       const modalLeft =
//         dayRect.left + dayRect.width / 2 > window.innerWidth / 2
//           ? dayRect.left - 140
//           : dayRect.right + 60;

//       setModalPosition({ top: `${modalTop}px`, left: `${modalLeft}px`, transform: "none" });
//     }
//   }

//     setIsModalOpen((prevState) => !prevState); // Видимості модального вікна
//   };
