import { useState } from "react";
import css from './MonthStatsTable.module.css'

export default function MonthStatsTable() {
    const [currentDate, setCurrentDate] = useState(new Date());


    const changeMonth = (step) => {
    setCurrentDate((prevDate) => {
      const newDate = new Date(prevDate);
      newDate.setMonth(newDate.getMonth() + step);
      return newDate;
    });
    };  //зміна місяця
    
    const isCurrentMonth = (date) => {
  const today = new Date();
  return (
    date.getMonth() === today.getMonth() &&
    date.getFullYear() === today.getFullYear()
  );
    };  //перевірка на поточний місяць
    

    const getDaysInMonth = () => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    return new Date(year, month + 1, 0).getDate();
    };  // кількість днів у місяці
    
    const renderDays = () => {
        const days = getDaysInMonth(currentDate.getFullYear(), currentDate.getMonth());
        return Array.from({ length: days }, (_, i) => <div key={i + 1}>{i + 1}</div>);
    }
    return (
        <div className={css.wrapperCalendar}>
            <div className={css.containerNav}>
                <h1 className={css.title}>Month</h1>
                <div className={css.changeMonth}>
                    <button className={css.buttonLeft} onClick={() => changeMonth(-1)}>{"<" }</button>
                    <p>{currentDate.toLocaleString("en-US", { month: "long", year: "numeric" })}</p>
                    <button className={css.buttonRight} onClick={() => changeMonth(1)} disabled={isCurrentMonth(currentDate)}>{">"}</button>
                </div>
            </div>
            <div className={css.wrapperDays}>{renderDays()}</div>
        </div>
    )
}