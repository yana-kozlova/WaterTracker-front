import * as Yup from 'yup';

export const validationSchema = Yup.object({
  userDailyNorma: Yup.number()
    .min(0.1, "Daily norm must be at least 0.001 liters")
    .max(15, "Daily norm can't be more than 15 liters")
    .required("Please enter your daily water intake"),
});