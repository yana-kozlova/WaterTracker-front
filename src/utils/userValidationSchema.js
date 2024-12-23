import * as Yup from "yup";

export const SignInSchema = Yup.object().shape({
  email: Yup.string()
    .email("Invalid email format")
    .required("Email is required"),
  password: Yup.string()
    .required("Password is required")
    .min(8, "Password must be at least 8 characters")
    .max(64, "Password must be at most 64 characters"),
});

export const SignUpSchema = Yup.object({
  email: Yup.string()
    .required("Email is required")
    .email("Invalid email address"),
  password: Yup.string()
    .required("Password is required")
    .min(8, "Your password is too short!")
    .max(64, "Your password is too long!"),
  repeatPassword: Yup.string()
    .required("Password is required")
    .min(8, "Your password is too short!")
    .max(64, "Your password is too long!")
    .oneOf([Yup.ref("password"), null], "Passwords must match"),
});

export const ResetPasswordFormSchema = Yup.object().shape({
  email: Yup.string()
    .email("Invalid email format")
    .required("Email is required"),
});
export const ResetPasswordSchema = Yup.object().shape({
  newPassword: Yup.string()
    .required("Password is required")
    .min(8, "Your password is too short!")
    .max(64, "Your password is too long!"),
  repeatNewPassword: Yup.string()
    .required("Password is required")
    .min(8, "Your password is too short!")
    .max(64, "Your password is too long!")
    .oneOf([Yup.ref("newPassword"), null], "Passwords must match"),
});
