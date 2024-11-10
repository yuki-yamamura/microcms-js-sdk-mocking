import {
  createClient,
  GetListDetailRequest,
  type GetAllContentRequest,
} from "microcms-js-sdk";

type CreateClientReturn = ReturnType<typeof createClient>;
type GetParams = Omit<GetListDetailRequest, "endpoint">;
type GetAllParams = Omit<GetAllContentRequest, "endpoint">;

export type { CreateClientReturn, GetParams, GetAllParams };
