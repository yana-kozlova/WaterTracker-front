import { Field, Form, Formik } from 'formik';
import { useEffect, useId, useState } from 'react';
import toast from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import { updateUserDailyNorm } from '../../redux/auth/operations';
import { selectDailyNorma } from '../../redux/auth/selectors';
import { getMonthWater } from '../../redux/water/operations.js';
import Button from '../Buttons/Button/Button';
import DripLoader from '../DripLoader/DripLoader.jsx';
import InputField from '../SettingModal/InputField.jsx';
import { validationSchema } from './validation.js';
import css from './DailyNormaForm.module.css';

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
    return Math.round(userWeight * 0.04 + userActiveTime * 0.4 * 10) / 10;
  } else {
    return Math.round(userWeight * 0.04 + userActiveTime * 0.6 * 10) / 10;
  }
};

const DailyNormaForm = ({ onClose }) => {
  const userDailyNorma = (useSelector(selectDailyNorma) / 1000);
  const dispatch = useDispatch();

  const genderWomanField = useId();
  const genderMenField = useId();
  const weightField = useId();
  const activeTimeField = useId();
  const userNormaField = useId();

  const [formData, setFormData] = useState(initialValues);
  const [dailyNorma, setDailyNorma] = useState("0");
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = async (values, { setFieldError }) => {
    setIsLoading(true);

    try {
      const result = await dispatch(
        updateUserDailyNorm({ daily_norma: values.userDailyNorma * 1000 })
      );
      console.log('result', result);
      if (result.meta.requestStatus === "fulfilled") {
        toast.success("Daily norm updated successfully!");
      }
      else if (result.meta.requestStatus === "rejected") {
        const errorMessage = result.payload || "An error occurred";
        toast.error(errorMessage);

        if (result.payload?.errors) {
          Object.entries(result.payload.errors).forEach(([field, messages]) => {
            setFieldError(field, messages[0]);
          });
        }
      }
    } catch (error) {
      console.error("Unexpected error:", error);
      toast.error("An unexpected error occurred");
    } finally {
      onClose();
      dispatch(getMonthWater());
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const norma = calculateDailyNorma(
      formData.gender,
      formData.weight,
      formData.activeTime
    );
    setDailyNorma(norma);
  }, [formData]);

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
    >
      {({ errors, touched, handleChange }) => (
        <Form className={css.form}>
          {isLoading && <DripLoader />}
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
                with a high physical load in hours:
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
                  <p>{userDailyNorma} L</p>
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
            <InputField
              id={userNormaField}
              name="userDailyNorma"
              label="Write down how much water you will drink:"
              type="text"
              placeholder="0"
              isError={errors.userDailyNorma && touched.userDailyNorma}
            />
          </div>
          <Button
            type="submit"
            name="Save"
            className={css.button}
            disabled={Object.keys(errors).length > 0 || isLoading}  // Disabled when form has errors or is loading
          />
        </Form>
      )}
    </Formik>
  );
};

export default DailyNormaForm;
