import { Suspense } from "react";
import { Outlet } from "react-router-dom";
import DripLoader from '../DripLoader/DripLoader.jsx';
import Header from "../Header/Header";

export default function Layout() {
  return (
    <>
      <Header />
      <Suspense fallback={<DripLoader />}>
        <Outlet />
      </Suspense>
    </>
  );
}
