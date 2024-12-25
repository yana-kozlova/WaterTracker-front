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
  const isTodayWaterLoaded = useSelector(selectIsTodayWaterLoaded);  // Селектор для проверки, загружена ли сегодняшняя вода
  const isMonthWaterLoaded = useSelector(selectIsMonthWaterLoaded);  // Селектор для проверки, загружен ли месячный запас воды

  const hasDispatchedTodayRef = useRef(false);  // ref для отслеживания запроса для сегодняшней воды
  const hasDispatchedMonthRef = useRef(false);  // ref для отслеживания запроса для месячной воды

  useEffect(() => {
    const fetchWaterData = async () => {
      if (!hasDispatchedTodayRef.current && !isTodayWaterLoaded) {
        hasDispatchedTodayRef.current = true;  // Помечаем, что запрос был отправлен
        await dispatch(getTodayWater());  // Дожидаемся выполнения запроса
      }

      if (!hasDispatchedMonthRef.current && !isMonthWaterLoaded) {
        hasDispatchedMonthRef.current = true;  // Помечаем, что запрос был отправлен
        await dispatch(getMonthWater());  // Дожидаемся выполнения запроса
      }
    };

    fetchWaterData();  // Вызовем нашу асинхронную функцию

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
