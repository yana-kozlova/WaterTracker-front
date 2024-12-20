import css from "./UserLogo.module.css";
import Icon from "../Svg/Svg";
import UserLogoModal from "../UserLogoModal/UserLogoModal";
import SettingModal from "../SettingModal/SettingModal";

import { useState } from "react";
import { useSelector } from "react-redux";
import { selectUser } from "../../redux/auth/selectors";
import { Link } from "react-router-dom";

export default function UserLogo() {
  const user = useSelector(selectUser);
  // console.log(user);
  const [isModalOpen, setIsModalOpen] = useState(false);

  function handleToggleLogoModal() {
    setIsModalOpen(!isModalOpen);
  }

  function getInitial() {
    if (user.name) {
      return user.name.charAt(0).toUpperCase();
    }
    return user.email.charAt(0).toUpperCase();
  }

  function hasAvatar() {
    if (user.avatarUrl) {
      return <img href={user.avatarUrl} alt={user.name} />;
    } else return <span>{getInitial()}</span>;
  }

  return (
    <div className={css.userLogo}>
      <button className={css.userButton} onClick={handleToggleLogoModal}>
        <span className={css.userButtonContent}>
          {user.name || user.email}
          <span className={css.avatarCircle}>{hasAvatar()}</span>
          <Icon
            name="chevron-double-upsolid"
            color="#2f2f2f"
            className={css.iconUser}
          />
        </span>
      </button>
      {isModalOpen && (
        <div className={css.navActions}>
          <div className={css.actionLink}>
            <Icon
              name="cog-6-toothoutline"
              color="#407BFF"
              className={css.actionLinkIcon}
            />
            <SettingModal />
          </div>
          <div className={css.actionLink}>
            <Icon
              name="arrow-right-on-rectangleoutline"
              color="#407BFF"
              className={css.actionLinkIcon}
            />
            <UserLogoModal />
          </div>
        </div>
      )}
    </div>
  );
}
