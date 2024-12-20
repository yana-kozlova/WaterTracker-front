import css from './Main.module.css'
import WaterConsuptionTracker from '../WaterConsumptionTracker/WaterСonsumptionTracker'
import WhyDrinkWater from '../WhyDrinkWater/WhyDrinkWater';

export default function Main() {
  return (
    <div className={css.main}>
      < WaterConsuptionTracker />
      <WhyDrinkWater  />
    </div>
  );
};


