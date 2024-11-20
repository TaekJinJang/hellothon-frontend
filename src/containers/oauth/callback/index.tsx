"use client";

import { Suspense, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";

import CenteredContainer from "@/components/CenteredContainer";
import LoadingSpinner from "@/components/LoadingSpinner";
import { login } from "@/services/apis/auth";

export default function OAuthCallbackContainer() {
  return (
    <Suspense fallback={<div>로딩 중...</div>}>
      <OAuthCallback />
    </Suspense>
  );
}

function OAuthCallback() {
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const code = searchParams.get("code") as string | undefined;
    function requestAccessToken(code: string) {
      const redirectUri = process.env.NEXT_PUBLIC_OAUTH_REDIRECT_URI || "";
      login(code, redirectUri)
        .then(() => {
          // 유저 대시보드로 리디렉트
          router.push("/user/posts");
        })
        .catch((error) => {
          console.error(error);
          alert("로그인 중 문제가 발생했습니다. 다시 시도해 주세요.");
          router.push("/oauth");
        });
    }

    if (code) {
      requestAccessToken(code);
    } else {
      alert("인증 코드가 없습니다. 다시 시도해 주세요.");
      router.push("/oauth");
    }
  }, [searchParams, router]);

  return (
    <CenteredContainer>
      {" "}
      <LoadingSpinner />
      <div>사용자 데이터를 불러오는 중입니다</div>
      <div>잠시만 기다려주세요</div>
    </CenteredContainer>
  );
}
