"use client";

import { LOGIN_ERROR_MESSAGE, LOGIN_FAIL_MESSAGE } from "@/utils/constants/alertMessage";
import { Suspense, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

import { Button } from "@/components/ui/button";
import CenteredContainer from "@/components/CenteredContainer";
import Image from "next/image";
import loadingSpinner from "@imgs/loadingSpinner.gif";
import { login } from "@/services/apis/auth";
import logo from "@imgs/logo.png";
import useAlertStore from "@/store/alertStore";

export default function OAuthCallbackContainer() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const setError = useAlertStore((state) => state.setError);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const code = searchParams.get("code") as string | undefined;
    function requestAccessToken(code: string) {
      const redirectUri = process.env.NEXT_PUBLIC_OAUTH_REDIRECT_URI || "";
      login(code, redirectUri)
        .catch((error) => {
          console.error(error);
          setError(LOGIN_ERROR_MESSAGE);
          router.push("/oauth");
        })
        .finally(() => setIsLoading(false));
    }

    if (code) {
      requestAccessToken(code);
    } else {
      setError(LOGIN_FAIL_MESSAGE);
      router.push("/oauth");
    }
  }, [searchParams, router, setError]);

  return (
    <CenteredContainer>
      <div className="flex">
        <Image src={logo} alt="logo Image" width={280} height={120} />
      </div>
      {isLoading ? (
        <>
          <Image src={loadingSpinner} alt="loadingSpinner" width={300} height={300} />
          <div className="text-slate-800">인플루언서님의 마음을 담는 중입니다.</div>
          <div className="text-slate-800">잠시만 기다려 주세요.</div>
        </>
      ) : (
        <>
          <div className="text-slate-800 my-8">인센스에 인플루언서님의 마음 담기가 완료되었습니다.</div>
          <Button
            onClick={() => router.push("/user/posts")}
            size="lg"
            className="w-[330px] text-white bg-slate-900 rounded-md hover:bg-slate-900"
          >
            인센스 시작하기
          </Button>
        </>
      )}
    </CenteredContainer>
  );
}
