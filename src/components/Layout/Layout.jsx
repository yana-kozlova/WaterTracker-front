import { Suspense } from "react";
import { Outlet } from "react-router-dom";
// import DaysGeneralStats from '../DaysGeneralStats/DaysGeneralStats.jsx';
import DripLoader from '../DripLoader/DripLoader.jsx';
import Header from "../Header/Header";
// import BaseModal from "../BaseModal/BaseModal.jsx";
// import WaterRatioPanel from "../WaterRatioPanel/WaterRatioPanel.jsx"
// import TodayListModal from "../TodayListModal/TodayListModal.jsx"

export default function Layout() {
  return (
    <>
    {/* <BaseModal isOpen={true}> /*додаємо модалку*/ */}
        {/* <TodayListModal/> /*вкладаємо свій компонент*/ */}
      {/* </BaseModal> */}
      <Header />
      {/* <DaysGeneralStats consumedWater={600} dailyNorm={1500} portions={5} selectedDate={new Date()}/> */}
      <Suspense fallback={<DripLoader />}>
        <Outlet />
      </Suspense>
    </>
  );
}
