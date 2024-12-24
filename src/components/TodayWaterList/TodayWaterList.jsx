import { useDispatch, useSelector } from "react-redux"
import React, { useEffect, useState } from "react";
// import { getWater } from '../../redux/water/operations.js';
import { selectTodayItem } from '../../redux/water/selectors';

import EditWater from "./EditWater/EditWater.jsx";
import DeleteWater from "./DeleteWater/DeleteWater.jsx";
import AddWater from "./AddWater/AddWater.jsx";


import capIcon from "../../assets/icons/cap.svg";
import editIcon from "../../assets/icons/edit.svg";
import deleteIcon from "../../assets/icons/delete.svg";

import css from "./TodayWaterList.module.css"


export default function TodayWaterList() {
  const dispatch = useDispatch();
  const [modalType, setModalType] = useState(null);
  const [currentWater, setCurrentWater] = useState(null);
  
  // useEffect(() => {
  //   dispatch(getWater());
  // }, [dispatch]);

  const waterList = useSelector(selectTodayItem);

  console.log(waterList);

  // const waterList = [
  //   {
  //     "_id": "6769f1f8b101194e6c9ef581",
  //     "userId": "67677ffee2c4d59f5a819417",
  //     "date": "2024-12-11T14:01:00.500Z",
  //     "amount": 250,
  //     "createdAt": "2024-12-23T23:27:52.092Z",
  //     "updatedAt": "2024-12-23T23:27:52.092Z"
  //   },
  //   {
  //     "_id": "6769f1fcb101194e6c9ef587",
  //     "userId": "67677ffee2c4d59f5a819417",
  //     "date": "2024-12-11T14:01:00.500Z",
  //     "amount": 250,
  //     "createdAt": "2024-12-23T23:27:56.537Z",
  //     "updatedAt": "2024-12-23T23:27:56.537Z"
  //   },
  //   {
  //     "_id": "6769f1fcb101194e6c9ef587",
  //     "userId": "67677ffee2c4d59f5a819417",
  //     "date": "2024-12-11T14:01:00.500Z",
  //     "amount": 250,
  //     "createdAt": "2024-12-23T23:27:56.537Z",
  //     "updatedAt": "2024-12-23T23:27:56.537Z"
  //   },
  //   {
  //     "_id": "6769f1fcb101194e6c9ef587",
  //     "userId": "67677ffee2c4d59f5a819417",
  //     "date": "2024-12-11T14:01:00.500Z",
  //     "amount": 250,
  //     "createdAt": "2024-12-23T23:27:56.537Z",
  //     "updatedAt": "2024-12-23T23:27:56.537Z"
  //   }
  // ];

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
          {waterList?.length > 0 ? (
            waterList
              .slice()
              .sort((a, b) => new Date(a.date) - new Date(b.date))
              .map(({ amount, date, _id }) => (
                <li className={css.item} key={_id}>
                  <div className={css.infoWrapper}>
                    <img src={capIcon} alt="Cap Icon" width="50" height="50"/>
                    <p className={css.textVolume}>{amount}ml</p>
                    <p className={css.textTime}>{timeFromDate(date)}</p>
                  </div>
                  <div className={css.btnWrap}>
                    <button className={css.btnEdit} onClick={() => openModal('EDIT', { amount, date, _id })}>
                      <img src={editIcon} alt="Cap Icon" width="50" height="50"/>
                    </button>
                    <button className={css.btnDelete} onClick={() => openModal('DELETE', { _id })}>
                      <img src={deleteIcon} alt="Cap Icon" width="50" height="50"/>
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
      <div className={css.btnAdd} onClick={() => openModal('ADD')}>
        + Add water
      </div>
      {modalType === 'ADD' && <AddWater closeModal={closeModal}/>}
      {modalType === 'EDIT' && (
        <EditWater water={currentWater} closeModal={closeModal}/>
      )}
      {modalType === 'DELETE' && (
        <DeleteWater water={currentWater} closeModal={closeModal}/>
      )}
    </div>
  )
}