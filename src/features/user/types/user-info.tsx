enum SocialType {
  KAKAO = "KAKAO",
  GOOGLE = "GOOGLE"
}

export type UserInfo = {
  name: string;
  phone: string;
  socialType: SocialType;
  points: number;
  eventCoupons: number;
};
