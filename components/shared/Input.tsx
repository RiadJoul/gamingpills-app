import React from "react";

interface Props {
  label?: string;
  type: string;
  value?: string;
  placeholder: string;
  onChange?: any;
  disabled?: boolean;
  onKeyDown?: any
}

const Input = ({ label, type, value, placeholder, onChange, disabled ,onKeyDown}: Props) => {
  return (
    <div>
      {label && (
        <label className="block text-left ml-1 text-gray-100 text-sm lg:text-base font-bold">
          {label}
        </label>
      )}
      <input
        placeholder={placeholder}
        className="block w-full py-3 pl-4 mx-1 bg-gray-800 focus:bg-chat-message border-2 border-dark focus:border-primary focus:bg-black duration-300 rounded-md outline-none text-white"
        type={type}
        value={value}
        onChange={onChange}
        disabled={disabled}
        onKeyDown={onKeyDown}
      />
  
    </div>
  );
};

export default Input;
