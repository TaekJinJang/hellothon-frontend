"use client";

import { LOGIN_ERROR_MESSAGE, LOGIN_FAIL_MESSAGE } from "@/utils/constants/alertMessages";
import { getValidToken, login } from "@/services/apis/auth";
import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

import CenteredContainer from "@/components/CenteredContainer";
import Image from "next/image";
import LoadingComponent from "@/containers/oauth/callback/LoadingComponent";
import SuccessComponent from "@/containers/oauth/callback/SuccessComponent";
import logo from "@imgs/logo.png";
import useAlertStore from "@/store/alertStore";

export default function OAuthCallbackContainer() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const setAlert = useAlertStore((state) => state.setAlert);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const code = searchParams.get("code") as string | undefined;

    async function requestAccessToken(code: string) {
      const redirectUri = process.env.NEXT_PUBLIC_OAUTH_REDIRECT_URI || "";
      try {
        await login(code, redirectUri);
      } catch (error) {
        console.error(error);
        setAlert(LOGIN_ERROR_MESSAGE, "error");

        router.push("/oauth");
      } finally {
        setIsLoading(false);
      }
    }
    if (getValidToken() !== null) {
      // 유저 대시보드로 리디렉트
      router.push("/user/posts");
    }

    if (code) {
      requestAccessToken(code);
    } else {
      router.push("/oauth");
    }
  }, [searchParams, router, setAlert]);

  return (
    <CenteredContainer>
      <div className="flex">
        <Image src={logo} alt="logo Image" width={280} height={120} />
      </div>
      {isLoading ? <LoadingComponent /> : <SuccessComponent />}
    </CenteredContainer>
  );
}
