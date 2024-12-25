import BaseModal from "../../BaseModal/BaseModal.jsx";
import UserLogoutModal from "../../UserLogoutModal/UserLogoutModal.jsx";
import css from "./AuthorizedHeader.module.css";
import Icon from "../../Svg/Svg.jsx";
import SettingModal from "../../SettingModal/SettingModal.jsx";

import { useState } from "react";
import { useSelector } from "react-redux";
import { selectUser } from "../../../redux/auth/selectors.js";

export default function AuthorizedHeader() {
  const user = useSelector(selectUser);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [isSettingOpen, setIsSettingOpen] = useState(false);
  const [isOpenLogout, setIsOpenLogout] = useState(false);

  function getInitial() {
    if (user?.name) {
      return user.name.charAt(0).toUpperCase();
    } else if (user?.email) {
      return user.email.charAt(0).toUpperCase();
    }
    return "G";
  }

  function hasAvatar() {
    if (user?.avatar_url) {
      return <img src={user.avatar_url} alt={user.name} />;
    } else {
      return <span>{getInitial()}</span>;
    }
  }

  const openLogoutModal = () => {
    setIsOpenLogout(true);
  };
  const closeLogoutModal = () => {
    setIsOpenLogout(false);
    setIsPopupOpen(false);
  };

  function handleToggleLogoModal() {
    setIsPopupOpen(!isPopupOpen);
  }

  return (
    <div className={css.userLogo}>
      <div className={css.userButton} onClick={handleToggleLogoModal}>
        <span className={css.userButtonContent}>
          {user?.name || user?.email || "Guest"}
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
          <div
            className={css.actionLink}
            onClick={() => {
              setIsSettingOpen(true);
            }}
          >
            <Icon
              name="cog-6-toothoutline"
              color="#407bff"
              className={css.actionLinkIcon}
            />
            Settings
            <SettingModal
              isModalOpen={isSettingOpen}
              onClose={() => {
                setIsSettingOpen(false);
                setIsPopupOpen(false);
              }}
            />
          </div>
          <div className={css.actionLink} onClick={openLogoutModal}>
            <Icon
              name="arrow-right-on-rectangleoutline"
              color="#407bff"
              className={css.actionLinkIcon}
            />
            <div>Log out</div>
            <BaseModal isOpen={isOpenLogout} onClose={closeLogoutModal}>
              <UserLogoutModal onCloseLogout={closeLogoutModal} />
            </BaseModal>
          </div>
        </div>
      )}
    </div>
  );
}