import Button from "../../Buttons/Button/Button";
import css from "./DeleteWater.module.css";
import BaseModal from "../../BaseModal/BaseModal";
import { useDispatch } from "react-redux";
import {deleteWater} from '../../../redux/water/operations'

const DeleteWater = ({ isOpen, onClose, id }) => {
  
  const dispatch = useDispatch();
  if (!isOpen) return null;
  return (
    <div>
      <BaseModal isOpen={isOpen} onClose={onClose}>
        <div className={css.container}>
          <p className={css.title}>Delete entry</p>
          <p className={css.text}>Are you sure you want to delete the entry?</p>
          <div className={css.buttonContainer}>
            <Button
              type="button"
              name="Delete"
              className={css.buttonDelete}
              onClick={() => {
                dispatch(deleteWater(id));
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
