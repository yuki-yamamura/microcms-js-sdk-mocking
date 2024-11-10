import {
  createClient,
  GetAllContentRequest,
  MicroCMSClient,
} from "microcms-js-sdk";

const serviceDomain = process.env.MICROCMS_SERVICE_DOMAIN;
const apiKey = process.env.MICROCMS_API_KEY;

if (!serviceDomain) {
  throw new Error("Missing env.MICROCMS_SERVICE_DOMAIN");
}
if (!apiKey) {
  throw new Error("Missing env.MICROCMS_API_KEY");
}

type CreateClientReturn = ReturnType<typeof createClient>;
type CMSClient<T = unknown> = {
  getContents: (
    params?: Omit<GetAllContentRequest, "endpoint">
  ) => Promise<T[]>;
};

const defaultParams: MicroCMSClient = {
  serviceDomain,
  apiKey,
};

const clientFactory =
  (params: MicroCMSClient) =>
  <T = unknown>(endpoint: string) => {
    const cmsClient = createClient(params);

    return {
      getContents: (params?: Omit<GetAllContentRequest, "endpoint">) =>
        cmsClient.getAllContents<T>({ endpoint, ...params }),
    };
  };

const client: CreateClientReturn = createClient({
  serviceDomain,
  apiKey,
});

export { defaultParams, client, clientFactory, type CMSClient };
