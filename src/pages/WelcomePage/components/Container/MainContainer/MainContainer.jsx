import css from './MainContainer.module.css';
import Main from '../../Main/Main';

export default function MainContainer() {
  return (
    <div className={css.MainContainer}>
      <Main />
    </div>
  );
}