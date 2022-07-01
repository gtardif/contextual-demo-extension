import React, { PropsWithChildren } from "react";
import { Link } from "@mui/material";
import { LinkProps } from "@mui/material/Link/Link";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";

import { createDockerDesktopClient } from "@docker/extension-api-client";

interface Props extends Omit<LinkProps, "component"> {
  readonly href: string;
  /** If true, an "open in new" icon is shown with the text */
  readonly showIcon?: boolean;
  readonly className?: string;
}

function ExternalLinkUnwrapped(props: PropsWithChildren<Props>) {
  const {
    href,
    children,
    className,
    showIcon = false,
    onClick,
    ...rest
  } = props;

  const ddClient = createDockerDesktopClient();

  function navigate() {
    const parsedUrl = new URL(href);

    switch (parsedUrl.protocol) {
      case "http:":
      case "https:":
        ddClient.host.openExternal(href);
        break;

      default:
        throw new Error(
          `Disallowed href prop provided to ExternalLink: ${href}`
        );
    }
  }

  const click = (
    e:
      | React.MouseEvent<HTMLAnchorElement, MouseEvent>
      | React.MouseEvent<HTMLSpanElement, MouseEvent>
  ) => {
    e.preventDefault();
    navigate();
    onClick?.(e);
  };

  return (
    // Electron external links are a special case not considered by the eslint rule
    // eslint-disable-next-line jsx-a11y/anchor-is-valid
    <Link
      color="primary"
      className={className}
      href=""
      onAuxClick={(e) => {
        // handle wheel click as click
        if (e.button === 1) {
          click(e);
        }
      }}
      onClick={click}
      {...rest}
    >
      {children}
      {showIcon && (
        <OpenInNewIcon
          fontSize="inherit"
          sx={{ marginLeft: "0.25em", verticalAlign: "middle" }}
        />
      )}
    </Link>
  );
}

export const ExternalLink = React.memo(ExternalLinkUnwrapped);

// preserving default export until all imports are updated
// eslint-disable-next-line import/no-default-export
export default ExternalLink;
