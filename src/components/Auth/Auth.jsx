import { SignInForm } from "../AuthForm/AuthForm.jsx";
import css from "./Auth.module.css";
import BottleImg from "./BottleImg.jsx";

const Auth = () => {
  return (
    <section className={css.section}>
        <SignInForm />
        <BottleImg className={css.picture} />
    </section>
  );
};

export default Auth;
