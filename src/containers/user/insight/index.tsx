"use client";

import { BarChart3, RefreshCcw, Wand2 } from "lucide-react";
import { useGetEmotionalData, useGetMotivationalData } from "@/services/hooks/comment";

import { InsightCard } from "./InsightCard";
import UserLayout from "@/layouts/UserLayout";
import { useGetUserInfo } from "@/services/hooks/info";

export default function UserInsightContainer() {
  const { summary: emotionalSummary, insight: emotionalInsight } = useGetEmotionalData();
  const { summary: motivationalSummary, insight: motivationalInsight } = useGetMotivationalData();

  const { data: infoData } = useGetUserInfo();

  // Loading and error states for emotional and motivational data
  const isLoading =
    emotionalSummary.isLoading ||
    emotionalInsight.isLoading ||
    motivationalSummary.isLoading ||
    motivationalInsight.isLoading;
  const error =
    emotionalSummary.error || emotionalInsight.error || motivationalSummary.error || motivationalInsight.error;

  const userName = infoData?.name;
  if (isLoading) {
    return (
      <UserLayout>
        <main className="flex-1">
          <div className="text-center p-8">데이터를 불러오는 중입니다...</div>
        </main>
      </UserLayout>
    );
  }

  if (error) {
    return (
      <UserLayout>
        <main className="flex-1">
          <div className="text-center p-8 text-red-600">데이터를 불러오는데 오류가 발생했습니다.</div>
        </main>
      </UserLayout>
    );
  }

  return (
    <UserLayout>
      <main className="flex-1">
        <header className="mb-6">
          <h3 className="text-slate-800 mb-2 flex flex-row items-center">
            <BarChart3 className="mr-2" />
            인사이트 관리
          </h3>
        </header>
        <div className="flex flex-row gap-8 mb-10">
          <InsightCard insight={emotionalInsight.data} summary={emotionalSummary.data} name={userName} />
          <InsightCard insight={motivationalInsight.data} summary={motivationalSummary.data} name={userName} />
        </div>
      </main>
    </UserLayout>
  );
}
