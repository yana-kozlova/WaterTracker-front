import MonthStatsTable from '../../components/MonthStatsTable/MonthStatsTable.jsx'
import css from './MainPage.module.css'
// import TodayWaterList from '../../components/TodayWaterList/TodayWaterList.jsx';
import DailyNorma from '../../components/DailyNorma/DailyNorma.jsx';
import TodayWaterList from '../../components/TodayWaterList/TodayWaterList.jsx';


export default function MainPage() {
  return (
    <>
      <div className={css.background}></div>
      <div className={css.mainContainer}>
        <div className={css.bottle}>
          <div className={css.dailyNorma}>
            <DailyNorma />
          </div>
        </div>
        <div className={css.waterContainer}>
          <TodayWaterList />
          <MonthStatsTable />
        </div>
      </div>
      <div className={css.waterContainer}>
        <TodayWaterList />
        <MonthStatsTable />
      </div>
    </>
  )
}
