import React from "react";

interface Props {
  label?: string;
  type: string;
  value?:string;
  placeholder: string;
  onChange?: any;
  disabled?: boolean;
}

const Input = ({ label, type,value, placeholder, onChange, disabled }: Props) => {
  return (
    <>
      {label && (
        <label className="block text-left ml-1 text-gray-100 text-sm lg:text-base font-bold">
          {label}
        </label>
      )}
      <input
        className="placeholder:text-slate-100 block bg-gray-600 text-white w-full rounded-md py-3 pl-5 pr-3 shadow-sm focus:outline-none text-sm lg:text-base"
        placeholder={placeholder}
        type={type}
        value={value}
        onChange={onChange}
        disabled={disabled}
      />
    </>
  );
};

export default Input;
