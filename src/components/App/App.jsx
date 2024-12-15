import { Route, Routes } from "react-router-dom";
import { lazy, Suspense } from "react";
import Layout from "../Layout/Layout.jsx";
import DripLoader from "../DripLoader/DripLoader.jsx";  

const MainPage = lazy(() => import("../../pages/MainPage/MainPage.jsx"));
const SigninPage = lazy(() => import("../../pages/SigninPage/SigninPage.jsx"));
const SignupPage = lazy(() => import("../../pages/SignupPage/SignupPage.jsx"));
const NotFoundPage = lazy(() => import("../../pages/NotFoundPage.jsx"));
const WelcomePage = lazy(() => import("../../pages/WelcomePage/WelcomePage.jsx")
);

export default function App() {
  return (
    <>
      <Suspense fallback={<DripLoader />}>
        <Routes>
          <Route path="/" element={<Layout />} />
          <Route path="/welcome" element={<WelcomePage />} />
          <Route path="/home" element={<MainPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/signin" element={<SigninPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
        </Suspense>
    </>
  );
}
