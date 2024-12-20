import TryTrackerButton from "../../../../components/Buttons/TryTrackerButton/TryTrackerButton";
import css from './WaterСonsumptionTracker.module.css'

export default function WaterConsuptionTracker() {
  return (
    <div>
      <section className={css.hero}>
        <div className={css.heroContent}>
          <h1 className={css.heroTitle}>Water consumption tracker</h1>
          <p className={css.heroSubtitle}>
            Record daily water intake and track
          </p>
          <ul className={css.benefits}>
            <li className={css.benefit}>
              <span className={css.icon}>
                <svg width="30" height="30">
                  <use href="/icons.svg#calendar-daysoutline"></use>
                </svg>
              </span>
              <span className={css.text}>Habit drive</span>
            </li>
            <li className={css.benefit}>
              <span className={css.icon}>
                <svg width="30" height="30">
                  <use href="/icons.svg#presentation-chart-baroutline"></use>
                </svg>
              </span>
              <span className={css.text}>View statistics</span>
            </li>
            <li className={css.benefit}>
              <span className={css.icon}>
                <svg width="32" height="32">
                  <use href="/icons.svg#wrench-screwdriveroutline"></use>
                </svg>
              </span>
              <span className={css.text}>Personal rate setting</span>
            </li>
          </ul>
          <TryTrackerButton />
        </div>
      </section>
      </div>
  );
}