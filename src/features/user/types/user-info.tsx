export enum SocialType {
  KAKAO = "KAKAO",
  GOOGLE = "GOOGLE"
}

export type UserInfo = {
  name: string;
  phone: string;
  email?: string;
  socialType: SocialType;
  points: number;
  eventCoupons: number;
};
