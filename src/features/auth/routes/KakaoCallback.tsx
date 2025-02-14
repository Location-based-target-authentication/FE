import { MainErrorFallback } from "@/components/errors/main";
import { Spinner } from "@/components/ui/spinner";

import { useCallback, useEffect, useState } from "react";

import { kakaoLogin } from "@/features/auth/api/auth";
import { useNavigate, useSearchParams } from "react-router-dom";

import { useAuthStore } from "@/stores/auth-store";
import { paths } from "@/config/paths";

const KakaoCallback = (): JSX.Element | null => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const setTokens = useAuthStore((state) => state.setTokens);

  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const handleKakaoLogin = useCallback(
    async (code: string): Promise<void> => {
      try {
        setLoading(true);
        const response = await kakaoLogin(code);
        if (!response.ok) {
          throw new Error("카카오 인증에 실패했습니다.");
        }

        const { accessToken, refreshToken } = response.data;

        setTokens(accessToken, refreshToken);

        navigate(paths.home.path);
      } catch (error) {
        console.error(error);
        setError("로그인 처리 중 문제가 발생했습니다.");
      } finally {
        setLoading(false);
      }
    },
    [navigate, setTokens]
  );

  useEffect(() => {
    const code: string | null = searchParams.get("code");

    if (code) {
      handleKakaoLogin(code);
    } else {
      console.error("Authorization code not found.");
      setError("카카오 인증 코드가 존재하지 않습니다.");
      setLoading(false);
      navigate(paths.auth.login.path);
    }
  }, [searchParams, handleKakaoLogin, navigate]);

  if (error) return <MainErrorFallback errorMessage={error} />;
  if (loading)
    return (
      <div className="flex h-screen w-screen items-center justify-center">
        <Spinner size="lg" variant="primary" />
      </div>
    );

  return null;
};

export default KakaoCallback;
