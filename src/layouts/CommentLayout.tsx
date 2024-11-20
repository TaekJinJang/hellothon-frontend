import { MediaCardList } from "@/containers/user/posts/MediaCardList";
import React from "react";
import { useGetMediaDetail } from "@/services/hooks/media";

interface CommentLayoutProps {
  children: React.ReactNode;
  postId: string;
  className?: string;
}

const CommentLayout = ({ children, postId, className }: CommentLayoutProps) => {
  const { data: mediaDetail, isLoading, error } = useGetMediaDetail(postId);
  if (!mediaDetail) {
    return <></>;
  }
  return (
    <>
      <header className="p-6 border-b border-gray-200 text-xl font-semibold">댓글 관리</header>
      <div className="flex p-6 gap-8">
        <div className="w-1/4 p-4 ">
          <MediaCardList mediaList={[mediaDetail]} width={240} height={400} />
        </div>
        <main className="flex-1 p-4 ">{children}</main>
      </div>
    </>
  );
};

export default CommentLayout;
