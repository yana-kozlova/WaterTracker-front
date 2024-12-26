import DripLoader from '../../DripLoader/DripLoader.jsx';
import Icon from "../../Svg/Svg";
import { useId, useState } from 'react';
import css from "./EditWater.module.css";
import { Formik, Form, Field } from "formik";
import Button from "../../Buttons/Button/Button";
import BaseModal from "../../BaseModal/BaseModal";
import capIcon from "../../../assets/icons/cap.svg";
import { editWater, getMonthWater } from '../../../redux/water/operations';
import { useDispatch } from "react-redux";
import { validationSchema } from "./validation.js";

function formatToTime(isoString) {
  const date = new Date(isoString);
  const hours = date.getUTCHours().toString().padStart(2, "0");
  const minutes = date.getUTCMinutes().toString().padStart(2, "0");
  return `${hours}:${minutes}`;
}

function convertTimeToISO(time) {
  const now = new Date();
  const [hours, minutes] = time.split(":").map(Number);
  now.setHours(hours, minutes, 0, 0);
  const timezoneOffset = now.getTimezoneOffset();
  now.setMinutes(now.getMinutes() - timezoneOffset);
  return now.toISOString();
}

const EditWater = ({ isOpen, onClose, currentWater }) => {
const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);

const timeFieldId = useId();
const valueFieldId = useId();

  if (!isOpen || !currentWater) return null;
  
  const { amount, date, _id } = currentWater;

  const currentTime = formatToTime(date);

  const initialValues = {
    newTime: currentTime,
    newAmount: amount,
  };

  return (
    <div>
      <BaseModal isOpen={isOpen} onClose={onClose}>
        <p className={css.modalTitle}>Edit the entered amount of water</p>

        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={async (values) => {
            setIsLoading(true);
            try {
              await dispatch(
                editWater({
                  _id,
                  amount: values.newAmount,
                  date: convertTimeToISO(values.newTime),
                })
              );
              dispatch(getMonthWater());
              setIsLoading(false);
              onClose();
            } catch (error) {
              console.error(
                "Error occurred while edit water or fetching month data:",
                error
              );
            }
          }}
        >
          {({ values, errors, touched, setFieldValue }) => (
            <Form>
              {isLoading && <DripLoader />}
              <div className={css.waterInfo}>
                <div>
                  <img src={capIcon} alt="Cap Icon" width="22" height="28" />
                </div>
                <div className={css.waterAmountTime}>
                  <div className={css.waterAmountText}>
                    {values.newAmount} ml
                  </div>
                  <div>{values.newTime}</div>
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
                    onClick={() => {
                      setFieldValue(
                        "newAmount",
                        Math.max(values.newAmount - 50, 0)
                      );
                    }}
                    aria-label="Decrease water amount"
                    className={css.buttons}
                  >
                    <Icon name={"minus-smallsolid"} size={14} color="#9ebbff" />
                  </button>
                  <div className={css.waterAmountContainer}>
                    <p className={css.waterAmountText}>{values.newAmount} ml</p>
                  </div>
                  <button
                    type="button"
                    onClick={() =>
                      setFieldValue("newAmount", values.newAmount + 50)
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
                  value={values.newAmount}
                  name="newAmount"
                  placeholder="0"
                  isError={errors.newAmount && touched.newAmount}
                />
              </div>
              <div className={css.modalActions}>
                <div className={css.waterAmountLabel}>
                  {values.newAmount} ml
                </div>
                <div>
                  <Button
                    type="submit"
                    name="Save"
                    className={css.saveButton}
                    disabled={Object.keys(errors).length > 0 || isLoading}
                  />
                </div>
              </div>
            </Form>
          )}
        </Formik>
      </BaseModal>
    </div>
  );
};


export default EditWater;