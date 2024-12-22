import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
// import { closeModal } from "../../redux/modal/slice";
import { selectIsSettingModalOpen } from "../../redux/settingModal/selectors";
import { selectUser } from "../../redux/settingModal/selectors";
import {
  updateUserAvatar,
  updateUserInfo,
  updateUserPassword,
} from "../../redux/settingModal/operations";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import BaseModal from "../BaseModal/BaseModal";
import ProfilePhoto from "./ProfilePhoto/ProfilePhoto";
import GenderChoice from "./GenderChoise/GenderChoise";
import InputField from "./InputField";
import PasswordField from "./PasswordField";
import css from "./SettingModal.module.css";
import useToggle from "./useToogle";

const SettingModal = () => {
  const isModalOpen = useSelector(selectIsSettingModalOpen);
  const user = useSelector(selectUser);
  const dispatch = useDispatch();

  const [message, setMessage] = useState(null);
  const [state, toggle] = useToggle();
  const [isSubmitBlocked, setIsSubmitBlocked] = useState(false);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Escape" && isModalOpen) {
        dispatch(closeModal());
      }
    };

    if (isModalOpen && !user) {
      dispatch(getUserInfo());
    }

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isModalOpen, user, dispatch]);

  const initialValues = {
    avatar: user?.avatar || "/path/to/default-avatar.png",
    gender: user?.gender || "female",
    name: user?.name || "",
    email: user?.email || "",
    old_password: "",
    new_password: "",
    confirmPassword: "",
  };

  const validationSchema = Yup.object({
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

  const onSubmit = (values) => {
    console.log("Final Formik values on submit:", values);
    setIsSubmitBlocked(true);
    const { name, email, gender, old_password, new_password } = values;

    const hasChanges =
      name !== user.name ||
      email !== user.email ||
      gender !== user.gender ||
      new_password;

    if (hasChanges) {
      const promises = [];

      // Оновлення пароля
      if (new_password) {
        promises.push(
          dispatch(updateUserPassword({ old_password, new_password }))
            .unwrap()
            .then(() =>
              setMessage({
                text: "Password updated successfully.",
                type: "success",
              })
            )
            .catch(() =>
              setMessage({ text: "Error updating password.", type: "error" })
            )
        );
      }

      // Оновлення іншої інформації
      if (
        name !== user.name ||
        email !== user.email ||
        gender !== user.gender
      ) {
        promises.push(
          dispatch(updateUserInfo({ name, email, gender }))
            .unwrap()
            .then((response) => {
              setMessage({
                text: "Information updated successfully.",
                type: "success",
              });
            })
            .catch(() =>
              setMessage({ text: "Error updating information.", type: "error" })
            )
        );
      }

      Promise.all(promises)
        .then(() => {
          dispatch(closeModal());
        })
        .catch((error) => {
          console.error("Error in Promise.all:", error);
        })
        .finally(() => {
          setIsSubmitBlocked(false);
        });
    } else {
      setMessage({ text: "You have not made any changes.", type: "error" });
      setIsSubmitBlocked(false);
    }
  };

  const handleAvatarChange = (e) => {
    setIsSubmitBlocked(true);
    const file = e.target.files[0];
    console.log("Selected file:", file);

    if (file) {
      const formData = new FormData();
      formData.append("avatar_url", file);

      dispatch(updateUserAvatar(formData))
        .unwrap()
        .then((response) => {
          setMessage({ text: "Avatar changed successfully!", type: "success" });
        })
        .catch((error) => {
          setMessage({ text: "Error, try later!", type: "error" });
        })
        .finally(() => setIsSubmitBlocked(false));
    }
  };

  return (
    <BaseModal
      isOpen={isModalOpen} // Заміна на коректний пропс
      closeModal={() => dispatch(closeModal())}
      customClass={css.settingModal}
    >
      <h2 className={css["name-header"]}>Setting</h2>
      {message && (
        <div className={`${css.message} ${css[message.type]}`}>
          {message.text}
        </div>
      )}
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        {({ errors, touched, handleSubmit }) => (
          <Form
            className={css["form-container"]}
            autoComplete="off"
            noValidate
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                handleSubmit();
              }
            }}
          >
            <ProfilePhoto
              avatar={user?.avatar || ""}
              isSubmitBlocked={isSubmitBlocked}
              handleAvatarChange={handleAvatarChange}
            />
            <div className={css["desktop-flex"]}>
              <div className={css["desktop-left"]}>
                <GenderChoice name="gender" />
                <InputField
                  name="name"
                  label="Your name"
                  placeholder="Enter your name"
                  isError={errors.name && touched.name}
                />
                <InputField
                  name="email"
                  label="E-mail"
                  type="email"
                  placeholder="Enter your email"
                  isError={errors.email && touched.email}
                />
              </div>
              <div className={css["desktop-right"]}>
                <h3 className={css.subtitle}>Password</h3>
                <div className={css["password-group"]}>
                  <PasswordField
                    label="Old Password"
                    name="old_password"
                    placeholder="Enter old password"
                    isHiddenPassword={state.old_password}
                    toggle={toggle}
                    isError={touched.old_password && errors.old_password}
                  />
                  <PasswordField
                    label="New Password"
                    name="new_password"
                    placeholder="Enter new password"
                    isHiddenPassword={state.new_password}
                    toggle={toggle}
                    isError={touched.new_password && errors.new_password}
                  />

                  <PasswordField
                    label="Repeat New Password"
                    name="confirmPassword"
                    placeholder="Repeat new password"
                    isHiddenPassword={state.confirmPassword}
                    toggle={toggle}
                    isError={touched.confirmPassword && errors.confirmPassword}
                  />
                </div>
              </div>
            </div>
            <div className={css["button-container"]}>
              <button
                className={css["submit-button"]}
                type="submit"
                disabled={isSubmitBlocked}
              >
                Save
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </BaseModal>
  );
};

export default SettingModal;
