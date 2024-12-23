import { useId } from "react";
import { Field, ErrorMessage } from "formik";
import Label from "./Label/Label";
// import { HiOutlineEye, HiOutlineEyeOff } from "react-icons/hi";
import clsx from "clsx";
import css from "./SettingModal.module.css";

const PasswordField = ({
  label,
  name,
  placeholder,
  isHiddenPassword,
  toggle,
  isError,
}) => {
  const inputId = useId();

  return (
    <div className={css["password-sub-group"]}>
      <Label htmlFor={inputId} type="thin">
        {label}
      </Label>
      <div className={css["input-wrapper"]}>
        <Field
          className={clsx(css.input, {
            [css["error-input"]]: isError,
          })}
          id={inputId}
          type={isHiddenPassword ? "text" : "password"}
          name={name}
          placeholder={placeholder}
        />
        <button
          className={css["eye-button"]}
          onClick={(event) => {
            event.preventDefault();
            toggle(name);
          }}
        >
          {isHiddenPassword ? (
            <HiOutlineEye className={css["eye-icon"]} />
          ) : (
            <HiOutlineEyeOff className={css["eye-icon"]} />
          )}
        </button>
        <ErrorMessage
          name={name}
          component="div"
          className={css["error-message"]}
        />
      </div>
    </div>
  );
};

export default PasswordField;
