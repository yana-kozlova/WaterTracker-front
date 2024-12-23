import { useState } from "react";
import { Formik, Form, Field } from "formik";
import { useId } from "react";
import Button from "../Buttons/Button/Button.jsx";
import { EyeIcon, EyeSlashIcon } from "./const.jsx";
import css from "./AuthForm.module.css";
import clsx from "clsx";
import { NavLink, useLocation } from "react-router-dom";

import { useDispatch } from "react-redux";
import toast from "react-hot-toast";
import { SignInSchema, SignUpSchema } from "../../utils/userValidationSchema";
import { register, login } from "../../redux/auth/operations.js";
import axios from "axios";

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

  const handleGoogleLogin = async () => {
    try {
      const response = await axios.get("/auth/get-oauth-url");
      const url = response.data?.data.url;

      if (url) {
        window.location.href = url;
      } else {
        toast.error("Failed to get Google OAuth URL!");
      }
    } catch (error) {
      toast.error("Failed to get Google OAuth URL!");
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
          <Button type="submit" name={setPageTitle()} />
          <button
            type="button"
            className={css.googleButton}
            onClick={handleGoogleLogin}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 48 48"
              className={css.googleIcon}
            >
              <path
                fill="#FFC107"
                d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"
              />
              <path
                fill="#FF3D00"
                d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"
              />
              <path
                fill="#4CAF50"
                d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"
              />
              <path
                fill="#1976D2"
                d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"
              />
            </svg>
            Enter with Google
          </button>
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
