import css from "./WelcomePage.module.css";
import WhyDrinkWater from "../../components/WhyDrinkWater/WhyDrinkWater";
import Header from "../../components/Header/Header";
import WaterConsuptionTracker from "../../components/WaterСonsumptionTracker/WaterСonsumptionTracker";
import Footer from "../../components/Footer/Footer";
// import Icon from "../../components/Svg/Svg";

export default function WelcomePage() {
  return (
    <>
      <Header />
      <main className={css.main}>
        <div className={css.container}>
          <WaterConsuptionTracker />
          <WhyDrinkWater />
        </div>
      </main>
         <Footer  />
    </>
  );
}
