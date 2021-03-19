import React, { HTMLAttributes } from 'react';
import '../styles/components/CustomInput.css'

interface Props  extends HTMLAttributes<HTMLInputElement>{
  left?: string | JSX.Element
  right?: string | JSX.Element
}

const CustomInput = ({left,right, ...props}:Props): JSX.Element => {
  return <div className="container-input">
    {!!left && <div className="left">{left}</div>}
    <input {...props}/>
    <div className="right">{right}</div>
  </div>;
}

export default CustomInput;
