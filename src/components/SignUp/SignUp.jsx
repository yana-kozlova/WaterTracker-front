import { useState } from "react";
import { Formik, Form, Field } from "formik";
import { useId } from "react";
import css from "./SignUp.module.css";
import * as Yup from "yup";
import clsx from "clsx";
import { NavLink, useLocation } from "react-router-dom";
import Icon from "../Svg/Svg";
import { useDispatch } from "react-redux";
import toast from "react-hot-toast";
import { SignInSchema, SignUpSchema } from "../../utils/userValidationSchema";
import { register, login } from "../../redux/auth/operations.js";

const EyeIcon = ({ color = "#2F2F2F", size = 24, ...props }) => (
  <svg
    width={size}
    height={size}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    {...props}
  >
    <path
      d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.574-3.007-9.964-7.178Z"
      stroke={color}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
      stroke={color}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const EyeSlashIcon = ({ color = "#2F2F2F", size = 24, ...props }) => (
  <svg
    width={size}
    height={size}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    {...props}
  >
    <path
      d="M3.98 8.223A10.477 10.477 0 0 0 1.934 12c1.292 4.338 5.31 7.5 10.066 7.5.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0 1 12 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 0 1-4.293 5.774M6.228 6.228 3 3m3.228 3.228 3.65 3.65m7.894 7.894L21 21m-3.228-3.228-3.65-3.65A3 3 0 1 0 9.88 9.879m4.242 4.242L9.881 9.88"
      stroke={color}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const initialValues = {
  email: "",
  password: "",
  repeatPassword: "",
};
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

              toast.error(error.message);
            } else {
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

              toast.error(error.message);
            } else {
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
          <button type="submit" className={css.submitButton}>
            {setPageTitle()}
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
