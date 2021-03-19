import React from "react";
import SVG from "react-inlinesvg";
import "../styles/components/ChoiceButton.css";

interface ChoiceProps {
  tag: string;
  src: string;
  onClick: () => void;
  isActive?: boolean;
}

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const ChoiceButton = ({ src, tag, onClick, isActive }: ChoiceProps) => {
  return (
    <div
      className={`containerButton ${isActive && "active"}`}
      onClick={onClick}
    >
      <SVG src={src} />
      <div className="textBox">
        <p>COMPRAR</p>
        <span>{tag}</span>
      </div>
    </div>
  );
};

export default ChoiceButton;
