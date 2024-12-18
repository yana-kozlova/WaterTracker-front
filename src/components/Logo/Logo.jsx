import css from "./Logo.module.css";
import Icon from "../Svg/Svg";

export default function Logo() {
  return (
    <Icon
      name="Logo"
      size="100%"
      color="#9ebbff"
      className={css.iconLogo}
    />
  );
}
