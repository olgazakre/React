import React, { useState } from "react";
import styles from "./ButtonAdd.module.css";

export default function ButtonAdd({onClick}) {
  const [buttonText, setButtonText] = useState("Add to cart");
  const [success, setSuccess] = useState(false);

  const handleClick = (e) => {
    onClick(e);
    setButtonText("Added");
    setSuccess(true);
    setTimeout(() => {
        setButtonText("Add to cart");
        setSuccess(false);
      }, 10000); 
  };

  
  return (
    <button
      onClick={handleClick}
      className={`${styles.addButton} ${success ? styles.success : ""}`}
    >
      {buttonText}
    </button>
  );
}



