import { Formik, Form, Field } from "formik";
import Button from "../Buttons/Button/Button";
import css from './DailyNormaForm.module.css';
import { useState, useEffect, useId } from "react";
import { useSelector } from "react-redux";
import { selectWaterAmount } from "../../redux/monthWater/selectors";


const initialValues = {
  gender: "for woman",
  weight: "0",
  activeTime: "0",
  userDailyNorma: "0",
};

const calculateDailyNorma = (gender, weight, activeTime) => {
const userWeight = parseFloat(weight) || 0;
const userActiveTime = parseFloat(activeTime) || 0;

  if (gender === "for woman") {
    const calculateResult =
      Math.round(userWeight * 0.04 + userActiveTime * 0.4 * 10) / 10;
    return calculateResult;
  } else {
    const calculateResult =
      Math.round(userWeight * 0.04 + userActiveTime * 0.6 * 10) / 10;
    return calculateResult;
  }
};



const DailyNormaForm = () => {

  const waterRate = useSelector(selectWaterAmount);
  console.log(waterRate);

  const genderWomanField = useId();
  const genderMenField = useId();
  const weightField = useId();
  const activeTimeField = useId();
  const userNormaField = useId();

  const [formData, setFormData] = useState(initialValues);
  const [dailyNorma, setDailyNorma] = useState("0");

  useEffect(() => {
    const norma = calculateDailyNorma(formData.gender, formData.weight, formData.activeTime);
    setDailyNorma(norma);
  }, [formData]);

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={(values) => console.log(values)}
    >
      {({ handleChange }) => (
        <Form className={css.form}>
          <div className={css.radioBox}>
            <div className={css.radio}>
              <Field
                type="radio"
                name="gender"
                value="for woman"
                id={genderWomanField}
                onChange={(evt) => {
                  handleChange(evt);
                  setFormData({ ...formData, gender: evt.target.value });
                }}
              />
              <label htmlFor={genderWomanField} className={css.text}>
                For woman
              </label>
            </div>

            <div className={css.radio}>
              <Field
                type="radio"
                name="gender"
                value="for men"
                id={genderMenField}
                onChange={(evt) => {
                  handleChange(evt);
                  setFormData({ ...formData, gender: evt.target.value });
                }}
              />
              <label htmlFor={genderMenField} className={css.text}>
                For men
              </label>
            </div>
          </div>
          <div className={css.userInfoBox}>
            <div className={css.userInfoinputBox}>
              <label htmlFor={weightField} className={css.userInfoText}>
                Your weight in kilograms:
              </label>
              <Field
                type="text"
                name="weight"
                id={weightField}
                className={css.input}
                onChange={(evt) => {
                  handleChange(evt);
                  setFormData({ ...formData, weight: evt.target.value });
                }}
              />
            </div>
            <div className={css.userInfoinputBox}>
              <label htmlFor={activeTimeField} className={css.userInfoText}>
                The time of active participation in sports or other activities
                with a high physical. load in hours:
              </label>
              <Field
                type="text"
                name="activeTime"
                className={css.input}
                id={activeTimeField}
                onChange={(evt) => {
                  handleChange(evt);
                  setFormData({ ...formData, activeTime: evt.target.value });
                }}
              />
            </div>
          </div>
          <div className={css.amountBox}>
            <div>
              <p className={css.amountText}>
                The required amount of water in liters per day:
              </p>
            </div>
            <div>
              <span className={css.amountResult}>
                {dailyNorma === 0 ? (
                  <p>1.8L</p>
                ) : (
                  <div className={css.amountResult}>
                    <p>{dailyNorma}</p>
                    <p>L</p>
                  </div>
                )}
              </span>
            </div>
          </div>
          <div className={css.writeWaterBox}>
            <label htmlFor={userNormaField} className={css.writeWaterText}>
              Write down how much water you will drink:
            </label>
            <Field
              id={userNormaField}
              type="text"
              name="userDailyNorma"
              className={css.input}
            />
          </div>
          <Button type="submit" name="Save" className={css.button} />
        </Form>
      )}
    </Formik>
  );
};

export default DailyNormaForm;
