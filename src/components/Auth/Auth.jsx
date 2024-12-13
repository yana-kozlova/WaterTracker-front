import { SignInForm } from "../SignUp/SignUp.jsx";
import css from "./Auth.module.css";
import BottleImg from "./BottleImg.jsx";

const Auth = () => {
  return (
    <section className={css.section}>
      <div className={css.container}>
        <SignInForm />

        <BottleImg className={css.picture} />
      </div>
    </section>
  );
};

export default Auth;
