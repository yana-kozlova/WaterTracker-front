import { useState, useRef, useEffect } from "react";
import css from './DayComponent.module.css';
import DaysGeneralStats from '../DaysGeneralStats/DaysGeneralStats'



export default function DayComponent({ calendarRef, day, waterPercent }) {
    const [isModalOpen, setIsModalOpen] = useState(false) // відображення модального вікна.
    const dayRef = useRef(null); //для обробки кліків поза модальним вікном

    const handleClick = (event) => {
    if (dayRef.current && !dayRef.current.contains(event.target)) {
      setIsModalOpen(false);
    }
    }; //Закриваємо модальне вікно, якщо користувач клацає поза його межами.
    
    useEffect(() => {
    document.addEventListener('click', handleClick);
    return () => {
      document.removeEventListener('click', handleClick);
    };
    }, []); 
    
    const toggleModalVisibility = () => {
    setIsModalOpen((prevState) => !prevState); //видимості модального вікна
    };
    

    return (
        <div className={css.wrapperDay}>
            {isModalOpen && (
                <DaysGeneralStats
                    day={day}
                    waterPercent={waterPercent}
                    calendarRef={calendarRef}
                    refData={dayRef}
                    closeModal={() => setIsModalOpen(false)}
                />
            )}
            <div
                className={`${css.day} ${waterPercent < 100 ? css.incomplete : css.complete}`}
                onClick={toggleModalVisibility}
                ref={dayRef}
            >
                {day}
            </div>
            <div className={css.dayPercent}>
                {waterPercent ? `${Math.min(waterPercent, 100)}%` : "0%"}
            </div>
        </div>
  );
};