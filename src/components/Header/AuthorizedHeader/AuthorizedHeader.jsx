import css from "./AuthorizedHeader.module.css";
import Icon from "../../Svg/Svg.jsx";
import UserLogoModal from "../../UserLogoModal/UserLogoModal.jsx";
import SettingModal from "../../SettingModal/SettingModal.jsx";

import { useState } from "react";
import { useSelector } from "react-redux";
import { selectUser } from "../../../redux/auth/selectors.js";
import { Link } from "react-router-dom";

export default function AuthorizedHeader() {
  const user = useSelector(selectUser);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [isSettingOpen, setIsSettingOpen] = useState(false);

  function handleToggleLogoModal() {
    setIsPopupOpen(!isPopupOpen);
  }

  function getInitial() {
    if (user.name) {
      return user.name.charAt(0).toUpperCase();
    }
    return 'U';
  }

  function hasAvatar() {
    if (user.avatarUrl) {
      return <img href={user.avatarUrl} alt={user.name} />;
    } else return <span>{getInitial()}</span>;
  }

  return (
    <div className={css.userLogo}>
      <div className={css.userButton} onClick={handleToggleLogoModal}>
        <span className={css.userButtonContent}>
          {user.name || user.email}
          <span className={css.avatarCircle}>{hasAvatar()}</span>
          <Icon
            name="chevron-double-upsolid"
            color="#2f2f2f"
            className={css.iconUser}
          />
        </span>
      </div>
      {isPopupOpen && (
        <div className={css.navActions}>
          <div className={css.actionLink} onClick={() => setIsSettingOpen(!isSettingOpen)}>
            <Icon
              name="cog-6-toothoutline"
              color="#407bff"
              className={css.actionLinkIcon}
            />
            Settings
            <SettingModal isModalOpen={isSettingOpen} onClose={() => setIsPopupOpen(false)} />
          </div>
          <div className={css.actionLink}>
            <Icon
              name="arrow-right-on-rectangleoutline"
              color="#407bff"
              className={css.actionLinkIcon}
            />
            <UserLogoModal />
          </div>
        </div>
      )}
    </div>
  );
}
