import { Formik, Form, Field } from "formik";
import Button from "../Buttons/Button/Button";
import css from './DailyNormaForm.module.css'

const initialValues = {
  gender: "for woman",
  weight: "0",
  activeTime: "0",
  userDailyNorma: "0",
};

const calculateDailyNorma = (gender, weight, activeTime) => {
  if (gender === "for woman") {
    const result = Math.round(weight * 0.04 + activeTime * 0.4 * 10) / 10;
    return result;
  } else {
    const result = Math.round(weight * 0.04 + activeTime * 0.6 * 10) / 10;
    return result;
  }
};

const DailyNormaForm = () => {
  return (
    <Formik
      initialValues={initialValues}
      onSubmit={(values) => console.log(values)}
    >
      {({ values }) => (
        <Form className={css.form}>
          <div className={css.radioBox}>
            <div className={css.radio}>
              <Field type="radio" name="gender" value="for woman" />
              <p className={css.text}>For woman</p>
            </div>

            <div className={css.radio}>
              <Field type="radio" name="gender" value="for men" />
              <p className={css.text}>For men</p>
            </div>
          </div>
          <div className={css.userInfoBox}>
            <div className={css.userInfoinputBox}>
              <label className={css.userInfoText}>
                Your weight in kilograms:
              </label>
              <Field type="text" name="weight" className={css.input} />
            </div>
            <div className={css.userInfoinputBox}>
              <label className={css.userInfoText}>
                The time of active participation in sports or other activities
                with a high physical. load in hours:
              </label>
              <Field type="text" name="activeTime" className={css.input} />
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
                {calculateDailyNorma(
                  values.gender,
                  values.weight,
                  values.activeTime
                )}
                <p>L</p>
              </span>
            </div>
          </div>
          <div className={css.writeWaterBox}>
            <label className={css.writeWaterText}>
              Write down how much water you will drink:
            </label>
            <Field type="text" name="userDailyNorma" className={css.input} />
          </div>
          <Button type="submit" name="Save" className={css.button} />
        </Form>
      )}
    </Formik>
  );
};

export default DailyNormaForm;
