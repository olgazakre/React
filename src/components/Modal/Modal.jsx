import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { closeModal } from "../../redux/modalSlice";
import styles from "./Modal.module.css";

export default function Modal() {
  const { isOpen, title, message } = useSelector((state) => state.modal);
  const dispatch = useDispatch();

  if (!isOpen) return null;

  const handleClose = () => {
    dispatch(closeModal());
  };

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <div className={styles.modal_left}>
        <h2>{title}</h2>
        <p>{message}</p>
        </div>
        <div className={styles.modal_right}>
        <button onClick={handleClose} className={styles.closeButton}>
          X
        </button>
        </div>
      </div>
    </div>
  );
}
