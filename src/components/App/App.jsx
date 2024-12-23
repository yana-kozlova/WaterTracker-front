import { Route, Routes } from "react-router-dom";
import { lazy, Suspense, useEffect } from "react";
import Layout from "../Layout/Layout.jsx";
import { useDispatch, useSelector } from "react-redux";
import { refreshUser } from "../../redux/auth/operations.js";
import { selectIsRefreshing } from "../../redux/auth/selectors.js";
import PrivateRoute from "../.././routes/PrivateRoute.jsx";
import PublicRegisterRoute from "../.././routes/PublicRegisterRoute.jsx";
import PublicRoute from "../.././routes/PublicRoute.jsx";
import { Navigate } from "react-router-dom";
import DripLoader from "../DripLoader/DripLoader.jsx";
import { Toaster } from "react-hot-toast";
// Імпортуємо компонент SettingModal
import SettingModal from "../SettingModal/SettingModal.jsx";
import ConfirmOAuth from "../../pages/ConfirmOAuth/ConfirmOAuth.jsx";


const WelcomePage = lazy(
  () => import("../../pages/WelcomePage/WelcomePage.jsx")
);
const MainPage = lazy(() => import("../../pages/MainPage/MainPage.jsx"));
const SigninPage = lazy(() => import("../../pages/SigninPage/SigninPage.jsx"));
const SignupPage = lazy(() => import("../../pages/SignupPage/SignupPage.jsx"));
const NotFoundPage = lazy(() => import("../../pages/NotFoundPage.jsx"));

export default function App() {
  const dispatch = useDispatch();
  const isRefreshing = useSelector(selectIsRefreshing);

  useEffect(() => {
    dispatch(refreshUser());
  }, [dispatch]);

  return (
    <>
      <Toaster
        toastOptions={{
          duration: 5000,
          style: {
            background: "var(--primary-color-white)",
            color: "var(--primary-text-color)",
            boxShadow: "0px 8px 20px rgba(0, 0, 0, 0.3)",
            borderRadius: "12px",
            padding: "12px 20px",
          },
          success: {
            style: { background: "var(--primary-color-blue)", color: "white" },
          },
          error: {
            style: { background: "var(--secondary-color-3)", color: "white" },
          },
        }}
        position="top-right"
        reverseOrder={false}
      />

      {!isRefreshing && (
        <Suspense fallback={<DripLoader />}>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<Navigate to="/welcome" />} />
              <Route
                path="/welcome"
                element={
                  <PublicRoute component={WelcomePage} redirectTo="/home" />
                }
              />
              <Route
                path="/home"
                element={
                  <PrivateRoute component={MainPage} redirectTo="/signin" />
                }
              />
              <Route
                path="/signup"
                element={
                  <PublicRegisterRoute
                    component={SignupPage}
                    redirectTo="/signin"
                  />
                }
              />
              <Route
                path="/signin"
                element={
                  <PublicRoute component={SigninPage} redirectTo="/home" />
                }
              />
              <Route
                path="/welcome"
                element={
                  <PublicRoute component={WelcomePage} redirectTo="/home" />
                }
              />
              <Route
                path="/home"
                element={
                  <PrivateRoute component={MainPage} redirectTo="/signin" />
                }
              />
              <Route
                path="/signup"
                element={
                  <PublicRegisterRoute
                    component={SignupPage}
                    redirectTo="/signin"
                  />
                }
              />
              <Route
                path="/signin"
                element={
                  <PublicRoute component={SigninPage} redirectTo="/home" />
                }
              />
              <Route path="/confirm-oauth" element={<ConfirmOAuth />} />
              <Route path="*" element={<NotFoundPage />} />
            </Route>
          </Routes>
          {/* Додаємо SettingModal */}
          <SettingModal />
        </Suspense>
      )}
    </>
  );
}
