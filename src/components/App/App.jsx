import { Route, Routes, Navigate} from "react-router-dom";
import { lazy, Suspense } from "react";
import Layout from "../Layout/Layout.jsx";
import DripLoader from "../DripLoader/DripLoader.jsx";
import { delayImport } from "../../utils/delayImport";

// імпорти з затримкою

const WelcomePage = lazy(() =>
  delayImport(() => import("../../pages/WelcomePage/WelcomePage.jsx"))
);
const MainPage = lazy(() =>
  delayImport(() => import("../../pages/MainPage/MainPage.jsx"))
);
const SigninPage = lazy(() =>
  delayImport(() => import("../../pages/SigninPage/SigninPage.jsx"))
);
const SignupPage = lazy(() =>
  delayImport(() => import("../../pages/SignupPage/SignupPage.jsx"))
);
const NotFoundPage = lazy(() =>
  delayImport(() => import("../../pages/NotFoundPage.jsx"))
);


// const MainPage = lazy(() => import("../../pages/MainPage/MainPage.jsx"));
// const SigninPage = lazy(() => import("../../pages/SigninPage/SigninPage.jsx"));
// const SignupPage = lazy(() => import("../../pages/SignupPage/SignupPage.jsx"));
// const NotFoundPage = lazy(() => import("../../pages/NotFoundPage.jsx"));
// const WelcomePage = lazy(() => import("../../pages/WelcomePage/WelcomePage.jsx")
// );

export default function App() {
  return (
    <>
      <Suspense fallback={<DripLoader />}>
        <Routes>
          <Route path="/" element={<Navigate to="/welcome" />} />
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
