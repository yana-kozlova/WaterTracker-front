import css from "./WelcomePage.module.css"
import Header from "../../components/Header/Header"
import TryTrackerButton from "../../components/Buttons/TryTrackerButton/TryTrackerButton"

export default function WelcomePage() {
  return (
    <>
      <Header />
      <main className={css.main}>
        <div className={css.container}>
          <section className={css.hero}>
            <div className={css.heroContent}>
              <h1 className={css.heroTitle}>Water consumption tracker</h1>
              <p className={css.heroSubtitle}>
                Record daily water intake and track
              </p>
              <ul className={css.benefits}>
                <li className={css.benefit}>
                  <span className={css.icon}>&#128197;</span>
                  <span className={css.text}>Habit drive</span>
                </li>
                <li className={css.benefit}>
                  <span className={css.icon}>&#128202;</span>
                  <span className={css.text}>View statistics</span>
                </li>
                <li className={css.benefit}>
                  <span className={css.icon}>&#9881;</span>
                  <span className={css.text}>Personal rate setting</span>
                </li>
              </ul>
              <TryTrackerButton />
            </div>
            <aside className={css.wyDrinkWater}>
              <h2>Why drink water</h2>
              <ul>
                <li>Supply of nutrients to all organs</li>
                <li>Providing oxygen to the lungs</li>
                <li>Maintaining the work of the heart</li>
                <li>Release of processed substances</li>
                <li>Ensuring the stability of the internal environment</li>
                <li>Maintaining within the normal temperature</li>
                <li>Maintaining an immune system capable of resisting disease</li>
              </ul>
            </aside>
          </section>
        </div>

      </main>

      <footer className={css.footer}>
        <div className={css.container}>
          <p>&copy; 2024 Tracker of Water. All rights reserved.</p>
        </div>
      </footer>
    </>
  );
}
