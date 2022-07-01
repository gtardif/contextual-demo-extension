import React from "react";
import { LinkProps } from "@mui/material";
import QuestionAnswerOutlined from "@mui/icons-material/QuestionAnswerOutlined";
import { createDockerDesktopClient } from "@docker/extension-api-client";
import { ExternalLink } from "./ExternalLink";

interface FeedbackLinkProps {
  feedbackUrl: string;
  feedbackClickAnalyticsEvent?: string;
  sx?: LinkProps["sx"];
}

export function FeedbackLink({
  feedbackUrl,
  feedbackClickAnalyticsEvent,
  sx,
}: FeedbackLinkProps) {
  const ddClient = createDockerDesktopClient();

  return (
    <ExternalLink
      variant="body2"
      sx={sx}
      onClick={
        feedbackClickAnalyticsEvent
          ? // @ts-ignore
            () => ddClient.analytics.trackEvent(feedbackClickAnalyticsEvent)
          : undefined
      }
      href={feedbackUrl}
    >
      Give Feedback
      <QuestionAnswerOutlined
        fontSize="small"
        sx={{
          verticalAlign: "bottom",
          marginLeft: "0.25em",
        }}
      />
    </ExternalLink>
  );
}
