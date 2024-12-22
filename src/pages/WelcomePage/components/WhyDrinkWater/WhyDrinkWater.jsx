import css from './WhyDrinkWater.module.css'

const items = [
  "Supply of nutrients to all organs",
  "Providing oxygen to the lungs",
  "Maintaining the work of the heart",
  "Release of processed substances",
  "Ensuring the stability of the internal environment",
  "Maintaining within the normal temperature",
  "Maintaining an immune system capable of resisting disease",
];


export default function WhyDrinkWater() {
  return (
      <aside className={css.whyDrinkWater}>
        <h2>Why drink water</h2>
        <div>
          {items.map((item, index) => (
            <div key={index} className={css.whyItem}>
              <div className={css.whyDot}></div>
              <div className={css.whyTitle}>{item}</div>
            </div>
          ))}
        </div>
      </aside>);
}
