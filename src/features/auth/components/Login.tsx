import { useState } from "react";

import { GoogleLoginButton } from "@/features/auth/components/GoogleLoginButton";
import { KakaoLoginButton } from "@/features/auth/components/KakaoLoginButton";

const Login = () => {
  const imagePaths = [
    "/images/login-background.jpeg",
    "/images/login-background.jpeg",
    "/images/login-background.jpeg"
  ];

  const [randomImage] = useState<string>(imagePaths[0]);

  return (
    <div className="flex h-screen items-center justify-center">
      <div className="relative flex flex-col text-center">
        <div
          className="h-[812px] w-[375px] bg-cover bg-center"
          style={{ backgroundImage: `url(${randomImage})` }}
        ></div>
        <div className="absolute top-[144px] m-0 flex w-full justify-center p-0">
          <img
            src="/images/login-logo.png"
            alt="Logo"
            className="h-[50px] w-[119px]"
          />
        </div>
        <div className="absolute bottom-[74px] flex w-full justify-center">
          <div className="flex flex-col space-y-4">
            <KakaoLoginButton />
            <GoogleLoginButton />
          </div>
        </div>
      </div>
    </div>
  );
};
export default Login;
