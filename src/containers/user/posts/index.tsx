import { MediaCardList, SkeletonMediaCardList } from "./MediaCardList";

import UserLayout from "@/layouts/UserLayout";
import { useGetMedia } from "@/services/hooks/media";
import { useState } from "react";

export default function UserPostsContainer() {
  const { data, isLoading, error } = useGetMedia();
  const [sortOrder, setSortOrder] = useState<"newest" | "oldest">("newest");

  const groupMediaByMonth = (mediaList: MediaType[], sortOrder: "newest" | "oldest"): Record<string, MediaType[]> => {
    const sortedMediaList = [...mediaList].sort((a, b) => {
      const dateA = new Date(a.timestamp);
      const dateB = new Date(b.timestamp);
      return sortOrder === "newest" ? dateB.getTime() - dateA.getTime() : dateA.getTime() - dateB.getTime();
    });

    return sortedMediaList.reduce((groups: Record<string, MediaType[]>, media: MediaType) => {
      const date = new Date(media.timestamp);
      const monthKey = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}`; // 예: "2024-11"
      if (!groups[monthKey]) {
        groups[monthKey] = [];
      }
      groups[monthKey].push(media);
      return groups;
    }, {});
  };

  const groupedData = data ? groupMediaByMonth(data, sortOrder) : {};

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSortOrder(e.target.value as "newest" | "oldest");
  };

  return (
    <UserLayout>
      <main className="flex-1 p-6 bg-gray-50">
        <div className="mb-6">
          <h2 className="text-xl font-bold mb-2">댓글 관리</h2>
          <select className="border rounded-md p-2" onChange={handleSortChange} value={sortOrder}>
            <option value="newest">최신순</option>
            <option value="oldest">오래된 순</option>
          </select>
        </div>

        <div className="space-y-8">
          {isLoading ? (
            <div className="space-y-4">
              <SkeletonMediaCardList />
            </div>
          ) : error ? (
            <p>데이터를 불러오는 중 오류가 발생했습니다: {error.message}</p>
          ) : (
            Object.entries(groupedData).map(([month, mediaList]) => (
              <div key={month} className="space-y-4">
                <h3 className="text-lg font-bold mb-4">{month}</h3>
                <MediaCardList mediaList={mediaList} />
              </div>
            ))
          )}
        </div>
      </main>
    </UserLayout>
  );
}
