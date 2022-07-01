import React from "react";
import Button from "@mui/material/Button";
import { createDockerDesktopClient } from "@docker/extension-api-client";
import { Stack, TextField, Typography } from "@mui/material";
import { RedisFeaturedGuide } from "./RedisFeaturedGuide";
import type { Container } from "./common/types";

// Note: This line relies on Docker Desktop's presence as a host application.
// If you're running this React app in a browser, it won't work properly.
const client = createDockerDesktopClient();

function useDockerDesktopClient() {
  return client;
}

export function App() {
  const [response, setResponse] = React.useState<string>();
  const ddClient = useDockerDesktopClient();

  const params = new URLSearchParams(window.location.search);
  console.log("location ", window.location.search);
  const containerId: string = params.get("containerId")!;
  console.log("containerId ", containerId);

  const fetchAndDisplayResponse = async () => {
    const result = await ddClient.extension.vm?.service?.get("/hello");
    setResponse(JSON.stringify(result));
  };

  const container: Container = {
    id: containerId,
    name: "",
    environment: [],
    network: {
      ports: [
        {
          hostIp: "127.0.0.1",
          hostPort: "55000",
          port: "55000",
          id: "",
          protocol: "tcp",
        },
      ],
    },
    mounts: [],
  };

  return (
    <>
      <RedisFeaturedGuide container={container} />
    </>
  );
}
