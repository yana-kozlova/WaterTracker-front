import { useDispatch, useSelector } from "react-redux"
import css from "./TodayWaterList.module.css"
import { useEffect, useState } from "react";
import getWater from '../../redux/water/operations.js';
import { selectWaterItem } from "../../redux/water/selectors";
import EditWater from "./EditWater.jsx";
import DeleteWater from "./DeleteWater.jsx";
import AddWater from "./AddWater.jsx";


export default function TodayWaterList() {
  const dispatch = useDispatch();
  const [modalType, setModalType] = useState(null);
  const [currentWater, setCurrentWater] = useState(null);
  
  useEffect(() => {
    dispatch(getWater());
  }, [dispatch]);

  const { waterItems } = useSelector(selectWaterItem);

  const openModal = (type, water = null) => {
    setModalType(type);
    setCurrentWater(water);
  };

  const closeModal = () => {
    setModalType(null);
    setCurrentWater(null);
  };



  const timeFromDate = date => {
    return new Date(date).toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <div className={css.container}>
      <h2 className={css.title}>Today</h2>
      <div className={css.listWrapper}>
        <ul className={css.list}>
          {waterItems?.length > 0 &&
            waterItems
              .slice()
              .sort((a, b) => new Date(a.date) - new Date(b.date))
              .map(({ amount, date, _id }) => (
                <li className={css.item} key={_id}>
                  <div className={css.infoWrapper}>
                    <svg className={css.iconCup}>
                      <use href="/public/svg/today.svg#icon-cup" alt="Cup Icon"></use>
                    </svg>
                    <p className={css.textVolume}>{amount}ml</p>
                    <p className={css.textTime}>{timeFromDate(date)}</p>
                  </div>
                  <div className={css.btnWrap}>
                    <button className={css.btnEdit} onClick={() => openModal('EDIT', { amount, date, _id })}>
                      <svg className={css.iconEdit}>
                        <use href="/public/svg/today.svg#pencil-squareoutline" alt="Edit Icon"></use>
                      </svg>
                    </button>
                    <button className={css.btnDelete} onClick={() => openModal('DELETE', { _id })}>
                      <svg className={css.iconDelete}>
                        <use href="/public/svg/today.svg#trashoutline" alt="Delete Icon"></use>
                      </svg>
                    </button>
                  </div>
                </li>
              ))}
          <li>
            <button className={css.btnAdd} onClick={() => openModal('ADD')}>
              <svg className={css.iconAdd}>
                <use href="/public/svg/today.svg#plus-smalloutline" alt="Add Icon"></use>
              </svg>
              Add water
            </button>
          </li>
        </ul>
      </div>
      {modalType === 'ADD' && <AddWater closeModal={closeModal} />}
      {modalType === 'EDIT' && (
        <EditWater water={currentWater} closeModal={closeModal} />
      )}
      {modalType === 'DELETE' && (
        <DeleteWater water={currentWater} closeModal={closeModal} />
      )}
    </div>
  )
}