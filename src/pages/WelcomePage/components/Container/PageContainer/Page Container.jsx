import css from './PageContainer.module.css';

export default function PageContainer({ children }) {
  return (<div className={css.pageContainer}>
    <div className={css.backgroundMain}></div>
    <div className={css.backgroundBubblesMain}></div>
    {children}
  </div>);
}