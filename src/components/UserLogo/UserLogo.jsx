import css from "./UserLogo.module.css";
import Icon from "../Svg/Svg";
import UserLogoModal from "../UserLogoModal/UserLogoModal";

import { useState } from "react";
import { useSelector } from "react-redux";
import { selectUser } from "../../redux/auth/selectors";

export default function UserLogo() {
  const user = useSelector(selectUser);

  const [isModalOpen, setIsModalOpen] = useState(false);

  function handleToggleLogoModal() {
    setIsModalOpen(!isModalOpen);
  }

  function getInitial() {
    if (user.data.name) {
      return user.data.name.charAt(0).toUpperCase();
    }
    return user.data.email.charAt(0).toUpperCase();
  }

  function hasAvatar() {
    if (user.data.avatarUrl) {
      return <img href={user.data.avatarUrl} alt={user.data.name} />;
    } else return <span>{getInitial()}</span>;
  }

  return (
    <button className={css.userButton} onClick={handleToggleLogoModal}>
      <span>{user.data.name || user.data.email}</span>
      {hasAvatar()}
      <Icon
        name="chevron-double-upsolid"
        color="#2f2f2f"
        className={css.iconUser}
      />
      {isModalOpen && <UserLogoModal onClose={handleToggleLogoModal} />}
    </button>
  );
}
