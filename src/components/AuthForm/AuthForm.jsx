import { useState } from "react";
import { Formik, Form, Field } from "formik";
import { useId } from "react";
import Button from "../Buttons/Button/Button.jsx";
import { EyeIcon, EyeSlashIcon, GoogleIcon } from "./const.jsx";
import css from "./AuthForm.module.css";
import clsx from "clsx";
import { NavLink, useLocation } from "react-router-dom";
import PasswordField from "./PasswordField";
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
            <label htmlFor="email" className={css.inputLabel}>
              Enter your email
            </label>
            <Field name="email">
              {({ field, form }) => (
                <div className={css.inputFieldWrapper}>
                  <input
                    {...field}
                    type="email"
                    id="email"
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

          <PasswordField
            name="password"
            label="Enter your password"
            placeholder="Password"
          />

          {pathname === "/signup" && (
            <PasswordField
              name="repeatPassword"
              label="Repeat your password"
              placeholder="Repeat Password"
            />
          )}

          <Button type="submit" name={setPageTitle()} />
          <button
            type="button"
            className={css.googleButton}
            onClick={handleGoogleLogin}
          >
            <GoogleIcon />
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
