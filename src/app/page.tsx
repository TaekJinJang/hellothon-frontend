"use client";

import { getValidToken } from "@/services/apis/auth";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  useEffect(() => {
    if (getValidToken() !== null) {
      // 유저 대시보드로 리디렉트
      router.push("/user/posts");
    } else {
      router.push("oauth");
    }
  }, [router]);
  return null;
}
