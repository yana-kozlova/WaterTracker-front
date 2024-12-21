
import css from './PageContainer.module.css';

export default function PageContainer({ children }) {
  return (<div className={css.pageContainer} >{children}</div>);
}