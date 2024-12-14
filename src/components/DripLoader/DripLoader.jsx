import { useState, useEffect } from "react";
import css from "./DripLoader.module.css";

export default function DripLoader() {
  const [waterLevel, setWaterLevel] = useState(30); // Рівень води

  useEffect(() => {
    const interval = setInterval(() => {
      setWaterLevel((prev) => (prev < 100 ? prev + 5 : 100));
    }, 1500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className={css.loaderContainer}>
      <div className={css.glass}>
        <div className={css.water} style={{ height: `${waterLevel}%` }}></div>
      </div>
      <div className={css.drops}>
        <div className={`${css.drop} ${css.drop1}`}></div>
        <div className={`${css.drop} ${css.drop2}`}></div>
        <div className={`${css.drop} ${css.drop3}`}></div>
        <div className={`${css.drop} ${css.drop4}`}></div>
      </div>
    </div>
  );
}
