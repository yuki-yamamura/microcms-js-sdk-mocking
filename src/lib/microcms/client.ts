import { createClient } from "microcms-js-sdk";
import { CreateClientReturn, type GetAllParams } from "./types";

const serviceDomain = process.env.MICROCMS_SERVICE_DOMAIN;
const apiKey = process.env.MICROCMS_API_KEY;

if (!serviceDomain) {
  throw new Error("Missing env.MICROCMS_SERVICE_DOMAIN");
}
if (!apiKey) {
  throw new Error("Missing env.MICROCMS_API_KEY");
}

const defaultClient: CreateClientReturn = createClient({
  serviceDomain,
  apiKey,
});

class CMSClient<T = unknown> {
  private endpoint: string;
  private client: CreateClientReturn = defaultClient;

  constructor(endpoint: string, client?: CreateClientReturn) {
    this.endpoint = endpoint;
    if (client) {
      this.client = client;
    }
  }

  getContents = (params?: GetAllParams) => {
    return this.client.getAllContents<T>({
      endpoint: this.endpoint,
      ...params,
    });
  };
}

export { CMSClient };
