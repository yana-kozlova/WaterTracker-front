import { useState, useId } from "react";
import css from "./AddWater.module.css";
import Button from "../../Buttons/Button/Button";
import Icon from "../../Svg/Svg";
import { Field, Form, Formik } from "formik";
import { addWater } from "../../../redux/water/operations";
import { useDispatch } from "react-redux";

function convertTimeToISO(time) {
  const now = new Date();
  const [hours, minutes] = time.split(":").map(Number);
  now.setHours(hours, minutes, 0, 0);
  const timezoneOffset = now.getTimezoneOffset();
  now.setMinutes(now.getMinutes() - timezoneOffset);
  return now.toISOString();
}

export default function AddWater() {
  const initialValues = {
    time: "07:00",
    totalAmount: 50,
  };

  const dispatch = useDispatch();

  const timeFieldId = useId();
  const valueFieldId = useId();

  const [waterAmount, setWaterAmount] = useState(initialValues.totalAmount);

  const handleIncrement = () => {
    setWaterAmount((prev) => prev + 50);
  };

  const handleDecrement = () => {
    setWaterAmount((prev) => (prev > 50 ? prev - 50 : prev));
  };

  return (
    <>
      <h2 className={css.modalTitle}>Add water</h2>
      <div className={css.inputGroup}>
        <label htmlFor="amount" className={css.inputTitle}>
          Choose a value:
        </label>
        <p className={css.amountTitle}>Amount of water</p>
        <div className={css.stepper}>
          <button
            type="button"
            onClick={handleDecrement}
            aria-label="Decrease water amount"
            className={css.buttons}
          >
            <Icon name={"minus-smallsolid"} size={14} color="#9ebbff" />
          </button>
          <div className={css.waterAmountContainer}>
            <p className={css.waterAmountText}>{waterAmount} ml</p>
          </div>
          <button
            type="button"
            onClick={handleIncrement}
            aria-label="Increase water amount"
            className={css.buttons}
          >
            <Icon name={"plus-smalloutline"} size={14} color="#9ebbff" />
          </button>
        </div>
      </div>
      <Formik
        initialValues={initialValues}
        onSubmit={(values) => {
          dispatch(
            addWater({
              amount: values.totalAmount,
              date: convertTimeToISO(values.time),
            })
          );
        }}
      >
        <Form>
          <div className={css.inputGroup}>
            <label htmlFor="time">Recording time:</label>
            <Field
              type="time"
              id={timeFieldId}
              name="time"
              className={css.inputValue}
            />
          </div>
          <div className={css.inputGroup}>
            <label className={css.valueLabel} htmlFor="value">
              Enter the value of the water used:
            </label>
            <Field
              className={css.inputValue}
              type="number"
              id={valueFieldId}
              name="totalAmount"
              value={waterAmount}
              readOnly
            />
          </div>
          <div className={css.modalActions}>
            <div className={css.waterAmountLabel}>{waterAmount} ml</div>
            <div>
              <Button type="submit" name="Save" className={css.saveButton} />
            </div>
          </div>
        </Form>
      </Formik>
    </>
  );
}
