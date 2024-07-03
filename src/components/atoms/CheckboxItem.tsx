"use client";

import CheckedIcon from "@/public/svg/CheckedIcon";
import UnCheckedIcon from "@/public/svg/UnCheckedIcon";
import { useState } from "react";

const checkedColor = "#4171FF";
const unCheckedColor = "#D0D0D0";

function CheckboxItem({ name, num }: { name: string; num: number }) {
  const [isChecked, setIsChecked] = useState(false);

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
  };

  return (
    <li>
      <label className="flex gap-2 items-center cursor-pointer">
        <input
          type="checkbox"
          className="peer sr-only"
          name="checkbox"
          checked={isChecked}
          onChange={handleCheckboxChange}
          aria-checked={isChecked}
        />
        {isChecked ? <CheckedIcon /> : <UnCheckedIcon />}
        <span
          className="font-semibold text-base"
          style={{ color: isChecked ? checkedColor : "black" }}
        >
          {name}
        </span>
        <span>{num}</span>
      </label>
    </li>
  );
}

export default CheckboxItem;
