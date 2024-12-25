import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import MonthStatsTable from '../../components/MonthStatsTable/MonthStatsTable.jsx'
import DailyNorma from '../../components/DailyNorma/DailyNorma.jsx';
import TodayWaterList from '../../components/TodayWaterList/TodayWaterList.jsx';
import WaterRatioPanel from '../../components/WaterRatioPanel/WaterRatioPanel.jsx';

import { getMonthWater, getTodayWater } from '../../redux/water/operations.js';
import { selectIsMonthWaterLoaded, selectIsTodayWaterLoaded } from '../../redux/water/selectors.js';

import css from './MainPage.module.css'

export default function MainPage() {
    const dispatch = useDispatch();
  const isTodayWaterLoaded = useSelector(selectIsTodayWaterLoaded);
  const isMonthWaterLoaded = useSelector(selectIsMonthWaterLoaded);

  const hasDispatchedTodayRef = useRef(false);
  const hasDispatchedMonthRef = useRef(false);

  useEffect(() => {
    const fetchWaterData = async () => {
      if (!hasDispatchedTodayRef.current && !isTodayWaterLoaded) {
        hasDispatchedTodayRef.current = true;
        await dispatch(getTodayWater());
      }

      if (!hasDispatchedMonthRef.current && !isMonthWaterLoaded) {
        hasDispatchedMonthRef.current = true;
        await dispatch(getMonthWater());
      }
    };

    fetchWaterData();

  }, [dispatch, isTodayWaterLoaded, isMonthWaterLoaded]);
  return (
    <>
      <div className={css.background}></div>
      <div className={css.mainContainer}>
        <div className={css.bottle}>
          <div className={css.dailyNorma}>
            <DailyNorma />
          </div>
          <WaterRatioPanel />
        </div>
        <div className={css.waterContainer}>
          <TodayWaterList />
          <MonthStatsTable />
        </div>
      </div>
    </>
  );
}
