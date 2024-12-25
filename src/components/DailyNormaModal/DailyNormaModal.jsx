import DailyNormaForm from "../DailyNormaForm/DailyNormaForm";
import css from "./DailyNormaModal.module.css";

const DailyNormaModal = ({ onClose }) => {
  return (
    <div className={css.content}>
      <div>
        <p className={css.title}>My daily norma</p>
      </div>
      <div className={css.calculateBox}>
        <p className={css.calculate}>
          For girl:
          <span className={css.calculateSpan}>V=(M*0,03) + (T*0,4)</span>
        </p>
        <p className={css.calculate}>
          For men:
          <span className={css.calculateSpan}>V=(M*0,04) + (T*0,6)</span>
        </p>
      </div>
      <div className={css.calculateExplainBox}>
        <p className={css.calculateExplainText}>
          <span className={css.calculateExplainSpan}>*</span>V is the volume of
          the water norm in liters per day, M is your body weight, T is the time
          of active sports, or another type of activity commensurate in terms of
          loads (in the absence of these, you must set 0)
        </p>
      </div>
      <p className={css.calculateRate}>Calculate your rate:</p>
      <DailyNormaForm onClose={onClose} />
    </div>
  );
};

export default DailyNormaModal;
