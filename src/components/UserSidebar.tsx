import { BarChart3, Info, LogOut, MessageCircle } from "lucide-react";
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
              {isLoading ? (
                <div className="animate-pulse w-24 h-24 bg-gray-200 rounded-full"></div>
              ) : (
                <Image
                  src={data?.profile_picture_url ?? ""}
                  alt="Profile Picture"
                  width={96}
                  height={96}
                  className="object-cover"
                />
              )}
            </div>
            {isLoading ? (
              <div className="animate-pulse w-32 h-6 bg-gray-200 rounded-md"></div>
            ) : (
              <h2 className="text-lg font-bold">{data?.name}</h2>
            )}
            {isLoading ? (
              <div className="animate-pulse w-24 h-4 bg-gray-200 rounded-md"></div>
            ) : (
              <p className="text-sm text-gray-500">@{data?.username}</p>
            )}
          </div>
        </SidebarHeader>

        {/* Sidebar Content */}
        <SidebarContent className="flex-1 overflow-y-auto p-4">
          <SidebarGroup>
            <div
              onClick={() => router.push("/user/comments")}
              className="flex items-center cursor-pointer text-gray-700 hover:bg-gray-100 p-2 rounded-md"
            >
              <MessageCircle />
              <span className="ml-2">댓글 관리</span>
            </div>

            <div
              onClick={() => router.push("/user/insights")}
              className="flex items-center cursor-pointer text-gray-700 hover:bg-gray-100 p-2 rounded-md mt-4"
            >
              <BarChart3 />
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
            <Info />
            <span className="ml-2">도움말</span>
          </div>
          <div
            onClick={() => {
              localStorage.removeItem("token"); // 로그아웃 처리
              router.push("/login");
            }}
            className="flex items-center cursor-pointer text-red-600 hover:bg-red-50 p-2 rounded-md mt-4"
          >
            <LogOut />
            <span className="ml-2">로그아웃</span>
          </div>
        </SidebarFooter>
      </Sidebar>
    </SidebarProvider>
  );
};

export default UserSidebar;
