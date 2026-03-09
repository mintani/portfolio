import { headers } from "next/headers";

const DEFAULT_LOCAL_ORIGIN = "http://localhost:3000";

export const getRequestOrigin = async () => {
  const headerStore = await headers();
  const host = headerStore.get("x-forwarded-host") ?? headerStore.get("host");
  const protocol =
    headerStore.get("x-forwarded-proto") ??
    (host?.includes("localhost") ? "http" : "https");

  if (host) {
    return `${protocol}://${host}`;
  }

  return process.env.APP_URL ?? DEFAULT_LOCAL_ORIGIN;
};
