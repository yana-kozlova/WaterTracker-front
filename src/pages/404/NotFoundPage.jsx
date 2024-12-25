import css from "./NotFoundPage.module.css";

const NotFoundPage = () => {
  return (
    <div className={css.container}>
      <div className={css.background}></div>
      <div className={css.content}>
        <h1 className={css.errorCode}>404</h1>
        <p className={css.message}>Це помилка. Сторінку не знайдено.</p>
        <a href="/home" className={css.link}>
          Повернутися на головну
        </a>
      </div>
    </div>
  );
};

export default NotFoundPage;
