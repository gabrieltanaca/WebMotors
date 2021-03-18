import React from "react";
import SVG from "react-inlinesvg";
import styles from "../styles/components/ChoiceButton.module.css";

interface ChoiceProps {
  tag: string;
  src: string;
}

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const ChoiceButton = ({ src, tag }: ChoiceProps) => {
  return (
    <div className={styles.containerButton}>
      <SVG src={src} />
      <div className={styles.textBox}>
        <p>COMPRAR</p>
        <span>{tag}</span>
      </div>
    </div>
  );
};

export default ChoiceButton;
