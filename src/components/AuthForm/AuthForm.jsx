import { useState } from "react";
import { Formik, Form, Field } from "formik";
import { useId } from "react";
import Button from '../Buttons/Button/Button.jsx';
import { EyeIcon, EyeSlashIcon } from './const.jsx';
import css from "./AuthForm.module.css";
import clsx from "clsx";
import { NavLink, useLocation } from "react-router-dom";

import { useDispatch } from "react-redux";
import toast from "react-hot-toast";
import { SignInSchema, SignUpSchema } from "../../utils/userValidationSchema";
import { register, login } from "../../redux/auth/operations.js";

const initialValues = {
  email: "",
  password: "",
  repeatPassword: "",
};

// TODO separate eye icon logic for diff password's input

export const SignInForm = () => {
  const dispatch = useDispatch();
  const { pathname } = useLocation();
  const emailFieldId = useId();
  const passwordFieldId = useId();
  const [showPassword, setShowPassword] = useState(false);
  const handleSubmit = async (values, actions) => {
    const { email, password } = values;

    try {
      if (pathname === "/signin") {
        await dispatch(login({ email, password }))
          .unwrap()
          .then(() => {
            toast.success("You are logged in!");
          })
          .catch((error) => {
            if (error.message) {
              actions.setErrors({
                email: error.message,
                password: error.message,
              });

              toast.error("Authentication failed!");
            }
          });
      } else if (pathname === "/signup") {
        await dispatch(register({ email, password }))
          .unwrap()
          .then(() => {
            toast.success("You are registered!");
          })
          .catch((error) => {
            if (error.message) {
              actions.setErrors({
                email: error.message,
              });

              toast.error("Registration failed!");
            }
          });
      }
    } catch (error) {
      toast.error("Something went wrong!");
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const chooseValidationSchema = () => {
    if (pathname === "/signin") {
      return SignInSchema;
    } else if (pathname === "/signup") {
      return SignUpSchema;
    }
  };

  const setPageTitle = () => {
    if (pathname === "/signin") {
      return "Sign In";
    } else if (pathname === "/signup") {
      return "Sign Up";
    }
  };

  return (
    <div className={css.signInFormContainer}>
      <h3 className={css.signInTitle}>{setPageTitle()}</h3>

      <Formik
        initialValues={initialValues}
        onSubmit={handleSubmit}
        validationSchema={chooseValidationSchema}
      >
        <Form className={css.form}>
          <div className={css.fieldWrapper}>
            <label htmlFor={emailFieldId} className={css.inputLabel}>
              Enter your email
            </label>
            <Field name="email">
              {({ field, form }) => (
                <div className={css.inputFieldWrapper}>
                  <input
                    {...field}
                    type="email"
                    id={emailFieldId}
                    placeholder="E-mail"
                    className={clsx(css.inputField, {
                      [css.inputFieldError]: form.errors.email,
                    })}
                  />
                  {form.errors.email && form.touched.email && (
                    <span className={css.errorMessage}>
                      {form.errors.email}
                    </span>
                  )}
                </div>
              )}
            </Field>
          </div>
          <div className={css.passwordFieldWrapper}>
            <div className={css.inputFieldWrapper}>
              <label htmlFor={passwordFieldId} className={css.inputLabel}>
                Enter your password
              </label>
              <Field name="password">
                {({ field, form }) => (
                  <>
                    <input
                      {...field}
                      type={showPassword ? "text" : "password"}
                      id={passwordFieldId}
                      placeholder="Password"
                      className={clsx(css.inputField, {
                        [css.inputFieldError]: form.errors.password,
                      })}
                    />
                    {form.errors.password && (
                      <span className={css.errorMessage}>
                        {form.errors.password}
                      </span>
                    )}
                  </>
                )}
              </Field>
              <span
                className={css.passwordToggleIcon}
                onClick={togglePasswordVisibility}
              >
                {showPassword ? (
                  <EyeSlashIcon color="#2F2F2F" />
                ) : (
                  <EyeIcon color="#2F2F2F" />
                )}
              </span>
            </div>
          </div>
          {pathname === "/signup" && (
            <div className={css.passwordFieldWrapper}>
              <div className={css.inputFieldWrapper}>
                <label htmlFor={passwordFieldId} className={css.inputLabel}>
                  Repeat your password
                </label>
                <Field name="repeatPassword">
                  {({ field, form }) => (
                    <>
                      <input
                        {...field}
                        type={showPassword ? "text" : "password"}
                        placeholder="Repeat Password"
                        className={clsx(css.inputField, {
                          [css.inputFieldError]: form.errors.repeatPassword,
                        })}
                      />
                      {form.errors.repeatPassword && (
                        <span className={css.errorMessage}>
                          {form.errors.repeatPassword}
                        </span>
                      )}
                    </>
                  )}
                </Field>
                <span
                  className={css.passwordToggleIcon}
                  onClick={togglePasswordVisibility}
                >
                  {showPassword ? (
                    <EyeSlashIcon color="#2F2F2F" />
                  ) : (
                    <EyeIcon color="#2F2F2F" />
                  )}
                </span>
              </div>
            </div>
          )}
          <Button
            type="submit"
            name={setPageTitle()}
          />
        </Form>
      </Formik>

      <NavLink
        className={css.signUpLink}
        to={pathname === "/signin" ? "/signup" : "/signin"}
      >
        {pathname === "/signin" ? "Sign Up" : "Sign In"}
      </NavLink>
    </div>
  );
};
