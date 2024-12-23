import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loginWithGoogle } from "../../redux/auth/operations";
import { selectLoading, selectError } from "../../redux/auth/selectors";
import toast from "react-hot-toast";

const ConfirmOAuth = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isLoading = useSelector(selectLoading);
  const error = useSelector(selectError);

  useEffect(() => {
    const confirmOAuth = async () => {
      try {
        const urlParams = new URLSearchParams(window.location.search);
        const code = urlParams.get("code");

        if (!code) {
          toast.error("Authorization code not found");
          navigate("/signin");
          return;
        }

        const resultAction = await dispatch(loginWithGoogle(code));

        if (loginWithGoogle.fulfilled.match(resultAction)) {
          toast.success("Successfully signed in with Google!");
          navigate("/home");
        } else if (loginWithGoogle.rejected.match(resultAction)) {
          toast.error("Sign in failed. Please try again.");
          navigate("/signin");
        }
      } catch (error) {
        console.error("OAuth Error:", error);
        toast.error("Authentication failed. Please try again.");
        navigate("/signin");
      }
    };

    confirmOAuth();
  }, [dispatch, navigate]);

  if (isLoading) {
    return (
      <div>
        <p>Signing in with Google...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-red-500">Authentication failed. Redirecting...</p>
      </div>
    );
  }

  return null;
};

export default ConfirmOAuth;
