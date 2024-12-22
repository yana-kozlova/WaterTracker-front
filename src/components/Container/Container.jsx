import classNames from "classnames";

import css from "./Container.module.css";

const Container = ({ children, className }) => {
  const containerStyles = classNames(css.container, className);

  return <div className={containerStyles}>{children}</div>;
};

export default Container;
