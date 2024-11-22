"use client";

import { INSTAGRAM_REDIRECT_BUTTON, INSTAGRAM_URL, NO_POSTS_MESSAGE } from "@/utils/constants/messages";
import { MediaCardList, SkeletonMediaCardList } from "./MediaCardList";

import Alert from "@/utils/Alert";
import { Button } from "@/components/ui/button";
import { ERROR_MESSAGE } from "@/utils/constants/alertMessages";
import { MessageCircle } from "lucide-react";
import { SortSelect } from "@/components/SortSelect";
import UserLayout from "@/layouts/UserLayout";
import { useGetMedia } from "@/services/hooks/media";
import { useQueryClient } from "@tanstack/react-query";
import { useState } from "react";

export default function UserPostsContainer() {
  const { data, isLoading, error } = useGetMedia();
  const queryClient = useQueryClient();

  const [sortOrder, setSortOrder] = useState<"newest" | "oldest">("newest");

  const handleInstagramRedirect = () => {
    // 캐시에서 사용자 정보를 가져옴
    const userInfo = queryClient.getQueryData<UserInfoProfileType>(["accountInfo"]);

    // username이 존재하면 인스타그램 프로필로 이동
    if (userInfo?.username) {
      const username = userInfo.username;
      window.open(`${INSTAGRAM_URL}${username}/`, "_blank");
    } else {
      window.open(INSTAGRAM_URL, "_blank");
    }
  };

  const groupMediaByMonth = (mediaList: MediaType[], sortOrder: "newest" | "oldest"): Record<string, MediaType[]> => {
    const sortedMediaList = [...mediaList].sort((a, b) => {
      const dateA = new Date(a.timestamp);
      const dateB = new Date(b.timestamp);
      return sortOrder === "newest" ? dateB.getTime() - dateA.getTime() : dateA.getTime() - dateB.getTime();
    });

    return sortedMediaList.reduce((groups: Record<string, MediaType[]>, media: MediaType) => {
      const date = new Date(media.timestamp);
      const monthKey = `${date.getFullYear()}.${String(date.getMonth() + 1).padStart(2, "0")}.`; // 예: "2024-11"
      if (!groups[monthKey]) {
        groups[monthKey] = [];
      }
      groups[monthKey].push(media);
      return groups;
    }, {});
  };

  const groupedData = data ? groupMediaByMonth(data, sortOrder) : {};

  const handleSortChange = (value: "newest" | "oldest") => {
    setSortOrder(value as "newest" | "oldest");
  };

  return (
    <UserLayout>
      <main className="flex-1 ">
        <header className="mb-6">
          <h3 className="text-slate-800 mb-2 flex flex-row">
            <MessageCircle className="mr-2" />
            댓글 관리
          </h3>
          <div className="my-4">
            <SortSelect sortOrder={sortOrder} onSortChange={handleSortChange} />
          </div>
        </header>

        <div className="space-y-8">
          {isLoading ? (
            // 로딩 중일 때 스켈레톤 UI 표시
            <div className="space-y-4">
              <SkeletonMediaCardList />
            </div>
          ) : Object.keys(groupedData).length === 0 || error ? (
            <div className="flex items-center flex-col">
              <div className="text-center text-slate-400  my-6">{NO_POSTS_MESSAGE}</div>
              <Button size={"sm"} onClick={handleInstagramRedirect}>
                {INSTAGRAM_REDIRECT_BUTTON}
              </Button>
              {error && <Alert message={ERROR_MESSAGE} />}
            </div>
          ) : (
            Object.entries(groupedData).map(([month, mediaList]) => (
              <div key={month} className="space-y-4">
                <h4 className="mb-4">{month}</h4>
                <MediaCardList mediaList={mediaList} />
              </div>
            ))
          )}
        </div>
      </main>
    </UserLayout>
  );
}
