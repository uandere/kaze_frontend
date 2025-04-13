import React, { FC } from "react";

interface CustomInputProps {
  label?: string;
  type?: string;
  name: string;
  value: string | number;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
  placeholder?: string;
  className?: string;
  isTextArea?: boolean;
}

const CustomInput: FC<CustomInputProps> = ({
  label,
  type = "text",
  name,
  value,
  onChange,
  placeholder,
  className = "",
  isTextArea = false,
}) => (
  <div className="flex flex-row items-start gap-4 w-full">
    {label && <label className="block text-white font-thin text-xl">{label}</label>}
    {isTextArea ? (
      <textarea
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={`px-4 py-2 border bg-[#1E1E1E] text-[#ffd700] rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500 w-full resize-none ${className}`}
      />
    ) : (
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={`px-4 py-1 border bg-[#1E1E1E] text-[#ffd700] rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500 ${className}`}
      />
    )}
  </div>
);

export default CustomInput;
