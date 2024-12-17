import { Suspense } from "react";
import { Outlet } from "react-router-dom";
// import DaysGeneralStats from '../DaysGeneralStats/DaysGeneralStats.jsx';
import DripLoader from '../DripLoader/DripLoader.jsx';
import Header from "../Header/Header";

export default function Layout() {
  return (
    <>
      <Header />
      {/* <DaysGeneralStats consumedWater={600} dailyNorm={1500} portions={5} selectedDate={new Date()}/> */}
      <Suspense fallback={<DripLoader />}>
        <Outlet />
      </Suspense>
    </>
  );
}
