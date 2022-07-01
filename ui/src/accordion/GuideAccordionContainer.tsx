import React from "react";
import { Typography } from "@mui/material";

import { GuideAccordionProvider } from "./GuideAccordionContext";
import type { IFeaturedImage } from "../featured-images-types";

interface Props {
  image: IFeaturedImage;
  children: React.ReactNode;
}

export function GuideAccordionContainer({ image, children }: Props) {
  return (
    <GuideAccordionProvider image={image}>
      <Typography variant="h4">Do more</Typography>
      {children}
    </GuideAccordionProvider>
  );
}
