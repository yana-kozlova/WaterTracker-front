import css from "./UserLogo.module.css";
import Icon from "../Svg/Svg";

export default function Logo() {
  return (
    <Icon
      name="icon-User"
      size="100%"
      color="curentColor"
      className={css.iconLogo}
    />
  );
}
