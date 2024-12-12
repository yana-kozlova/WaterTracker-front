import { SignInForm } from "../SignInForm/SignInForm.jsx";
import css from "./Auth.module.css";
const Auth = () => {
  return (
    <section className={css.section}>
      <SignInForm />
    </section>
  );
};

export default Auth;
