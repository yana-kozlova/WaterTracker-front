import * as Yup from 'yup';

export const validationSchema = Yup.object({
  totalAmount: Yup.number()
    .min(1, "Value must be at least 1 milliliters")
    .max(5000, "Value can't be more than 5000 milliliters")
    .required("Please enter your water intake"),
});