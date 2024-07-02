"use client";

import { IoMdClose } from "react-icons/io";
import IconFormat from "./IconFormat";

function CloseBtn({ onClick, size }: { onClick: () => void; size: number }) {
  return <IconFormat icon={<IoMdClose />} size={size} onClick={onClick} />;
}

export default CloseBtn;
