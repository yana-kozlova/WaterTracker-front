import css from './WhyDrinkWater.module.css'

export default function WhyDrinkWater() {
  return (
    <div className={css.container}>
       <aside className={css.wyDrinkWater}>
          <h2>Why drink water</h2>
          <ul>
            <li>Supply of nutrients to all organs</li>
            <li>Providing oxygen to the lungs</li>
            <li>Maintaining the work of the heart</li>
            <li>Release of processed substances</li>
            <li>Ensuring the stability of the internal environment</li>
            <li>Maintaining within the normal temperature</li>
            <li>
              Maintaining an immune system capable of resisting disease
            </li>
          </ul>
          </aside>
    </div>
  );
}
