import React from "react";
const REDIS_PASSWORD = "redispw";

export interface IFeaturedImage {
  title: string;
  name: string;
  tag: string;
  digest: string;
  description: string;
  ports: string[];
  volumeBindings: { [key: string]: string };
  anonVolumes?: string[];
  guide?: React.ReactNode;
  env?: string[];
  cmd?: string[];
  interactive?: boolean;
  inputDescription?: string;
  inputTooltip?: string;
  filePick?: boolean;
}

export const REDIS = {
  title: "Redis",
  name: "redis",
  tag: "latest",
  digest: "redis:latest",
  description:
    "An open-source in-memory key-value store that functions as a data structure server.",
  volumeBindings: {},
  ports: ["6379"],
  env: [`REDIS_PASSWORD=${REDIS_PASSWORD}`],
  cmd: ["--requirepass", REDIS_PASSWORD],
  categories: ["Cache"],
};
