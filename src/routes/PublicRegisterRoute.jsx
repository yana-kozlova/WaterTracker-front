import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { selectIsLoggedIn, selectIsRegistered } from "../redux/auth/selectors.js";


export default function PublicRegisterRoute({ redirectTo = "/", component: Component }) {
    const isRegistered = useSelector(selectIsRegistered); 
    const isLoggedIn = useSelector(selectIsLoggedIn); 

    return isRegistered ? (<Navigate to={redirectTo} />) : isLoggedIn ? (<Navigate to="/home" />) : (<Component />);
};