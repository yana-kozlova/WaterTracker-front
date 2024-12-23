import Button from "../../Buttons/Button/Button";
import css from "./DeleteWater.module.css";

const DeleteWater = () => {
  return (
    <div className={css.container}>
      <p className={css.title}>Delete entry</p>
      <p className={css.text}>Are you sure you want to delete the entry?</p>
      <div className={css.buttonContainer}>
        <Button
          type="button"
          name="Delete"
          className={css.buttonDelete}
          onClick={() => {}}
        />
        <Button type="button" name="Cancel" className={css.buttonCancel} />
      </div>
    </div>
  );
};

export default DeleteWater;
