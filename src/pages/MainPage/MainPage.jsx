import UserLogoModal from '../../components/UserLogoModal/UserLogoModal.jsx';
import MonthStatsTable from '../../components/MonthStatsTable/MonthStatsTable.jsx'
import css from './MainPage.module.css'
import TodayWaterList from '../../components/TodayWaterList/TodayWaterList.jsx';

export default function MainPage() {
  return (
    <>
      <div style={{ marginTop: '150px' }}>
        <UserLogoModal />
      </div>
      <div className={css.waterContainer}>
        <TodayWaterList />
        <MonthStatsTable />
      </div>
    </>
  )
}
