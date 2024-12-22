import { Suspense } from 'react';
import { Outlet } from 'react-router-dom';
import Container from '../Container/Container.jsx';
// import DaysGeneralStats from '../DaysGeneralStats/DaysGeneralStats.jsx';
import DripLoader from '../DripLoader/DripLoader.jsx';
import Header from '../Header/Header';
import css from '../Header/Header.module.css';
// import BaseModal from "../BaseModal/BaseModal.jsx";
// import WaterRatioPanel from "../WaterRatioPanel/WaterRatioPanel.jsx"
// import TodayListModal from "../TodayListModal/TodayListModal.jsx"

export default function Layout() {
  return (<>
      <Header/>
      <Container>
        {/* <DaysGeneralStats consumedWater={600} dailyNorm={1500} portions={5} selectedDate={new Date()}/> */}
        <Suspense fallback={<DripLoader/>}>
          <Outlet/>
        </Suspense>
      </Container>
    </>);
}
