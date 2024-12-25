
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectIsLoggedIn, selectIsRefreshing } from "../redux/auth/selectors.js";


export default function PrivateRoute({ redirectTo = "/", component: Component }) {

  const isLoggedIn = useSelector(selectIsLoggedIn);
  const isRefreshing = useSelector(selectIsRefreshing);

  const requireRedirect = !isLoggedIn && !isRefreshing;

  //   console.log("PrivateRoute: isLoggedIn:", isLoggedIn);
  // console.log("PrivateRoute: isRefreshing:", isRefreshing);
  // console.log("PrivateRoute: Component:", Component);

  return requireRedirect ? <Navigate to={redirectTo} /> : <Component />;

};

