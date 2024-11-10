import { afterEach, beforeEach, describe, expect, test, vi } from "vitest";
import { http, HttpResponse } from "msw";
import { server } from "@/mocks/node";
import type { Post } from "@/app/blog/types";
import { createClient } from "microcms-js-sdk";
import { BlogClient } from ".";
import type { GetAllParams } from "@/lib/microcms";

const fakePosts: Post[] = [
  {
    id: "s9bos-s1z",
    createdAt: "2024-11-04T01:15:28.778Z",
    updatedAt: "2024-11-04T01:15:28.778Z",
    publishedAt: "2024-11-04T01:15:28.778Z",
    revisedAt: "2024-11-04T01:15:28.778Z",
    title: "post-3",
  },
  {
    id: "s9bos-s1y",
    createdAt: "2024-11-04T01:14:28.778Z",
    updatedAt: "2024-11-04T01:14:28.778Z",
    publishedAt: "2024-11-04T01:14:28.778Z",
    revisedAt: "2024-11-04T01:14:28.778Z",
    title: "post-2",
  },
  {
    id: "s9bos-s1x",
    createdAt: "2024-11-03T01:13:28.778Z",
    updatedAt: "2024-11-03T01:13:28.778Z",
    publishedAt: "2024-11-03T01:13:28.778Z",
    revisedAt: "2024-11-03T01:13:28.778Z",
    title: "post-1",
  },
];

const serviceDomain = "serviceDomain";
const apiKey = "apiKey";
const apiName = "blog";

describe("getFormattedPosts", () => {
  beforeEach(() => {
    server.use(
      http.get(`https://${serviceDomain}.microcms.io/api/v1/${apiName}`, () => {
        return HttpResponse.json({
          contents: fakePosts,
          totalCount: fakePosts.length,
          offset: 0,
          limit: 100,
        });
      })
    );
  });
  afterEach(() => {
    server.resetHandlers();
  });

  test("should return list of post which title is surrounded by an asterisk", async () => {
    const mockClient = createClient({ serviceDomain, apiKey });
    const blogClient = new BlogClient(mockClient);

    const result = await blogClient.getFormattedPosts();

    expect(result[0].title).toBe("*post-3*");
    expect(result[1].title).toBe("*post-2*");
    expect(result[2].title).toBe("*post-1*");
  });

  test("can be called with queries", async () => {
    const mockClient = createClient({ serviceDomain, apiKey });
    const blogClient = new BlogClient(mockClient);
    const requestParams: GetAllParams = {
      queries: {
        orders: "-publishedAt",
      },
    };
    const spy = vi.spyOn(mockClient, "getAllContents");

    await blogClient.getFormattedPosts(requestParams);

    expect(spy).toHaveBeenCalledWith({
      endpoint: apiName,
      ...requestParams,
    });
  });
});
