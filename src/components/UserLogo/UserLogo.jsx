import css from "./UserLogo.module.css";
import Icon from "../Svg/Svg";
import BaseModal from "../BaseModal/BaseModal";

import { useState } from "react";
import { useSelector } from "react-redux";

export default function UserLogo() {
  // const user = useSelector();
  const [isModalOpen, setIsModalOpen] = useState(false);

  function handleOpenLogoModal() {}

  return (
    <button type="button" onClick={handleOpenLogoModal}>
      {/* {user.name} */}
      <Icon name="icon-close" color="#2f2f2f" className={css.iconUser} />
      <BaseModal></BaseModal>
    </button>
  );
}
