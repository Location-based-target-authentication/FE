import { GoogleLoginButton } from "@/features/auth/components/GoogleLoginButton";
import { KakaoLoginButton } from "@/features/auth/components/KakaoLoginButton";

const Login = () => {
  return (
    <div className="flex h-screen items-center justify-center">
      <div className="flex flex-col space-y-4 text-center">
        <KakaoLoginButton />
        <GoogleLoginButton />
      </div>
    </div>
  );
};
export default Login;
