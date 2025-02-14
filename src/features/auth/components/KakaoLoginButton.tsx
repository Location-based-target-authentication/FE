export const KakaoLoginButton = (): JSX.Element => {
  const handleLoginClick = (): void => {
    const KAKAO_LOGIN_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${import.meta.env.VITE_KAKAO_APP_KEY}&redirect_uri=${import.meta.env.VITE_KAKAO_REDIRECT_URI}&response_type=code`; /** 확인필요 */

    window.location.href = KAKAO_LOGIN_URL;
  };
  return (
    <div className="mt-8 flex justify-center">
      <button onClick={handleLoginClick}>
        <img
          src="/images/kakao_login_large_narrow.png"
          alt="카카오 로그인"
          className="h-[60px] w-[200px]"
        />
      </button>
    </div>
  );
};
