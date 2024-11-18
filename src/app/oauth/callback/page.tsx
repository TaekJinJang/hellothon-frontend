// src/app/oauth/callback/page.tsx
"use client";

import { Suspense, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";

import CenteredContainer from "@/components/CenteredContainer";
import LoadingSpinner from "@/components/LoadingSpinner";
import { getAccessCode } from "@/services/apis";

export default function OAuthCallbackPage() {
  return (
    <Suspense fallback={<div>로딩 중...</div>}>
      <OAuthCallback />
    </Suspense>
  );
}

function OAuthCallback() {
  const router = useRouter();
  const searchParams = useSearchParams();

  function requestAccessToken(code: string) {
    getAccessCode(code)
      .then((data) => {
        // Access Token을 로컬 스토리지에 저장
        localStorage.setItem("accessToken", data.access_token);
        // 유저 대시보드로 리디렉트
        window.location.href = "/user/dashboard";
      })
      .catch((error) => {
        console.error(error);
        alert("로그인 중 문제가 발생했습니다. 다시 시도해 주세요.");
        router.push("/oauth");
      });
  }

  useEffect(() => {
    const code = searchParams.get("code") as string | undefined;

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
