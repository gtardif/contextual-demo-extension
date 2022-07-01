import { Stack, Typography } from "@mui/material";
import { ExternalLink } from "./component/ExternalLink";
import { CopyCommand } from "./component/CopyCommand";
import { InlineCode } from "./component/InlineCode";
import { Container } from "./common/types";
import { ClearDataGuide } from "./ClearDataGuide";
import { FeaturedGuideTitle } from "./FeaturedGuideTitle";
import { GuideAccordion } from "./accordion";
import { REDIS } from "./featured-images-types";

interface Props {
  container: Container;
}

export function RedisFeaturedGuide({ container }: Props) {
  const { value: password = "" } =
    container.environment.find((e) => e.key === "REDIS_PASSWORD") ?? {};
  const { hostPort } = container.network.ports[0];

  const connectionString = (
    <CopyCommand
      command={`redis://default:${password}@localhost:${hostPort}`}
    />
  );

  const renderConnectApplication = () => {
    return (
      <GuideAccordion.Section
        id="connect"
        legacyAnalyticsEvent="featuredImageConnectDocsExpanded"
        title="Connect your application"
      >
        <Typography>
          Redis publish{" "}
          <ExternalLink href="https://redis.io/docs/clients/">
            a list of client libraries
          </ExternalLink>
          , organised by license and programming language. Pick the best one for
          your project.
        </Typography>
      </GuideAccordion.Section>
    );
  };
  const redisCliSection = (
    <GuideAccordion.Section
      id="docker-rediscli"
      legacyAnalyticsEvent="featuredImageCliDocsExpanded"
      title="Interact with Redis from your terminal"
    >
      <Typography paragraph>Run redis-cli using this command:</Typography>
      <CopyCommand
        command={`docker exec -it ${container.name} redis-cli -a ${password}`}
      />
      <Typography paragraph mt={2}>
        Now you can enter redis-cli commands such as{" "}
        <InlineCode>incr mycounter</InlineCode> to create / increment an integer
        counter, or <InlineCode>set mykey myvalue</InlineCode> to store the
        string <InlineCode>myvalue</InlineCode> against the key{" "}
        <InlineCode>mykey</InlineCode>.
      </Typography>
      <Typography paragraph mt={2}>
        For more redis-cli commands and guidance, see the{" "}
        <ExternalLink href="https://redis.io/docs/manual/cli/">
          redis-cli documentation
        </ExternalLink>
        .
      </Typography>
    </GuideAccordion.Section>
  );
  const renderComposeFile = () => {
    return (
      <GuideAccordion.Section
        id="docker-compose"
        legacyAnalyticsEvent="featuredImageComposeDocsExpanded"
        title="Create a Compose file for your application"
      >
        <Typography paragraph>
          Create a <InlineCode>docker-compose.yml</InlineCode> file with the
          following content:
        </Typography>
        <CopyCommand
          command={`volumes:
  data:

services:
  redis:
    image: redis:latest
    volumes:
      - data:/data
    ports:
      - 6379:6379
  myapp:
    image: [YOUR-APP-IMAGE]`}
        />
        <Typography paragraph mt={2}>
          Replace <InlineCode>[YOUR-APP-IMAGE]</InlineCode> with the Docker
          image of your app. Because of the named `data` volume, the Redis data
          will be persisted and reused even if the containers are deleted and
          recreated. Edit your code or configuration to connect to Redis using
          this connection string:
        </Typography>
        <CopyCommand command="redis://redis:6379" />
        <Typography paragraph mt={2}>
          Use your terminal to run the Docker Compose stack:
        </Typography>
        <CopyCommand command="docker compose up" />
        <Typography paragraph mt={2}>
          For more information on using Docker Compose, see the{" "}
          <ExternalLink href="https://docs.docker.com/compose/">
            Docker Compose documentation.
          </ExternalLink>
        </Typography>
        <Typography paragraph mt={2}>
          For more examples of using Redis with various applications and
          languages see the{" "}
          <ExternalLink href="https://github.com/docker/awesome-compose">
            awesome-compose repository.
          </ExternalLink>
        </Typography>
      </GuideAccordion.Section>
    );
  };
  return (
    <Stack spacing={2} p={2}>
      <FeaturedGuideTitle image={REDIS} />
      <Typography paragraph>
        Redis is now running (container {container.id})
      </Typography>
      <Typography paragraph>The connection string is:</Typography>
      {connectionString}
      <GuideAccordion.Container image={REDIS}>
        {renderConnectApplication()}
        {redisCliSection}
        <ClearDataGuide container={container} />
        {renderComposeFile()}
      </GuideAccordion.Container>
    </Stack>
  );
}
