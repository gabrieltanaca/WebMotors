/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import Select from "react-select";
import "../styles/components/CustomSelect.css";

interface CustomSelectProps {
  name: string;
  isSearchable?: boolean;
  isClearable?: boolean;
  options: CustomSelectOptions[];
  hideLabel?: boolean;
  placeholder?: string;
  onChange: (arg0: any) => void;
}

export interface CustomSelectOptions {
  label: string;
  value: string | number;
}

const CustomSelect = ({
  isSearchable,
  isClearable,
  options,
  name,
  hideLabel,
  placeholder,
  onChange,
}: CustomSelectProps): JSX.Element => {
  return (
    <div className="containerSelect">
      {!hideLabel && <span>{name}:</span>}
      <Select
        className="selectBox"
        classNamePrefix="select"
        isClearable={isClearable}
        isSearchable={isSearchable}
        name={name}
        options={options}
        placeholder={placeholder}
        onChange={(option) => onChange(option)}
      />
    </div>
  );
};

export default CustomSelect;
