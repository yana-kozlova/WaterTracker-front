import * as Yup from 'yup';

export const validationSchema = Yup.object({
  name: Yup.string().min(2, "Too short").max(16, "Too long"),
  email: Yup.string().email("Invalid email address").required("Required"),
  gender: Yup.string()
    .oneOf(["male", "female"], "Invalid gender")
    .required("Required"),
  old_password: Yup.string().test(
    "required-if-new-password",
    "Old password is required when setting a new password.",
    function (value) {
      const { new_password } = this.parent;
      return !new_password || value;
    }
  ),
  new_password: Yup.string()
    .min(8, "Password is too short")
    .max(64, "Password is too long"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("new_password"), null], "Passwords must match")
    .test(
      "required-if-new-password",
      "Confirm password is required when setting a new password.",
      function (value) {
        const { new_password } = this.parent;
        return !new_password || value;
      }
    ),
});