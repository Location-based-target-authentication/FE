import { testGoals1 } from "@/testing/testUtils";
import { http, HttpResponse } from "msw";

import { ENDPOINT_URL } from "@/config/envs";

export const handlers = [
  http.get(`${ENDPOINT_URL}api/v1/goals`, () => {
    return HttpResponse.json(testGoals1);
  })
];
