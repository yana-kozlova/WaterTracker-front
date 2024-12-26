import { useState } from 'react';
import Button from "../../Buttons/Button/Button";
import DripLoader from '../../DripLoader/DripLoader.jsx';
import css from "./DeleteWater.module.css";
import BaseModal from "../../BaseModal/BaseModal";
import { useDispatch } from "react-redux";
import { deleteWater, getMonthWater } from '../../../redux/water/operations'

const DeleteWater = ({ isOpen, onClose, id }) => {
  const [isLoading, setIsLoading] = useState(false);
  
  const dispatch = useDispatch();
  if (!isOpen) return null;
  return (
    <div>
      <BaseModal isOpen={isOpen} onClose={onClose}>
        <div className={css.container}>
          {isLoading && <DripLoader />}
          <p className={css.title}>Delete entry</p>
          <p className={css.text}>Are you sure you want to delete the entry?</p>
          <div className={css.buttonContainer}>
            <Button
              type="button"
              name="Delete"
              className={css.buttonDelete}
              onClick={async () => {
                setIsLoading(true);
                await dispatch(deleteWater(id));
                setIsLoading(false);
                dispatch(getMonthWater());
                onClose();
              }}
            />
            <Button
              type="button"
              name="Cancel"
              className={css.buttonCancel}
              onClick= {onClose}
            />
          </div>
        </div>
      </BaseModal>
    </div>
  );
};

export default DeleteWater;
