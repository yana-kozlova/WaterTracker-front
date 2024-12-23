import UserLogoutModal from '../../components/UserLogoutModal/UserLogoutModal.jsx';
import MonthStatsTable from '../../components/MonthStatsTable/MonthStatsTable.jsx'
import TodayWaterList from '../../components/TodayWaterList/TodayWaterList.jsx';

import css from './MainPage.module.css'

export default function MainPage() {
  return (
    <>
      <div className={css.waterContainer}>
        <TodayWaterList/>
        <MonthStatsTable />
      </div>;
    </>
  )
}
