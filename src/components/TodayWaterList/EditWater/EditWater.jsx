import Icon from "../../Svg/Svg";
import { useState, useId } from "react";
import css from './EditWater.module.css'
import { Formik, Form, Field } from "formik";
import Button from "../../Buttons/Button/Button";

const EditWater = () => {

    const initialValues = {
      newTime: "07:00",
      amount: 250,
    };

      const timeFieldId = useId();
      const valueFieldId = useId();

      const [waterAmount, setWaterAmount] = useState(initialValues.amount);

      const handleIncrement = () => {
        setWaterAmount((prev) => prev + 50);
      };

      const handleDecrement = () => {
        setWaterAmount((prev) => (prev > 50 ? prev - 50 : prev));
      };
    return (
      <div>
        <p className={css.modalTitle}>Edit the entered amount of water</p>
        <div className={css.waterInfo}>
          <div>
            <Icon name={"x"} size={20} />
          </div>
          <div className={css.waterAmountTime}>
            <div className={css.waterAmountText}>{waterAmount} ml</div>
            <div>Time</div>
          </div>
        </div>
        <div className={css.inputGroup}>
          <label htmlFor="amount" className={css.inputTitle}>
            Correct entered data:
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
        <Formik initialValues={initialValues}>
          <Form>
            <div className={css.inputGroup}>
              <label htmlFor="time">Recording time:</label>
              <Field
                type="time"
                id={timeFieldId}
                name="newTime"
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
                name="amount"
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
      </div>
    );
}

export default EditWater;