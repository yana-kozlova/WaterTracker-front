import css from './Main.module.css'
import WaterConsumptionTracker from '../WaterConsumptionTracker/WaterСonsumptionTracker'
import WhyDrinkWater from '../WhyDrinkWater/WhyDrinkWater';

export default function Main() {
  return (
    <div className={css.main}>
      <WaterConsumptionTracker />
      <WhyDrinkWater />
    </div>
  );
};


