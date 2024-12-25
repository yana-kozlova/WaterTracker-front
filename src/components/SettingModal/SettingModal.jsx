import { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import { useSelector, useDispatch } from 'react-redux';
import { selectUser } from '../../redux/auth/selectors';
import {
  updateUserPhoto, updateUserData, updateUserPassword,
} from '../../redux/auth/operations';
import { Formik, Form } from 'formik';
import BaseModal from '../BaseModal/BaseModal';
import ProfilePhoto from './ProfilePhoto/ProfilePhoto';
import GenderChoice from './GenderChoise/GenderChoise';
import InputField from './InputField';
import PasswordField from './PasswordField';
import css from './SettingModal.module.css';
import useToggle from './useToogle';
import { validationSchema } from './validation.js';

const SettingModal = ({ isModalOpen, onClose }) => {
  const user = useSelector(selectUser);
  const dispatch = useDispatch();

  const [message, setMessage] = useState(null);
  const [state, toggle] = useToggle();
  const [isSubmitBlocked, setIsSubmitBlocked] = useState(false);
  const [initialValues, setInitialValues] = useState({
    avatar: '/path/to/default-avatar.png',
    gender: 'female',
    name: '',
    email: '',
    old_password: '',
    new_password: '',
    confirmPassword: '',
  });

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'Escape' && isModalOpen) {
        dispatch(closeModal());
      }
    };

    if (isModalOpen && !user) {
      dispatch(getUserInfo());
    }

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isModalOpen, user, dispatch]);

  const onSubmit = (values, { setFieldError }) => {
    setIsSubmitBlocked(true);
    const { name, email, gender, old_password, new_password } = values;

    const hasChanges = name !== user?.name || email !== user?.email || gender !== user?.gender || new_password;

    if (hasChanges) {
      const promises = [];

      let hasError = false;

      // Оновлення пароля
      if (new_password) {
        promises.push(dispatch(updateUserPassword({ old_password, new_password }))
          .unwrap()
          .then((r) => r.message && toast.success(r.message))
          .catch((error) => {
            hasError = true;
            if (error.data.errors) {
              Object.entries(error.data.errors).forEach(([field, messages]) => {
                setFieldError(field, messages[0]); // Встановити помилку у відповідне поле
              });
            }
            toast.error(error.data.message);
          }));
      }

      // Оновлення іншої інформації
      if (name !== user?.name || email !== user?.email || gender !== user?.gender) {
        promises.push(dispatch(updateUserData({ name, email, gender }))
          .unwrap()
          .then((r) => r.message && toast.success(r.message))
          .catch((error) => {
            hasError = true;
            if (error.data.errors) {
              Object.entries(error.data.errors).forEach(([field, messages]) => {
                setFieldError(field, messages[0]);
              });
            }
            toast.error(error.data.message);
          }));
      }

      Promise.all(promises)
        .then((res) => {
          if (!hasError) {
            onClose(false);
          }
        })
        .catch((error) => {
          console.error(error.message);
        })
        .finally(() => {
          setIsSubmitBlocked(false);
        });
    } else {
      toast.error("You have not made any changes.");
      setIsSubmitBlocked(false);
    }
  };

  const handleAvatarChange = (e) => {
    setIsSubmitBlocked(true);
    const file = e.target.files[0];
    console.log('Selected file:', file);

    if (file) {
      const formData = new FormData();
      formData.append('avatar_url', file);

      dispatch(updateUserPhoto(formData))
        .unwrap()
        .then((r) => r.message && toast.success(r.message))
        .catch((error) => console.error(error.message))
        .finally(() => setIsSubmitBlocked(false));
    }
  };

  useEffect(() => {
    setInitialValues({
      avatar: user?.avatar_url || '/path/to/default-avatar.png',
      gender: user?.gender || 'female',
      name: user?.name || '',
      email: user?.email || '',
      old_password: '',
      new_password: '',
      confirmPassword: '',
    });
  }, [user]);

  return (<BaseModal
      isOpen={isModalOpen}
      onClose={onClose}
      className={css.settingModal}
    >
      <h2 className={css['name-header']}>Setting</h2>
      {message && (<div className={`${css.message} ${css[message.type]}`}>
          {message.text}
        </div>)}
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        {({ errors, touched, handleSubmit }) => (<Form
            className={css['form-container']}
            autoComplete="off"
            noValidate
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                handleSubmit();
              }
            }}
          >
            <ProfilePhoto
              avatar={user?.avatar_url || ''}
              isSubmitBlocked={isSubmitBlocked}
              handleAvatarChange={handleAvatarChange}
            />
            <div className={css['desktop-flex']}>
              <div className={css['desktop-left']}>
                <GenderChoice name="gender"/>
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
              <div className={css['desktop-right']}>
                <h3 className={css.subtitle}>Password</h3>
                <div className={css['password-group']}>
                  <PasswordField
                    label="Outdated password:"
                    name="old_password"
                    placeholder="Enter old password"
                    isHiddenPassword={state.old_password}
                    toggle={toggle}
                    isError={touched.old_password && errors.old_password}
                  />
                  <PasswordField
                    label="New password:"
                    name="new_password"
                    placeholder="Enter new password"
                    isHiddenPassword={state.new_password}
                    toggle={toggle}
                    isError={touched.new_password && errors.new_password}
                  />

                  <PasswordField
                    label="Repeat new password:"
                    name="confirmPassword"
                    placeholder="Repeat new password"
                    isHiddenPassword={state.confirmPassword}
                    toggle={toggle}
                    isError={touched.confirmPassword && errors.confirmPassword}
                  />
                </div>
              </div>
            </div>
            <div className={css['button-container']}>
              <button
                className={css['submit-button']}
                type="submit"
                disabled={isSubmitBlocked}
              >
                Save
              </button>
            </div>
          </Form>)}
      </Formik>
    </BaseModal>);
};

export default SettingModal;
