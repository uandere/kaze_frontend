import React, { FC } from "react";

interface CustomCheckboxProps {
  label: string;
  name: string;
  checked: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  iconPath?: string;
}

const CustomCheckbox: FC<CustomCheckboxProps> = ({
  label,
  name,
  checked,
  onChange,
  iconPath,
}) => (
  <div className="flex flex-row items-center gap-4">
    <label className="block text-white font-thin text-xl">{label}</label>
    {iconPath && <img src={iconPath} alt="icon" className="w-8 h-8" />}
    <input
      type="checkbox"
      name={name}
      checked={checked}
      onChange={onChange}
      className={`w-5 h-5 border-2 border-gray-300 rounded-md transition-colors duration-200 
        appearance-none cursor-pointer checked:bg-[#ffd700] checked:border-[#ffd700]`}
    />
  </div>
);

export default CustomCheckbox;
