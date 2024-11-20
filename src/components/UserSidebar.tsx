"use client";

import React, { useEffect } from "react";
import { Sidebar, SidebarContent, SidebarFooter, SidebarGroup, SidebarHeader, SidebarProvider } from "./ui/sidebar";

import Image from "next/image";
import { getValidToken } from "@/services/apis/authApi";
import { useGetUserInfo } from "@/services/hooks/info";
import { useRouter } from "next/navigation";

const UserSidebar = () => {
  const router = useRouter();
  const token = getValidToken();
  const { data, isLoading, error } = useGetUserInfo();
  useEffect(() => {
    if (!token) {
      router.push("/oauth"); // 로그인하지 않은 경우 로그인 페이지로 리다이렉트
    }
  }, [token, router]);

  // 사용자 데이터 예시
  const userData = {
    name: "NAME",
    instagramId: "instagram_id",
    profilePicture: "/path/to/profile-picture.png",
  };

  return (
    <SidebarProvider>
      <Sidebar className="h-screen w-64 bg-white shadow-md flex flex-col">
        {/* Sidebar Header */}
        <SidebarHeader className="p-4 border-b">
          <div className="flex flex-col items-center">
            <div className="rounded-full overflow-hidden w-24 h-24 mb-3">
              <Image
                src={data?.profile_picture_url ?? ""}
                alt="Profile Picture"
                width={96}
                height={96}
                className="object-cover"
              />
            </div>
            <h2 className="text-lg font-bold">{data?.name}</h2>
            <p className="text-sm text-gray-500">@{data?.username}</p>
          </div>
        </SidebarHeader>

        {/* Sidebar Content */}
        <SidebarContent className="flex-1 overflow-y-auto p-4">
          <SidebarGroup>
            <div
              onClick={() => router.push("/user/comments")}
              className="flex items-center cursor-pointer text-gray-700 hover:bg-gray-100 p-2 rounded-md"
            >
              <span role="img" aria-label="댓글 관리">
                💬
              </span>
              <span className="ml-2">댓글 관리</span>
            </div>

            <div
              onClick={() => router.push("/user/insights")}
              className="flex items-center cursor-pointer text-gray-700 hover:bg-gray-100 p-2 rounded-md mt-4"
            >
              <span role="img" aria-label="인사이트">
                📊
              </span>
              <span className="ml-2">인사이트</span>
            </div>
          </SidebarGroup>
        </SidebarContent>

        {/* Sidebar Footer */}
        <SidebarFooter className="p-4 border-t">
          <div
            onClick={() => router.push("/help")}
            className="flex items-center cursor-pointer text-gray-700 hover:bg-gray-100 p-2 rounded-md"
          >
            <span role="img" aria-label="도움말">
              ℹ️
            </span>
            <span className="ml-2">도움말</span>
          </div>
          <div
            onClick={() => {
              localStorage.removeItem("token"); // 로그아웃 처리
              router.push("/login");
            }}
            className="flex items-center cursor-pointer text-red-600 hover:bg-red-50 p-2 rounded-md mt-4"
          >
            <span role="img" aria-label="로그아웃">
              🔓
            </span>
            <span className="ml-2">로그아웃</span>
          </div>
        </SidebarFooter>
      </Sidebar>
    </SidebarProvider>
  );
};

export default UserSidebar;
