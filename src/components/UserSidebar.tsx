import { BarChart3, Info, LogOut, MessageCircle } from "lucide-react";
import React, { useEffect } from "react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarMenuButton,
  SidebarProvider,
} from "./ui/sidebar";
import { getValidToken, logout } from "@/services/apis/auth";
import { usePathname, useRouter } from "next/navigation";

import Image from "next/image";
import logo from "@imgs/logo.png";
import { useGetUserInfo } from "@/services/hooks/info";

const UserSidebar = () => {
  const router = useRouter();
  const pathname = usePathname();
  const token = getValidToken();
  const { data, isLoading, error } = useGetUserInfo();
  useEffect(() => {
    if (!token) {
      router.push("/oauth"); // 로그인하지 않은 경우 로그인 페이지로 리다이렉트
    }
  }, [token, router]);

  const handleLogOut = async () => {
    await logout();
    localStorage.removeItem("token"); // 로그아웃 처리
    router.push("/oauth");
  };

  return (
    <SidebarProvider>
      <Sidebar className="w-64 bg-white flex flex-col p-4">
        {/* Sidebar Header */}
        <SidebarHeader className="">
          <Image src={logo} alt="logo Image" objectFit="contain" width={144} height={48} className="mb-4" />
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
              <div className="animate-pulse w-24 h-4 bg--gray200 rounded-md"></div>
            ) : (
              <p className="text-sm text-gray-500">@{data?.username}</p>
            )}
          </div>
        </SidebarHeader>

        {/* Sidebar Content */}
        <SidebarContent className="flex-1 overflow-y-auto border-t p-0">
          <SidebarGroup>
            <div
              onClick={() => router.push("/user/posts")}
              className={`flex items-center cursor-pointer ${pathname === "/user/posts" ? "bg-slate-100 text-slate-800" : "text-slate-600 hover:bg-slate-100"} px-2 py-2 mt-2 rounded-md`}
            >
              <MessageCircle />
              <span className="ml-2">댓글 관리</span>
            </div>

            <div
              onClick={() => router.push("/user/insights")}
              className={`flex items-center cursor-pointer ${pathname === "/user/insights" ? "bg-slate-100 text-slate-800" : "text-slate-600 hover:bg-slate-100"} px-2 py-2 mt-2 rounded-md`}
            >
              <BarChart3 />
              <span className="ml-2">인사이트</span>
            </div>
          </SidebarGroup>
        </SidebarContent>

        {/* Sidebar Footer */}
        <SidebarFooter className="p-4 border-t">
          <div
            onClick={handleLogOut}
            className="flex items-center cursor-pointer text-gray-700 hover:bg-gray-100 rounded-md"
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
