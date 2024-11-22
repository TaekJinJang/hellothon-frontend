import type { Metadata } from "next";
import React from "react";
import UserPostsContainer from "@/containers/user/posts";

export const metadata: Metadata = {
  title: "게시물 관리 : insense",
};

export default function UserPostsPage() {
  return <UserPostsContainer />;
}
