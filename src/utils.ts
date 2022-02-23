import mockWorkOrdersResponse from "./mock-work-orders-response.json";

import type { MockWorkOrdersResponse } from "./types";

export const fakeFetch = () => {
  return new Promise<MockWorkOrdersResponse>((resolve) => {
    setTimeout(() => {
      resolve(mockWorkOrdersResponse);
    }, 100);
  });
};
