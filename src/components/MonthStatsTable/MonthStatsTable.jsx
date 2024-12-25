import { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectMonthItem } from '../../redux/water/selectors.js';
import DayComponent from "../DayComponent/DayComponent.jsx";
import { getMonthWater } from '../../redux/water/operations.js'
import css from "./MonthStatsTable.module.css";

export default function MonthStatsTable() {
  const [currentDate, setCurrentDate] = useState(new Date()); //керування датою, зберігаю поточну дату, для визначення поточного місяцяб початку нового при переключенні
  const dispatch = useDispatch();
  const monthWater = useSelector(selectMonthItem); //отримує дані про воду.
  const ref = useRef(null); // доступу до елементів календаря

  const changeMonth = (step) => {
    setCurrentDate((prevDate) => {
      const newDate = new Date(prevDate);
      newDate.setMonth(newDate.getMonth() + step);
      return newDate;
    });
  }; //зміна місяця

  const isCurrentMonth = (date) => {
    const today = new Date();
    return (
      date.getMonth() === today.getMonth() &&
      date.getFullYear() === today.getFullYear()
    );
  }; //перевірка на поточний місяць

  useEffect(() => {
    const month = `${currentDate.getMonth() + 1}-${currentDate.getFullYear()}`;
    dispatch(getMonthWater(month));
  }, [dispatch, currentDate]); //отримання даних з бази при зміні місяця, денну норму

  const getDaysInMonth = () => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    return new Date(year, month + 1, 0).getDate();
  }; // кількість днів у місяці

  const renderDays = () => {
    const daysInMonth = getDaysInMonth(); // Кількість днів у місяці
    return Array.from({ length: daysInMonth }, (_, index) => {
      const day = index + 1; // День місяця (починаючи з 1)
      const month = currentDate.getMonth();

      const waterStats = monthWater?.find((item) => {
        const [year, cMonth, cDay] = item._id.split("-").map(Number);
        return day === cDay && month + 1 === cMonth;
      });

      const months = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
      ];

      const dayLabel = `${day}, ${months[currentDate.getMonth()]}`;

      return (
        <DayComponent
          key={day}
          day={day}
          dayLabel={dayLabel}
          calendarRef={ref}
          waterStats={waterStats}
        />
      );
    });
  }; //Рендер компонентів для кожного дня

  return (
    <div className={css.containerCalendar}>
      <div className={css.wrapperMonth}>
        <h1 className={css.title}>Month</h1>
        <div className={css.month}>
          <button className={css.buttonLeft} onClick={() => changeMonth(-1)}>
            <svg className={css.icon}>
              <use href="/src/assets/icons/arrow.svg#arrow-left"></use>
            </svg>
          </button>
          <p className={css.span}>
            {currentDate.toLocaleString("en-US", {
              month: "long",
              year: "numeric",
            })}
          </p>
          <button
            className={!isCurrentMonth(currentDate) ? css.buttonRight : css.buttonRightDisabled}
            onClick={() => !isCurrentMonth(currentDate) && changeMonth(1)}
          >
            <svg className={css.icon}>
              <use href="/src/assets/icons/arrow.svg#arrow-right"></use>
            </svg>
          </button>
        </div>
      </div>
      <div className={css.containerDays}>{renderDays()}</div>
    </div>
  );
}

