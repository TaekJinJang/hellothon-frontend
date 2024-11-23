"use client";

import CenteredContainer from "@/components/CenteredContainer";
import Image from "next/image";
import LoginButton from "@/containers/oauth/LoginButton";
import { SLOGAN_MESSAGE } from "@/utils/constants/messages";
import { getValidToken } from "@/services/apis/auth";
import logo from "@imgs/logo.png";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function OAuthContainer() {
  const router = useRouter();
  useEffect(() => {
    if (getValidToken() !== null) {
      // 유저 대시보드로 리디렉트
      router.push("/user/posts");
    }
  }, [router]);
  return (
    <CenteredContainer>
      <div className="flex">
        <Image src={logo} alt="logo Image" width={280} height={120} priority />
      </div>
      <div className="text-slate-600 mt-4">{SLOGAN_MESSAGE}</div>
      <div>
        <LoginButton />
        <div
          className="text-center text-slate-400 decoration-slate-400 underline underline-offset-4 cursor-pointer"
          onClick={() => window.open("147dfd5fa589803685e8e64afbe3a117", "_blank")}
        >
          로그인 전에 확인해주세요.
        </div>
      </div>
    </CenteredContainer>
  );
}
