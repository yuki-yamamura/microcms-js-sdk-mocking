import { beforeAll, beforeEach, afterAll } from "vitest";
import { server } from "@/mocks/node";

beforeAll(() => server.listen());
beforeEach(() => server.resetHandlers());
afterAll(() => server.close());
