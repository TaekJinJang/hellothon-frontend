import { MediaCardList, SkeletonMediaCardList } from "@/containers/user/posts/MediaCardList";

import { ChevronLeft } from "lucide-react";
import React from "react";
import { useGetMediaDetail } from "@/services/hooks/media";
import { useRouter } from "next/navigation";

interface CommentLayoutProps {
  children: React.ReactNode;
  postId: string;
  className?: string;
}

const CommentLayout = ({ children, postId, className }: CommentLayoutProps) => {
  const router = useRouter();
  const { data: mediaDetail, isLoading, error } = useGetMediaDetail(postId);

  return (
    <>
      <header className="px-12 py-10  text-xl font-semibold flex items-center">
        <ChevronLeft className="mr-2 cursor-pointer" onClick={() => router.back()} />
        댓글 관리
      </header>

      <div className="flex px-12 pb-12">
        <div className="pr-12">
          {isLoading ? (
            <SkeletonMediaCardList count={1} width={240} height={468} />
          ) : (
            mediaDetail && <MediaCardList mediaList={[mediaDetail]} width={240} height={468} />
          )}
        </div>
        <main className="flex-1 ">{children}</main>
      </div>
    </>
  );
};

export default CommentLayout;
