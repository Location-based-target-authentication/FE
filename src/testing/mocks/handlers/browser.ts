import { POINT_DEDUC } from "@/features/reward/api/path";
import {
  goalCheckDatas,
  goalCompleteDatas,
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
  http.get(`${ENDPOINT_URL}api/v1/goals/check`, () => {
    return HttpResponse.json(goalCheckDatas);
  }),
  http.get(`${ENDPOINT_URL}api/v1/goals/complete`, () => {
    return HttpResponse.json(goalCompleteDatas);
  }),
  http.post(`${ENDPOINT_URL}api/v1/goals/1/achieve`, async () => {
    await delay(500);

    return HttpResponse.json({ message: "success" });
  }),
  http.post(`${ENDPOINT_URL}${POINT_DEDUC("1")}`, async () => {
    await delay(500);

    return HttpResponse.json({ point: 10000 });
  })
];
