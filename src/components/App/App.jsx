import { Route, Routes } from "react-router-dom";
import { lazy, Suspense } from 'react'
import Layout from "../Layout/Layout.jsx";

const WelcomePage = lazy(() => import('../../pages/WelcomePage/WelcomePage.jsx'));
const MainPage = lazy(() => import('../../pages/MainPage/MainPage.jsx'));
const SiginPage = lazy(() => import('../../pages/SigninPage/SigninPage.jsx'));
const SignupPage = lazy(() => import('../../pages/SignupPage/SignupPage.jsx'));
const NotFoundPage = lazy(() => import('../../pages/NotFoundPage.jsx'));


export default function App() {
    const isLoading = useLoading(3000); // Встановлюємо тривалість завантаження
  return (
    <>
      <Layout />
      <Suspense fallback={<div>Loading page...</div>}>
        <Routes>
          <Route path="/" element={<WelcomePage />} />
          <Route path="/home" element={<MainPage />} />
          <Route path="/signup" element={<SignupPage/>} />
          <Route path="/signin" element={<SiginPage/>} />
           <Route path="*" element={<NotFoundPage/>}/>
        </Routes>
      </Suspense>
      {isLoading && <DripLoader />}
      {!isLoading && <WelcomePage />}
    </>
  );
}
