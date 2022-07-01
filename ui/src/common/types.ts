export type ContainerOrigin = "run" | "compose" | "kubernetes";

export type ContainerStatus =
  | "paused"
  | "restarting"
  | "removing"
  | "running"
  | "dead"
  | "created"
  | "exited";

/**
 * This type only exists in this project. The mapping schema is as follows:
 * Get Container Info from Engine API => mapping these info to this Container type => update Redux State => update UI
 *
 * I think that it shouldn't exist, and the schema should be as follow:
 * Get Container Info from Engine API => update Redux State => update UI
 *
 * So that the UI uses the same typing as Engine API.
 *
 * We need this type to facilitate Typescript conversion
 */
export interface Container {
  id: string;
  name: string;
  environment: Array<{
    key: string;
    value: string;
  }>;
  mounts: Array<{
    type: string;
    name: string;
    source: string;
    destination: string;
    driver: string;
    mode: string;
    rw: boolean;
    propagation: string;
  }>;
  network: {
    ports: Array<{
      id: string;
      port: string;
      protocol: string;
      hostIp: null | string;
      hostPort: null | string;
    }>;
  };
}
