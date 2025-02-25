import { paths } from "@/config/paths";

export const NOT_VISIBLE_HEADER_PAGES = [paths.map.search.getHref()];

export const HEADER_TITLE_MAP = new Map([
  [paths.home.getHref(), "정보입력"],
  [paths.map.certification.getHref(), "목표인증"],
  [paths.profile.reward.getHref(), "리워드 신청"]
]);
