export const GoogleLoginButton = (): JSX.Element => {
  const handleLoginClick = (): void => {
    const GOOGLE_LOGIN_URL = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${import.meta.env.VITE_GOOGLE_CLIENT_ID}&redirect_uri=http://localhost:3000/google/callback&response_type=code&scope=openid%20profile%20email`;
    window.location.href = GOOGLE_LOGIN_URL;
  };

  return (
    <div className="mt-8 flex justify-center">
      <button onClick={handleLoginClick}>
        <img
          src="/images/web_light_rd_ctn@3x.png"
          alt="구글 로그인"
          className="h-[60px] w-[200px]"
        />
      </button>
    </div>
  );
};
