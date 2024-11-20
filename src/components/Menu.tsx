import React, { useEffect } from "react";

import { getValidToken } from "@/services/apis/authApi";
import { useGetUserInfo } from "@/services/hooks/info";
import { useRouter } from "next/navigation";

const Menu = () => {
  const router = useRouter();
  const token = getValidToken();

  useEffect(() => {
    if (!token) {
      router.push("/oauth"); // 로그인하지 않은 경우 로그인 페이지로 리다이렉트
    }
  }, [token, router]);

  const { data, isLoading, error } = useGetUserInfo();

  if (isLoading) {
    return <p>Loading user info...</p>;
  }

  if (error) {
    return <p>계정 정보를 불러오는 중 오류가 발생했습니다.</p>;
  }
  console.log(data);
  return <div>{data ? <p>Welcome to your Menu, {data.name}</p> : <p>Loading...</p>}</div>;
};

export default Menu;
