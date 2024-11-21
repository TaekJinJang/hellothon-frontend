import { MediaCardList, SkeletonMediaCardList } from "./MediaCardList";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

import { MessageCircle } from "lucide-react";
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

  const handleSortChange = (value: "newest" | "oldest") => {
    setSortOrder(value as "newest" | "oldest");
  };

  return (
    <UserLayout>
      <main className="flex-1 p-6">
        <div className="mb-6">
          <h2 className="text-xl font-bold mb-2 flex flex-row">
            <MessageCircle className="mr-2" />
            댓글 관리
          </h2>
          <div className="my-4">
            <Select onValueChange={(value: "newest" | "oldest") => handleSortChange(value)} value={sortOrder}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="newest">최신순</SelectItem>
                <SelectItem value="oldest">오래된 순</SelectItem>
              </SelectContent>
            </Select>
          </div>
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
