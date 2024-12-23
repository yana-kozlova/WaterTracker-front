import { useId } from "react";
import { Field, ErrorMessage } from "formik";
import clsx from "clsx";
import Label from "./Label/Label";
import css from "./SettingModal.module.css";

const InputField = ({
  name,
  label,
  type = "text",
  placeholder = "Enter your email",
  isError,
}) => {
  const inputId = useId();

  return (
    <div className={css[`${name}-group`]}>
      <Label htmlFor={inputId} type="thick">
        {label}
      </Label>
      <div className={css["input-wrapper"]}>
        <Field
          autoComplete="off"
          className={clsx(css.input, {
            [css["error-input"]]: isError,
          })}
          id={inputId}
          type={type}
          name={name}
          placeholder={placeholder}
        />
        <ErrorMessage
          name={name}
          component="div"
          className={css["error-message"]}
        />
      </div>
    </div>
  );
};

export default InputField;
