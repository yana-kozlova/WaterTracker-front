import { Route, Routes } from "react-router-dom";
import { lazy, Suspense, useEffect } from "react";
import Layout from "../Layout/Layout.jsx";
import { useDispatch, useSelector } from 'react-redux';
import { refreshUser } from '../../redux/auth/operations.js';
import { selectIsRefreshing } from '../../redux/auth/selectors.js';
import PrivateRoute from '../../pages/Routes/PrivateRoute.jsx'
import PublicRegisterRoute from '../../pages/Routes/PublicRegisterRoute.jsx';
import PublicRoute from '../../pages/Routes/PublicRoute.jsx'
import { Navigate } from "react-router-dom";
import DripLoader from "../DripLoader/DripLoader.jsx";
import { Toaster } from "react-hot-toast";

// import DripLoader from "../DripLoader/DripLoader.jsx";
// import { delayImport } from "../../utils/delayImport";
// import { Toaster } from "react-hot-toast";

// імпорти з затримкою

// const WelcomePage = lazy(() =>
//   delayImport(() => import("../../pages/WelcomePage/WelcomePage.jsx"))
// );
// const MainPage = lazy(() =>
//   delayImport(() => import("../../pages/MainPage/MainPage.jsx"))
// );
// const SigninPage = lazy(() =>
//   delayImport(() => import("../../pages/SigninPage/SigninPage.jsx"))
// );
// const SignupPage = lazy(() =>
//   delayImport(() => import("../../pages/SignupPage/SignupPage.jsx"))
// );
// const NotFoundPage = lazy(() =>
//   delayImport(() => import("../../pages/NotFoundPage.jsx"))
// );

// const MainPage = lazy(() => import("../../pages/MainPage/MainPage.jsx"));
// const SigninPage = lazy(() => import("../../pages/SigninPage/SigninPage.jsx"));
// const SignupPage = lazy(() => import("../../pages/SignupPage/SignupPage.jsx"));
// const NotFoundPage = lazy(() => import("../../pages/NotFoundPage.jsx"));
// const WelcomePage = lazy(() => import("../../pages/WelcomePage/WelcomePage.jsx")
// );

// export default function App() {
//   return (
//     <>
//       <Toaster
//         toastOptions={{
//           duration: 5000,
//           style: {
//             background: "var(--primary-color-white)",
//             color: "var(--primary-color-black)",
//             boxShadow: "0px 8px 20px rgba(0, 0, 0, 0.3)",
//             borderRadius: "12px",
//             fontFamily: "var(--font-family)",
//             fontSize: "16px",
//             fontWeight: "bold",
//             padding: "12px 20px",
//           },

//           success: {
//             style: {
//               background: "var(--primary-color-blue)",
//               color: "var(--primary-color-white)",
//               border: "2px solid var(--secondary-color-4)",
//             },
//             iconTheme: {
//               primary: "var(--primary-color-white)",
//               secondary: "var(--primary-color-blue)",
//             },
//           },

//           error: {
//             style: {
//               background: "var(--secondary-color-3)",
//               color: "var(--primary-color-white)",
//               border: "2px solid var(--secondary-color-5)",
//             },
//             iconTheme: {
//               primary: "var(--primary-color-white)",
//               secondary: "var(--secondary-color-3)",
//             },
//           },
//         }}
//         position="top-right"
//         reverseOrder={false}
//       />
//       <Suspense fallback={<DripLoader />}>
//         <Routes>
//           <Route path="/" element={<Navigate to="/welcome" />} />
//           <Route path="/" element={<Layout />} />
//           <Route path="/welcome" element={<WelcomePage />} />
//           <Route path="/home" element={<MainPage />} />
//           <Route path="/signup" element={<SignupPage />} />
//           <Route path="/signin" element={<SigninPage />} />
//           <Route path="*" element={<NotFoundPage />} />
//         </Routes>
//       </Suspense>
//     </>
//   );
// }

const WelcomePage = lazy(() => import('../../pages/WelcomePage/WelcomePage.jsx'));
const MainPage = lazy(() => import('../../pages/MainPage/MainPage.jsx'));
const SigninPage = lazy(() => import('../../pages/SigninPage/SigninPage.jsx'));
const SignupPage = lazy(() => import('../../pages/SignupPage/SignupPage.jsx'));
const NotFoundPage = lazy(() => import('../../pages/NotFoundPage.jsx'));

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
            color: "var(--primary-color-black)",
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
              <Route path="/welcome" element={<PublicRoute component={WelcomePage} redirectTo="/home" />} />
              <Route path="/home" element={<PrivateRoute component={MainPage} redirectTo="/signin" />} />
              <Route path="/signup" element={<PublicRegisterRoute component={SignupPage} redirectTo="/signin" />} />
              <Route path="/signin" element={<PublicRoute component={SigninPage} redirectTo="/home" />} />
              <Route path="*" element={<NotFoundPage />} />
            </Route>
          </Routes>
        </Suspense>
      )}
    </>
  );
}
