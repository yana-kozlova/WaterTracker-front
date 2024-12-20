import css from './WelcomePage.module.css'; // Імпортуємо стиль
import MainContainer from "./components/Container/MainContainer";

import Footer from "../../components/Footer/Footer";

export default function WelcomePage() {
  return (
        <div className={css.pageContainer}>
      <MainContainer />
      <Footer />
    </div>
  );
};