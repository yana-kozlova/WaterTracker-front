import React from "react";
import css from "./UserLogo.module.css";
import Icon from "../Svg/Svg";
import UserLogoModal from "../UserLogoModal/UserLogoModal";
import SettingModal from "../SettingModal/SettingModal";

import { useState, useEffect, useRef } from "react";

import { useSelector } from "react-redux";
import { selectUser } from "../../redux/auth/selectors";

export default function UserLogo() {
  const user = useSelector(selectUser);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const menuRef = useRef();

  function handleToggleLogoModal() {
    setIsModalOpen((prev) => !prev);
  }

  function handleEscapeKey(event) {
    if (event.key === "Escape") {
      setIsModalOpen(false);
    }
  }

  function handleOutsideClick(event) {
    // console.log(event.target);
    // console.log(isModalOpen);
    // console.log(menuRef.current);
    if (
      isModalOpen &&
      menuRef.current &&
      menuRef.current.contains(event.target)
    ) {
      setIsModalOpen(false);
    }
  }

  function getInitial() {
    if (user.name) {
      return user.name.charAt(0).toUpperCase();
    }
    return user.email.charAt(0).toUpperCase();
  }

  function hasAvatar() {
    if (user.avatarUrl) {
      return (
        <img href={user.avatarUrl} alt={user.name} width="28" height="28" />
      );
    } else return <span>{getInitial()}</span>;
  }

  useEffect(() => {
    if (isModalOpen) {
      document.addEventListener("click", handleOutsideClick);
      document.addEventListener("keydown", handleEscapeKey);
    } else {
      document.removeEventListener("click", handleOutsideClick);
      document.removeEventListener("keydown", handleEscapeKey);
    }
    return () => {
      document.removeEventListener("click", handleOutsideClick);
      document.removeEventListener("keydown", handleEscapeKey);
    };
  }, [isModalOpen]);

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
      {isModalOpen ? <MenuPopUp ref={menuRef} /> : ""}
    </div>
  );
}

const MenuPopUp = React.forwardRef(function MenuPopUp(props, ref) {
  return (
    <ul className={css.navActions} ref={ref}>
      <li className={css.actionLink}>
        <Icon
          name="cog-6-toothoutline"
          color="#407BFF"
          className={css.actionLinkIcon}
        />
        <SettingModal />
      </li>
      <li className={css.actionLink}>
        <Icon
          name="arrow-right-on-rectangleoutline"
          color="#407BFF"
          className={css.actionLinkIcon}
        />
        <UserLogoModal />
      </li>
    </ul>
  );
});
