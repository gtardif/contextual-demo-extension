import React from "react";
import { Typography } from "@mui/material";

import { Container } from "./common/types";
import { ExternalLink } from "./component/ExternalLink";
import { GuideAccordion } from "./accordion";

interface Props {
  container: Container;
}

export function ClearDataGuide({ container }: Props) {
  const volume = container?.mounts?.find((m) => m.type === "volume");

  if (!volume) {
    return null;
  }

  return (
    <GuideAccordion.Section
      id="clear"
      legacyAnalyticsEvent="featuredImageClearDataDocsExpanded"
      title="Start again with an empty database"
    >
      <Typography paragraph>
        By default, each database you start through Docker has its own data
        storage and runs independently of any others, so getting a new database
        is just a matter of creating a new container. If you no longer need this
        one, deleting the container will delete the storage.
      </Typography>
      <Typography>
        It's possible to reuse data between containers using{" "}
        <strong>named volumes</strong>. See{" "}
        <ExternalLink href="https://docs.docker.com/storage/volumes/">
          the documentation
        </ExternalLink>{" "}
        for more details.
      </Typography>
    </GuideAccordion.Section>
  );
}
