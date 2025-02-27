import { GOOGLE_CLIENT_ID, GOOGLE_REDIRECT_URI } from "@/config/envs";

export const GoogleLoginButton = (): JSX.Element => {
  const handleLoginClick = (): void => {
    if (!GOOGLE_CLIENT_ID || !GOOGLE_REDIRECT_URI) {
      console.error("구글 로그인 정보가 없습니다.");
      return;
    }

    const GOOGLE_LOGIN_URL = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${GOOGLE_CLIENT_ID}&redirect_uri=${GOOGLE_REDIRECT_URI}&response_type=code&scope=openid%20profile%20email`;

    window.location.href = GOOGLE_LOGIN_URL;
  };

  return (
    <div className="mt-8 flex justify-center">
      <button onClick={handleLoginClick}>
        <img
          src="/images/login-google.png"
          alt="구글 로그인"
          className="h-[48px] w-[335px] object-contain"
        />
      </button>
    </div>
  );
};
