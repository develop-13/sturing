import React from "react";

function IconFormat({
  size = 24,
  icon,
  onClick,
  color,
}: {
  size?: number;
  icon: React.ReactNode;
  onClick?: () => void;
  color?: string;
}) {
  return (
    <div onClick={onClick} className="cursor-pointer">
      {React.cloneElement(icon as React.ReactElement, {
        size,
        color,
      })}{" "}
    </div>
  );
}

export default IconFormat;
