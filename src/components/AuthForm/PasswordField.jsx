import { useState } from "react";
import { Field } from "formik";
import clsx from "clsx";
import { EyeIcon, EyeSlashIcon } from "./const.jsx";
import css from "./AuthForm.module.css";

const PasswordField = ({ name, label, placeholder, error }) => {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className={css.passwordFieldWrapper}>
      <label htmlFor={name} className={css.inputLabel}>
        {label}
      </label>
      <Field name={name}>
        {({ field, form }) => (
          <>
            <div className={css.inputFieldWrapper}>
              <input
                {...field}
                type={showPassword ? "text" : "password"}
                id={name}
                placeholder={placeholder}
                className={clsx(css.inputField, {
                  [css.inputFieldError]: form.errors[name],
                })}
              />
              {form.errors[name] && form.touched[name] && (
                <span className={css.errorMessage}>{form.errors[name]}</span>
              )}
            </div>
            <span
              className={css.passwordToggleIcon}
              onClick={togglePasswordVisibility}
            >
              {showPassword ? (
                <EyeSlashIcon color="currentColor" />
              ) : (
                <EyeIcon color="currentColor" />
              )}
            </span>
          </>
        )}
      </Field>
    </div>
  );
};

export default PasswordField;
