import { logout } from "../../redux/auth/operations";
import Button from "../Buttons/Button/Button";
import css from "./UserLogoutModal.module.css";
import { useDispatch } from "react-redux";

const LogoutModal = ({ onCloseLogout }) => {
  const dispatch = useDispatch();
  return (
    <div className={css.container}>
      <p className={css.title}>Log out</p>
      <p className={css.text}>Do you really want to leave?</p>
      <div className={css.buttonContainer}>
        <Button
          type="button"
          name="Log out"
          className={css.buttonLogout}
          onClick={() => {
            dispatch(logout());
            onCloseLogout();
          }}
        />
        <Button
          type="button"
          name="Cancel"
          className={css.buttonCancel}
          onClick={onCloseLogout}
        />
      </div>
    </div>
  );
};

export default LogoutModal;
