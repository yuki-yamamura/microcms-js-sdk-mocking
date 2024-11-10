import { createClient } from "microcms-js-sdk";
import { CreateClientReturn } from "./types";

const serviceDomain = process.env.MICROCMS_SERVICE_DOMAIN;
const apiKey = process.env.MICROCMS_API_KEY;

if (!serviceDomain) {
  throw new Error("Missing env.MICROCMS_SERVICE_DOMAIN");
}
if (!apiKey) {
  throw new Error("Missing env.MICROCMS_API_KEY");
}

const client: CreateClientReturn = createClient({
  serviceDomain,
  apiKey,
});

export { client };
