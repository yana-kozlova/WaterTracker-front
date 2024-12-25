import { useId } from "react";
import css from "./AddWater.module.css";
import Button from "../../Buttons/Button/Button";
import Icon from "../../Svg/Svg";
import { Field, Form, Formik } from "formik";
import { addWater } from "../../../redux/water/operations";
import { useDispatch } from "react-redux";
import BaseModal from "../../BaseModal/BaseModal";

function convertTimeToISO(time) {
  const now = new Date();
  const [hours, minutes] = time.split(":").map(Number);
  now.setHours(hours, minutes, 0, 0);
  const timezoneOffset = now.getTimezoneOffset();
  now.setMinutes(now.getMinutes() - timezoneOffset);
  return now.toISOString();
}

export default function AddWater({ isOpen, onClose}) {

  const dispatch = useDispatch();

  const timeFieldId = useId();
  const valueFieldId = useId();

  if (!isOpen) return null;

    const initialValues = {
      time: "07:00",
      totalAmount: 50,
    };

  return (
    <>
      <BaseModal isOpen={isOpen} onClose={onClose}>
        <h2 className={css.modalTitle}>Add water</h2>
        <Formik
          initialValues={initialValues}
          onSubmit={(values) => {
            dispatch(
              addWater({
                amount: values.totalAmount,
                date: convertTimeToISO(values.time),
              })
            );
            onClose();
          }}
        >
          {({ values, setFieldValue }) => (
            <Form>
              <div className={css.inputGroup}>
                <label htmlFor="amount" className={css.inputTitle}>
                  Choose a value:
                </label>
                <p className={css.amountTitle}>Amount of water</p>
                <div className={css.stepper}>
                  <button
                    type="button"
                    onClick={() =>
                      setFieldValue(
                        "totalAmount",
                        Math.max(values.totalAmount - 50, 0)
                      )
                    }
                    aria-label="Decrease water amount"
                    className={css.buttons}
                  >
                    <Icon name={"minus-smallsolid"} size={14} color="#9ebbff" />
                  </button>
                  <div className={css.waterAmountContainer}>
                    <p className={css.waterAmountText}>
                      {values.totalAmount} ml
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() =>
                      setFieldValue("totalAmount", values.totalAmount + 50)
                    }
                    aria-label="Increase water amount"
                    className={css.buttons}
                  >
                    <Icon
                      name={"plus-smalloutline"}
                      size={14}
                      color="#9ebbff"
                    />
                  </button>
                </div>
              </div>
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
                  readOnly
                />
              </div>
              <div className={css.modalActions}>
                <div className={css.waterAmountLabel}>{values.totalAmount} ml</div>
                <div>
                  <Button
                    type="submit"
                    name="Save"
                    className={css.saveButton}
                  />
                </div>
              </div>
            </Form>
          )}
        </Formik>
      </BaseModal>
    </>
  );
}
