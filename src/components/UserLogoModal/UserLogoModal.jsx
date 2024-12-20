import BaseModal from "../BaseModal/BaseModal";
import { useState } from "react";
import UserLogoutModal from "../UserLogoutModal/UserLogoutModal";
// import Button from '../Buttons/Button/Button';

const UserLogoModal = () => {
  const [isOpenLogout, setIsopenLogout] = useState(false);

  const openLogoutModal = () => setIsopenLogout(true);
  const closeLogoutModal = () => setIsopenLogout(false);

  return (
    <div>
      <button type="button" onClick={openLogoutModal}>
        Log out
      </button>
      <BaseModal isOpen={isOpenLogout} onClose={closeLogoutModal}>
        <UserLogoutModal onCloseLogout={closeLogoutModal} />
      </BaseModal>
    </div>
  );
};

export default UserLogoModal;
