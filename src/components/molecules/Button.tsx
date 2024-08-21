import { ReactNode } from "react";
import Box, { TBox } from "../atoms/Box";

type TButton = TBox;

export default function Button({
  theme,
  shape,
  extraCss,
  isActive,
  children,
  onClick,
}: TButton & { children: ReactNode }) {
  return (
    <Box props={{ theme, shape, extraCss, isActive, onClick }}>{children}</Box>
  );
}
