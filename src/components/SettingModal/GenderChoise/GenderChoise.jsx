import { Field, useFormikContext } from "formik";
import { useId } from "react";
import css from "./GenderChoise.module.css";

const GenderChoice = ({ labelLeft = "Woman", labelRight = "Man", name = "gender" }) => {
    
  const womanRadioId = useId();
  const manRadioId = useId();
  const { values, setFieldValue } = useFormikContext();

  return (
    <div className={css.genderChoiceGroup}>
      <h3 className={css.subtitle}>Your Gender Identity</h3>
      <div className={css.radioContainer}>
        <label htmlFor={womanRadioId} className={css.radioLabel}>
          <Field
            id={womanRadioId}
            type="radio"
            name={name}
            value="female" // Значення для сервера
            className={css.radioInput}
            checked={values[name] === "female"} // Перевірка для сервера
            onChange={() => setFieldValue(name, "female")} // Встановлюємо значення "female"
          />
          <span className={css.radioMark}></span>
          {labelLeft} {/* Відображається "Woman" */}
        </label>
        <label htmlFor={manRadioId} className={css.radioLabel}>
          <Field
            id={manRadioId}
            type="radio"
            name={name}
            value="male" // Значення для сервера
            className={css.radioInput}
            checked={values[name] === "male"} // Перевірка для сервера
            onChange={() => setFieldValue(name, "male")} // Встановлюємо значення "male"
          />
          <span className={css.radioMark}></span>
          {labelRight} {/* Відображається "Man" */}
        </label>
      </div>
    </div>
  );
};

export default GenderChoice;
