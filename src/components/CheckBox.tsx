/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import React, { useState } from "react";
import SVG from "react-inlinesvg";
import styles from "../styles/components/CheckBox.module.css";

interface CheckProps {
  title: string;
}

const CheckBox = ({ title }: CheckProps) => {
  const [isActive, setIsActive] = useState(false);

  function activeCheck() {
    setIsActive((prev) => !prev);
  }

  return (
    <div className={styles.box} onClick={activeCheck}>
      <div className={styles.checkBox}>
        {isActive && <SVG src="/icons/icon_check.svg" />}
      </div>
      <p>{title}</p>
    </div>
  );
};

export default CheckBox;
