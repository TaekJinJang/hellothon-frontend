"use client";

import { BarChart3, RefreshCcw, Wand2 } from "lucide-react";
import { useGetEmotionalData, useGetMotivationalData } from "@/services/hooks/comment";

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
          <div className="border rounded-lg shadow-md p-4 w-2/5">
            <div className="border-b pb-4 mb-4">
              <div className="flex justify-between items-center">
                <h3 className="text-slate-800">
                  {infoData?.name}님의 콘텐츠에서
                  <br />
                  팔로워들은 이런 점을 더 알고 싶어요🤔
                </h3>
              </div>
              <div className="text-sm text-gray-400 flex flex-row mt-4 ">
                <RefreshCcw size={16} className="mr-2" />
                {new Date(emotionalSummary.data!.timestamp).toISOString().slice(0, 10)}
              </div>
              {emotionalSummary.data ? (
                <p className="font-medium h-60">{emotionalSummary.data.text}</p>
              ) : (
                <div className="text-center text-xl text-slate-400 pt-4">인사이트가 없습니다.</div>
              )}
            </div>
            <div className="flex items-center text-slate-800 font-semibold pb-2">
              <Wand2 className="mr-2" width={16} /> 추천 개선 방향
            </div>
            {emotionalInsight.data ? (
              emotionalInsight.data.map((data) => (
                <div
                  key={data.timestamp}
                  className="border rounded-md p-4 bg-slate-50 flex justify-between items-start my-2"
                >
                  <p className="text-slate-700 font-medium">{data.text}</p>
                </div>
              ))
            ) : (
              <div className="text-center text-xl text-slate-400 p-4">추천 개선 방향이 없습니다.</div>
            )}
          </div>
          <div className="border rounded-lg shadow-md p-4 w-2/5">
            <div className="border-b pb-4 mb-4">
              <div className="flex justify-between items-center">
                <h3 className="text-slate-800">
                  {infoData?.name}님의 콘텐츠에서 <br />
                  팔로워들은 이런 점을 좋아해요🥰
                </h3>
              </div>
              <div className="text-sm text-gray-400 flex flex-row mt-4 ">
                <RefreshCcw size={16} className="mr-2" />
                {new Date(motivationalSummary.data!.timestamp).toISOString().slice(0, 10)}
              </div>
              {motivationalSummary.data ? (
                <p className="font-medium h-60">{motivationalSummary.data.text}</p>
              ) : (
                <div className="text-center text-xl text-slate-400 pt-4">인사이트가 없습니다.</div>
              )}
            </div>
            <div className="flex items-center text-slate-800 font-semibold pb-2">
              <Wand2 className="mr-2" width={16} /> 추천 개선 방향
            </div>
            {motivationalInsight.data ? (
              motivationalInsight.data.map((data) => (
                <div
                  key={data.timestamp}
                  className="border rounded-md p-4 bg-slate-50 flex justify-between items-start my-2"
                >
                  <p className="text-slate-700 font-medium">{data.text}</p>
                </div>
              ))
            ) : (
              <div className="text-center text-xl text-slate-400 p-4">추천 개선 방향이 없습니다.</div>
            )}
          </div>
        </div>
      </main>
    </UserLayout>
  );
}
