import React from "react";
import UserSidebar from "@/components/UserSidebar";

interface UserLayoutProps {
  children: React.ReactNode;
  className?: string;
}

const UserLayout = ({ children, className }: UserLayoutProps) => {
  return (
    <div className="flex">
      <div className="w-80 bg-white">
        <UserSidebar />
      </div>
      <main className="flex-1 pl-12 pt-10">{children}</main>
    </div>
  );
};

export default UserLayout;
