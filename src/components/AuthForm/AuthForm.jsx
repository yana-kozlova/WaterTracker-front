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
import {
  SignInSchema,
  SignUpSchema,
  ResetPasswordFormSchema,
  ResetPasswordSchema,
} from "../../utils/userValidationSchema";
import {
  register,
  login,
  resetPassword,
  updatePassword,
} from "../../redux/auth/operations.js";
import axios from "axios";

const initialValues = {
  email: "",
  password: "",
  repeatPassword: "",
  newPassword: "",
  repeatNewPassword: "",
};

export const SignInForm = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const { pathname } = location;

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
      } else if (pathname === "/reset-password-form") {
        if (!email || typeof email !== "string") {
          toast.error("Please provide a valid email address.");
          return;
        }
        await dispatch(resetPassword({ email }))
          .unwrap()
          .then(() => {
            toast.success("Password reset link sent to your email!");
          })
          .catch((error) => {
            console.error("Error during password reset:", error);

            if (error.message) {
              actions.setErrors({
                email: error.message,
              });
              toast.error(error.message);
            } else {
              toast.error("Password reset failed!");
            }
          });
      } else if (pathname === "/reset-password") {
        const { newPassword, repeatNewPassword } = values;

        const urlToken = new URLSearchParams(location.search).get("token");

        if (!newPassword || !repeatNewPassword || !urlToken) {
          toast.error("Please provide a valid password and token.");
          return;
        }

        if (newPassword !== repeatNewPassword) {
          toast.error("Passwords do not match.");
          return;
        }

        await dispatch(
          updatePassword({ token: urlToken, password: newPassword })
        )
          .unwrap()
          .then(() => {
            toast.success("Password updated!");
          })
          .catch((error) => {
            console.error("Error during password update:", error);
            if (error.message) {
              actions.setErrors({
                newPassword: error.message,
              });
              toast.error(error.message);
            } else {
              toast.error("Password update failed!");
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
    } else if (pathname === "/reset-password-form") {
      return ResetPasswordFormSchema;
    } else if (pathname === "/reset-password") {
      return ResetPasswordSchema;
    }
  };

  const setPageTitle = () => {
    if (pathname === "/signin") {
      return "Sign In";
    } else if (pathname === "/signup") {
      return "Sign Up";
    } else if (pathname === "/reset-password-form") {
      return "Reset Password";
    } else if (pathname === "/reset-password") {
      return "Update Password";
    }
  };

  return (
    <div className={css.signInFormContainer}>
      <h3 className={css.signInTitle}>{setPageTitle()}</h3>

      <Formik
        initialValues={initialValues}
        onSubmit={handleSubmit}
        validationSchema={chooseValidationSchema()}
      >
        <Form className={css.form}>
          {pathname === "/reset-password" ? (
            <>
              <PasswordField
                name="newPassword"
                label="Enter new password"
                placeholder="Enter new password"
              />
              <PasswordField
                name="repeatNewPassword"
                label="Repeat new password"
                placeholder="Repeat new password"
              />
            </>
          ) : (
            <>
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

              {pathname !== "/reset-password-form" && (
                <>
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
                </>
              )}
            </>
          )}
          <Button type="submit" name={setPageTitle()} />
          {(pathname === "/signin" || pathname === "/signup") && (
            <button
              type="button"
              className={css.googleButton}
              onClick={handleGoogleLogin}
            >
              <GoogleIcon />
              Enter with Google
            </button>
          )}
        </Form>
      </Formik>

      {pathname !== "/reset-password" && (
        <div className={css.linkContainer}>
          <NavLink
            className={css.signUpLink}
            to={pathname === "/signin" ? "/signup" : "/signin"}
          >
            {pathname === "/signin" ? "Sign Up" : "Sign In"}
          </NavLink>
          {(pathname === "/signup" || pathname === "/signin") && (
            <NavLink className={css.signUpLink} to="/reset-password-form">
              Reset password
            </NavLink>
          )}
        </div>
      )}
    </div>
  );
};
