import { useState} from "react";
import DailyNormaModal from "../DailyNormaModal/DailyNormaModal";
import styles from "./DailyNorma.module.css";
import BaseModal from "../BaseModal/BaseModal";
import { useSelector } from "react-redux";
import { selectUser } from "../../redux/user/selectors";


const DailyNorma = () => {
  
  const data = useSelector(selectUser);
  const userDailyNorma = data.daily_norma / 1000;
  
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleEditClick = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className={styles["daily-norma"]}>
      <p className={styles["daily-norma-p"]}>My daily norma </p>
      <div className={styles["edit-container"]}>
        <p className={styles["daily-norma-l"]}>{userDailyNorma} L</p>
        <button className={styles["edit-button"]} onClick={handleEditClick}>
          Edit
        </button>
        <BaseModal isOpen={isModalOpen} onClose={closeModal}>
          <DailyNormaModal onClose={closeModal}/>
        </BaseModal>
      </div>
    </div>
  );
};

export default DailyNorma;
