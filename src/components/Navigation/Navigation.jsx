import { NavLink } from "react-router-dom";
import Logo from "../Logo/Logo";
import UserAuth from "../UserAuth/UserAuth";

function Navigation() {
  return (
    <nav>
      <UserAuth />
    </nav>
  );
}

export default Navigation;
