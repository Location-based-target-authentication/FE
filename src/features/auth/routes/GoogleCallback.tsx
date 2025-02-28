import { MainErrorFallback } from "@/components/errors/main";
import { Spinner } from "@/components/ui/spinner";

import { useCallback, useEffect, useState } from "react";

import { postGoogleLogin } from "@/features/auth/api/auth";
import { getPoint } from "@/features/reward/api/reward";
import { useNavigate, useSearchParams } from "react-router";

import { useAuthStore } from "@/stores/auth-store";
import { useUserStore } from "@/stores/user";
import { paths } from "@/config/paths";

const GoogleCallback = (): JSX.Element | null => {
  const { setUserName, setPoint } = useUserStore();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const setTokens = useAuthStore((state) => state.setTokens);

  const [isError, setIsError] = useState<boolean>(false);
  const [isloading, setIsLoading] = useState<boolean>(true);

  const handleGoogleLogin = useCallback(
    async (code: string): Promise<void> => {
      try {
        const response = await postGoogleLogin({ data: { code } });
        if (!response.ok) {
          throw new Error("구글 인증에 실패했습니다.");
        }

        const { accessToken, refreshToken, username, socialId } = response.data;

        setTokens(accessToken, refreshToken);
        setUserName(username);

        const { totalPoints } = await getPoint(socialId);

        setPoint(totalPoints);

        navigate(paths.home.path);
      } catch (error) {
        console.error(error);
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    },
    [navigate, setTokens, setUserName, setPoint]
  );

  useEffect(() => {
    const code: string | null = searchParams.get("code");

    if (code) {
      handleGoogleLogin(code);
    } else {
      console.error("Authorization code not found.");
      setIsError(true);
      setIsLoading(false);
      navigate(paths.auth.login.path);
    }
  }, [searchParams, handleGoogleLogin, navigate]);

  if (isError) return <MainErrorFallback />;
  if (isloading)
    return (
      <div className="flex h-screen w-screen items-center justify-center">
        <Spinner size="lg" variant="primary" />
      </div>
    );

  return null;
};

export default GoogleCallback;
