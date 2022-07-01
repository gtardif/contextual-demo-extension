import React from "react";
import { Stack, Typography } from "@mui/material";

import { FeedbackLink } from "./component/FeedbackLink";
import type { IFeaturedImage } from "./featured-images-types";

const feedbackUrl = (imageName: string) =>
  `https://docs.google.com/forms/d/e/1FAIpQLSc7hIdk2tV47bN96idol1rWYHet1WXpzFGc00HH7VMl-Y_k6g/viewform?usp=pp_url&entry.1754405666=${imageName}`;

interface FeaturedGuideTitleProps {
  image: IFeaturedImage;
}
export function FeaturedGuideTitle({ image }: FeaturedGuideTitleProps) {
  return (
    <Stack direction="row" alignItems="center" justifyContent="space-between">
      <Typography variant="h4">{image.title} Overview</Typography>
      <FeedbackLink
        feedbackUrl={feedbackUrl(image.name)}
        feedbackClickAnalyticsEvent="featuredImageDocsFeedbackClicked"
      />
    </Stack>
  );
}
