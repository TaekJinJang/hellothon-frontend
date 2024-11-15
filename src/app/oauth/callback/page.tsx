// src/app/oauth/callback/page.tsx
"use client";

import { Suspense, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";

import CenteredContainer from "@/components/CenteredContainer";
import { requestInstagramAccessToken } from "@/services/instagram";

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

  useEffect(() => {
    const code = searchParams.get("code") as string | undefined;

    if (code) {
      // Authorization Code를 백엔드로 보내 Access Token 발급 요청
      requestInstagramAccessToken(code)
        .then((data) => {
          if (data.success) {
            // 성공적으로 Access Token 발급 후 다음 페이지로 이동
            router.push("/user/dashboard");
          } else {
            alert("로그인 중 문제가 발생했습니다. 다시 시도해 주세요.");
            router.push("/oauth");
          }
        })
        .catch(() => {
          alert("로그인 중 문제가 발생했습니다. 다시 시도해 주세요.");
          router.push("/oauth");
        });
    } else {
      alert("인증 코드가 없습니다. 다시 시도해 주세요.");
      router.push("/oauth");
    }
  }, [searchParams, router]);

  return <CenteredContainer>로그인 처리 중입니다...</CenteredContainer>;
}
