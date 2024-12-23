import { selectIsLoggedIn } from '../../../redux/auth/selectors.js';
import UnauthorizedHeader from "../UnauthorizedHeader/UnauthorizedHeader.jsx";
import AuthorizedHeader from "../AuthorizedHeader/AuthorizedHeader.jsx";
import { useSelector } from "react-redux";

function Navigation() {
  const isLoggedIn = useSelector(selectIsLoggedIn);

  return <nav>{isLoggedIn ? <AuthorizedHeader /> : <UnauthorizedHeader />}</nav>;
}

export default Navigation;
