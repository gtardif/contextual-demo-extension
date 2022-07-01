import React from "react";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Typography } from "@mui/material";

import { useGuideAccordion } from "./GuideAccordionContext";
import { createDockerDesktopClient } from "@docker/extension-api-client";

interface Props {
  id: string;
  title: string;
  legacyAnalyticsEvent: string;
  children?: React.ReactNode;
}

export function GuideAccordionSection({
  id,
  title,
  legacyAnalyticsEvent,
  children,
}: Props) {
  const ddClient = createDockerDesktopClient();
  const { image, expandedSection, setExpandedSection } = useGuideAccordion();

  return (
    <Accordion
      expanded={expandedSection === id}
      onChange={(_, isExpanded: boolean) => {
        setExpandedSection(isExpanded ? id : null);
        // @ts-ignore
        ddClient.analytics.trackEvent(legacyAnalyticsEvent);
        // @ts-ignore
        ddClient.analytics.track("eventHomepageFeaturedImage", {
          action: "click",
          target: image.name,
          context: title,
        });
      }}
    >
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls={`${id}bh-content`}
        id={`${id}bh-header`}
      >
        <Typography>{title}</Typography>
      </AccordionSummary>
      <AccordionDetails>{children}</AccordionDetails>
    </Accordion>
  );
}
