import { useNavigate } from "react-router-dom";
import UserLogo from "../UserLogo/UserLogo";

function UserAuth() {
  const navigate = useNavigate();

  function handleSigninRedirect() {
    navigate("/signin");
  }

  return (
    <button type="button" onClick={handleSigninRedirect}>
      Sign In <UserLogo />
    </button>
  );
}

export default UserAuth;
