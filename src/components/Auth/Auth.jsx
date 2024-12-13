import { SignInForm } from "../SignUp/SignUp.jsx";
import css from "./Auth.module.css";
import bottleImage from "../../assets/images/bottle.png";

const Auth = () => {
  return (
    <section className={css.section}>
      <div className={css.container}>
        <div className={css.bottleImage}>
          <img src={bottleImage} alt="bottle" />
        </div>
        <div className={css.signInForm}>
          <SignInForm />
        </div>
      </div>
    </section>
  );
};

export default Auth;
