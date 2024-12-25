import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { getTodayWater } from '../../redux/water/operations.js';
import { selectTodayItem } from "../../redux/water/selectors";

import EditWater from "./EditWater/EditWater.jsx";
import DeleteWater from "./DeleteWater/DeleteWater.jsx";
import AddWater from "./AddWater/AddWater.jsx";


import capIcon from "../../assets/icons/cap.svg";
import editIcon from "../../assets/icons/edit.svg";
import deleteIcon from "../../assets/icons/delete.svg";

import css from "./TodayWaterList.module.css";

export default function TodayWaterList() {
  const dispatch = useDispatch();
  
  useEffect(() => {
    dispatch(getTodayWater())
  },[dispatch])

  const [isAddModalOpen, setIsAddModlOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditmodalOpen] = useState(false);
  const [waterId, setwaterId] = useState('')
  const [currentWater, setCurrentWater] = useState({})

  const openAddModal = () => {
    setIsAddModlOpen(true);
  };
  const closeAddModal = () => {
    setIsAddModlOpen(false);
  };

  const openDeleteModal = (id) => {
    setIsDeleteModalOpen(true);
    setwaterId(id)
  };
  const closeDeleteModal = () => {
    setIsDeleteModalOpen(false);
    setwaterId("");
  };

  const openEditModal = (water) => {
    setCurrentWater(water);
    setIsEditmodalOpen(true);
  };
  const closeEditModal = () => {
    setIsEditmodalOpen(false);
    setCurrentWater({})
  };

  const waterList = useSelector(selectTodayItem);

  useEffect(() => {
    dispatch(getTodayWater());
  }, [dispatch]);

  const timeFromDate = (date) => {
    const utcDate = new Date(date);
    return utcDate.toISOString().slice(11, 16);
  };

  return (
    <div className={css.container}>
      <h2 className={css.title}>Today</h2>
      <div className={css.listWrapper}>
        <ul className={css.list}>
          {waterList?.length > 0 ? (
            waterList
              .slice()
              .sort((a, b) => new Date(a.date) - new Date(b.date))
              .map(({ amount, date, _id }) => (
                <li className={css.item} key={_id}>
                  <div className={css.infoWrapper}>
                    <img src={capIcon} alt="Cap Icon" width="50" height="50" />
                    <p className={css.textVolume}>{amount}ml</p>
                    <p className={css.textTime}>{timeFromDate(date)}</p>
                  </div>
                  <div className={css.btnWrap}>
                    <button
                      className={css.btnEdit}
                      onClick={() => openEditModal({ amount, date, _id })}
                    >
                      <img
                        src={editIcon}
                        alt="Cap Icon"
                        width="50"
                        height="50"
                      />
                    </button>
                    <button
                      className={css.btnDelete}
                      onClick={() => openDeleteModal(_id)}
                    >
                      <img
                        src={deleteIcon}
                        alt="delete Icon"
                        width="50"
                        height="50"
                      />
                    </button>
                  </div>
                </li>
              ))
          ) : (
            <li>
              <p>No notes yet</p>
            </li>
          )}
        </ul>
      </div>
      <div className={css.btnAdd} onClick={() => openAddModal()}>
        + Add water
      </div>
      <AddWater isOpen={isAddModalOpen} onClose={closeAddModal} />
      <DeleteWater
        isOpen={isDeleteModalOpen}
        onClose={closeDeleteModal}
        id={waterId}
      />
      <EditWater
        isOpen={isEditModalOpen}
        onClose={closeEditModal}
        currentWater={currentWater}
      />
    </div>
  );
}