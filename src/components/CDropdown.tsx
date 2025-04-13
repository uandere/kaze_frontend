import React, { FC } from "react";

interface CustomDropdownProps {
  label?: string;
  options: string[];
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  className?: string;  // Add className to the props
}

const CustomDropdown: FC<CustomDropdownProps> = ({
  label,
  options,
  name,
  value,
  onChange,
  className = "",  // Default to an empty string if className is not passed
}) => (
  <div className="flex flex-row items-start gap-2">
    {label && <label className="text-white font-thin text-xl">{label}</label>}
    <select
      name={name}
      value={value}
      onChange={onChange}
      className={`w-full px-4 py-2 rounded-md focus:outline-none bg-gray-400 ${className}`}
    >
      <option value="">Select...</option>
      {options.map((option, index) => (
        <option key={index} value={option}>
          {option}
        </option>
      ))}
    </select>
  </div>
);

export default CustomDropdown;
