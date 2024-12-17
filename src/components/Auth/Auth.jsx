import Container from "../../Container/Container.jsx";
import { SignInForm } from "../SignUp/SignUp.jsx";
import css from "./Auth.module.css";
import BottleImg from "./BottleImg.jsx";

const Auth = () => {
  return (
    <section className={css.section}>
      <Container className={css.container}>
        <SignInForm />

        <BottleImg className={css.picture} />
      </Container>
    </section>
  );
};

export default Auth;
