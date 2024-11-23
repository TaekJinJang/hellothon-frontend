import type { Metadata } from "next";
import React from "react";
import UserInsightContainer from "@/containers/user/insight";

export const metadata: Metadata = {
  title: "인사이트 관리 : insense",
};

export default function UserInsightPage() {
  return <UserInsightContainer />;
}
