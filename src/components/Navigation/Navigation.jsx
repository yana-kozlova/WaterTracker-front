import { NavLink } from "react-router-dom";
import Logo from "../Logo/Logo";
import UserAuth from "../UserAuth/UserAuth";
import UserLogo from "../UserLogo/UserLogo";

import { useSelector } from "react-redux";

function Navigation() {
  const isLoggedIn = useSelector();

  return <nav>{isLoggedIn ? <UserLogo /> : <UserAuth />}</nav>;
}

export default Navigation;
