import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import axios from "axios";

const ConfirmOAuth = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  useEffect(() => {
    let isProcessing = false;

    const confirmOAuth = async () => {
      if (isProcessing) return;
      isProcessing = true;

      const query = new URLSearchParams(location.search);
      const code = query.get("code");
      const error = query.get("error");

      if (error) {
        console.error("OAuth error:", error);
        navigate("/signin");
        return;
      }

      try {
        const response = await axios.post("/auth/confirm-oauth", { code });

        if (!response.data?.data?.accessToken) {
          throw new Error("No access token in response");
        }

        const token = response.data.data.accessToken;

        axios.defaults.headers.common.Authorization = `Bearer ${token}`;

        dispatch({
          type: "auth/login/fulfilled",
          payload: response.data,
        });

        navigate("/home", { replace: true });
      } catch (err) {
        console.error("OAuth Error:", {
          message: err.message,
          response: err.response?.data,
        });
        navigate("/signin");
      }
    };

    confirmOAuth();

    return () => {
      isProcessing = true;
    };
  }, [location, navigate, dispatch]);

  return (
    <div className="flex justify-center items-center min-h-screen">
      <p className="text-lg">Authenticating with Google...</p>
    </div>
  );
};

export default ConfirmOAuth;
