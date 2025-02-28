import { paths } from "@/config/paths";

export const NOT_VISIBLE_HEADER_PAGES = [paths.map.search.getHref()];

export const HEADER_TITLE_MAP = new Map([
  [paths.map.certification.getHref(), "목표인증"],
  [paths.goal.getHref(), "목표"],
  [paths.profile.reward.getHref(), "리워드 신청"],
  [paths.auth.agreement.getHref(), "약관동의"],
  [paths.auth.phoneNumber.getHref(), "정보입력"]
]);
