import { Suspense } from "react";
import { Outlet } from "react-router-dom";

import Container from "../Container/Container.jsx";
import DripLoader from "../DripLoader/DripLoader.jsx";
import Header from "../Header/Header";

import css from "./Layout.module.css";

export default function Layout() {
  return (
    <>
      <div className={css.background}></div>
      <Header />
      <Container>
        {/* <DaysGeneralStats consumedWater={600} dailyNorm={1500} portions={5} selectedDate={new Date()}/> */}
        <Suspense fallback={<DripLoader />}>
          <Outlet />
        </Suspense>
      </Container>
    </>
  );
}
