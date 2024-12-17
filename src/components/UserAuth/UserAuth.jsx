import { useNavigate } from "react-router-dom";
import Icon from "../Svg/Svg";
import css from "./UserAuth.module.css";

// Does not work icon-User in the Icon component(svg)!
function UserAuth() {
  const navigate = useNavigate();

  function handleSigninRedirect() {
    navigate("/signin");
  }

  return (
    <button type="button" onClick={handleSigninRedirect}>
      Sign In
      <Icon name="icon-close" color="#2f2f2f" className={css.iconUser} />
    </button>
  );
}

export default UserAuth;
