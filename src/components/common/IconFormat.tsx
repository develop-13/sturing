import React from "react";

function IconFormat({
  size = 24,
  icon,
  onClick,
}: {
  size?: number;
  icon: React.ReactNode;
  onClick?: () => void;
}) {
  return (
    <div onClick={onClick} className="cursor-pointer">
      {React.cloneElement(icon as React.ReactElement, {
        size,
      })}{" "}
    </div>
  );
}

export default IconFormat;
