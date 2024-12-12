import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

import { useId } from "react";
import css from "./SignUp.module.css";

function SignUp() {
  const emailFieldId = useId();
  const passwordFieldId = useId();
  const confirmPasswordFieldId = useId();

  const SignUpSchema = Yup.object().shape({
    email: Yup.string()
      .email("Must be a valid email!")
      .min(2, "Your email is too short!")
      .required("Required"),
    password: Yup.string()
      .min(4, "Your password must exceed 4 characters!")
      .required("Required"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password"), null], "Passwords do not match")
      .required("Confirm your password!"),
  });

  function handleSubmit(values, actions) {
    console.log(values);
    actions.resetForm();
  }
  return (
    <div className={css.singupWrap}>
      <h2>Sign Up</h2>
      <Formik
        initialValues={{
          email: "",
          password: "",
          confirmPassword: "",
        }}
        onSubmit={handleSubmit}
        validationSchema={SignUpSchema}
      >
        <Form className={css.form}>
          <div className={css.formPlace}>
            <label htmlFor={emailFieldId}>Enter your email</label>
            <Field
              type="email"
              name="email"
              id={emailFieldId}
              placeholder="E-mail"
              required
            />
            <ErrorMessage className={css.error} name="email" component="div" />
          </div>
          <div className={css.formPlace}>
            <label htmlFor={passwordFieldId}>Enter your password</label>
            <Field
              type="password"
              name="password"
              id={passwordFieldId}
              placeholder="Password"
              required
            />
            <ErrorMessage
              className={css.error}
              name="password"
              component="div"
            />
          </div>
          <div className={css.formPlace}>
            <label htmlFor={confirmPasswordFieldId}>Repeat password</label>
            <Field
              type="password"
              name="confirmPassword"
              id={confirmPasswordFieldId}
              placeholder="Repeat password"
              required
            />
            <ErrorMessage
              className={css.error}
              name="confirmPassword"
              component="div"
            />
          </div>
          <button type="submit">Sign Up</button>
        </Form>
      </Formik>
      <a href="/signin">Sign In</a>
    </div>
  );
}

export default SignUp;
