import {
  goalCheckAll,
  goalCheckNotAfterData,
  goalCheckNotBeforeData,
  goalCompleteData1,
  goalCompleteData2,
  goalEveryDayCertification,
  goalNotContainRadarCertification,
  goalNotEveryDayCertification
} from "@/testing/testUtils";
import { delay, http, HttpResponse } from "msw";

import { ENDPOINT_URL } from "@/config/envs";

export const handlers = [
  http.get(`${ENDPOINT_URL}api/v1/goals/1`, () => {
    return HttpResponse.json(goalEveryDayCertification);
  }),
  http.get(`${ENDPOINT_URL}api/v1/goals/2`, () => {
    return HttpResponse.json(goalNotEveryDayCertification);
  }),
  http.get(`${ENDPOINT_URL}api/v1/goals/3`, () => {
    return HttpResponse.json(goalNotContainRadarCertification);
  }),
  http.get(`${ENDPOINT_URL}api/v1/goals/check/1`, () => {
    return HttpResponse.json(goalCheckAll);
  }),
  http.get(`${ENDPOINT_URL}api/v1/goals/check/2`, () => {
    return HttpResponse.json(goalCheckNotBeforeData);
  }),
  http.get(`${ENDPOINT_URL}api/v1/goals/check/3`, () => {
    return HttpResponse.json(goalCheckNotAfterData);
  }),
  http.get(`${ENDPOINT_URL}api/v1/goals/complete/1`, () => {
    return HttpResponse.json(goalCompleteData1);
  }),
  http.get(`${ENDPOINT_URL}api/v1/goals/complete/2`, () => {
    return HttpResponse.json(goalCompleteData2);
  }),
  http.post(`${ENDPOINT_URL}api/v1/goals/1/achieve`, async () => {
    await delay(500);

    return HttpResponse.json({ message: "success" });
  })
];
