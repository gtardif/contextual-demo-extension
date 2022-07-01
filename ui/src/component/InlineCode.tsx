import React from "react";
import { Typography, TypographyProps } from "@mui/material";

export function InlineCode({ children }: TypographyProps) {
  return <Typography component="code">{children}</Typography>;
}
