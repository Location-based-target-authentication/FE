import { paths } from "@/config/paths";

export const NOT_VISIBLE_HEADER_PAGES = [paths.map.search.getHref()];

export const HEADER_TITLE_MAP = new Map([
  [paths.map.certification.getHref(), "목표인증"],
  [paths.goal.getHref(), "목표"]
]);
