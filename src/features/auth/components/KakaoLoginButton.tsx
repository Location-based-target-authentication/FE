import { KAKAO_CLIENT_ID, KAKAO_REDIRECT_URI } from "@/config/envs";

export const KakaoLoginButton = (): JSX.Element => {
  const handleLoginClick = (): void => {
    if (!KAKAO_CLIENT_ID || !KAKAO_REDIRECT_URI) {
      console.error("카카오 로그인 정보가 없습니다.");
      return;
    }

    const KAKAO_LOGIN_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${KAKAO_CLIENT_ID}&redirect_uri=${KAKAO_REDIRECT_URI}&response_type=code`;

    window.location.href = KAKAO_LOGIN_URL;
  };

  return (
    <div className="mt-8 flex justify-center">
      <button onClick={handleLoginClick}>
        <img
          src="/images/login-kakao.png"
          alt="카카오 로그인"
          className="h-[48px] w-[335px] object-contain"
        />
      </button>
    </div>
  );
};
