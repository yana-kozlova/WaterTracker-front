import css from "./ConfirmOAuth.module.css";
import { useEffect, useRef, useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loginWithGoogle } from "../../redux/auth/operations";
import {
  selectLoading,
  selectError,
  selectIsLoggedIn,
} from "../../redux/auth/selectors";
import toast from "react-hot-toast";
import DripLoader from "../../components/DripLoader/DripLoader";

const ConfirmOAuth = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isLoading = useSelector(selectLoading);

  const toastShownRef = useRef(false);
  const [isProcessing, setIsProcessing] = useState(true);

  const handleSuccess = useCallback(() => {
    if (!toastShownRef.current) {
      toastShownRef.current = true;
      toast.success("Successfully signed in with Google!");
      navigate("/home");
    }
  }, [navigate]);

  const handleError = useCallback(() => {
    if (!toastShownRef.current) {
      toastShownRef.current = true;
      toast.error("Authentication failed. Please try again.");
      navigate("/signin");
    }
  }, [navigate]);

  useEffect(() => {
    const confirmOAuth = async () => {
      if (toastShownRef.current) return;

      try {
        const urlParams = new URLSearchParams(window.location.search);
        const code = urlParams.get("code");

        if (!code) {
          throw new Error("No code provided");
        }

        setIsProcessing(true);
        const result = await dispatch(loginWithGoogle(code)).unwrap();
        if (result.token) {
          handleSuccess();
        } else {
          handleError();
        }
      } catch (error) {
        console.error("OAuth Error:", error);
        handleError();
      } finally {
        setIsProcessing(false);
      }
    };

    confirmOAuth();
  }, [dispatch, handleSuccess, handleError]);

  if (isLoading || isProcessing) {
    return (
      <>
        <div className={css.overlay}></div>
        <div className={css.loadContainer}>
          <DripLoader />
        </div>
      </>
    );
  }

  return null;
};

export default ConfirmOAuth;
