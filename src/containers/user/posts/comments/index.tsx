"use client";

import { CommentCard, SkeletonCommentCardList } from "./CommentCard";
import { useMemo, useState } from "react";

import Alert from "@/utils/Alert";
import CommentLayout from "@/layouts/CommentLayout";
import { CommentTabs } from "./CommentTabs";
import { ERROR_MESSAGE } from "@/utils/constants/alertMessage";
import { SortSelect } from "./SortSelect";
import { useGetCommentsWithAsyncReplies } from "@/services/hooks/comment";

type UserCommentsContainerState = {
  tab: "positive" | "negative";
  sortOrder: "newest" | "oldest";
};

export default function UserCommentsContainer({ postId }: { postId: string }) {
  const [tab, setTab] = useState<UserCommentsContainerState["tab"]>("positive");
  const [sortOrder, setSortOrder] = useState<UserCommentsContainerState["sortOrder"]>("newest");

  // 수정된 훅을 사용하여 댓글 데이터를 먼저 가져오고, 이후 추천 답글을 비동기로 추가
  const { data: comments, isLoading, error } = useGetCommentsWithAsyncReplies(postId, tab);

  const sortedComments = useMemo<CommentWithReplyType[]>(() => {
    if (!comments) return [];

    return comments.slice().sort((a, b) => {
      const dateA = new Date(a.timestamp).getTime();
      const dateB = new Date(b.timestamp).getTime();

      if (sortOrder === "newest") {
        return dateB - dateA;
      } else {
        return dateA - dateB;
      }
    });
  }, [comments, sortOrder]);

  return (
    <CommentLayout postId={postId}>
      <div className="flex flex-col">
        <div className="flex justify-between items-center mb-4">
          <SortSelect sortOrder={sortOrder} onSortChange={setSortOrder} />
          <CommentTabs tab={tab} onTabChange={setTab} />
        </div>
      </div>
      <div className="flex flex-col gap-12">
        {isLoading ? (
          <SkeletonCommentCardList />
        ) : sortedComments.length === 0 || error ? (
          <div className="text-center text-slate-400  my-6">
            {" "}
            {error && <Alert message={ERROR_MESSAGE} />}불러올 댓글이 없습니다.
          </div>
        ) : (
          sortedComments.map((comment) => <CommentCard key={comment.id} comment={comment} type={tab} />)
        )}
      </div>
    </CommentLayout>
  );
}
