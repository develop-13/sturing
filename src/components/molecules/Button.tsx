"use client";
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
  activeClassname,
}: TButton & { children: ReactNode }) {
  return (
    <Box props={{ theme, shape, extraCss, isActive, onClick, activeClassname }}>
      {children}
    </Box>
  );
}
