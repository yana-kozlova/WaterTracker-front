import { SignInForm } from "../AuthForm/AuthForm.jsx";
import css from "./Auth.module.css";
import BottleImg from "./BottleImg.jsx";

const Auth = () => {
  return (
    <section className={css.section}>
      <div className={css.background}></div>
      <SignInForm/>
      <BottleImg className={css.picture}/>
    </section>
  );
};

export default Auth;
