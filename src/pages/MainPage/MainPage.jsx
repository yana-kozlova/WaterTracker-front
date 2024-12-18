import UserLogoModal from '../../components/UserLogoModal/UserLogoModal.jsx';
import MonthStatsTable from '../../components/MonthStatsTable/MonthStatsTable.jsx'
import css from './MainPage.module.css'

export default function MainPage() {
  return (
    <>
      <div style={{ marginTop: '150px' }}>
        <UserLogoModal />
      </div>
      <div className={css.waterContainer}>
        <MonthStatsTable />
      </div>;
    </>
  )
}
