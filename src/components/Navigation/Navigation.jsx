import { selectIsLoggedIn } from '../../redux/auth/selectors.js';
import UserAuth from "../UserAuth/UserAuth";
import UserLogo from "../UserLogo/UserLogo";
import { useSelector } from "react-redux";

function Navigation() {
  const isLoggedIn = useSelector(selectIsLoggedIn);

  return <nav>{isLoggedIn ? <UserLogo /> : <UserAuth />}</nav>;
}

export default Navigation;
