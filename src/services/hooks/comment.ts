import { UseQueryResult, keepPreviousData, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  getComments,
  getEmotionalInsight,
  getEmotionalSummary,
  getMotivationalInsight,
  getMotivationalSummary,
  postRecommendReply,
} from "../apis/comment";

import { useEffect } from "react";

// Motivational Summary & Insight 데이터를 묶어서 관리하는 훅
export const useGetMotivationalData = (): {
  summary: UseQueryResult<CommentSummaryType, Error>;
  insight: UseQueryResult<CommentInsightType[], Error>;
} => {
  const motivationalSummary = useQuery<CommentSummaryType, Error>({
    queryKey: ["motivationalSummary"],
    queryFn: () => getMotivationalSummary(),
    staleTime: 60 * 1000 * 60, // 60분간 데이터 유지
    retry: false,
  });

  const motivationalInsight = useQuery<CommentInsightType[], Error>({
    queryKey: ["motivationalInsight"],
    queryFn: () => getMotivationalInsight(),
    staleTime: 60 * 1000 * 60, // 60분간 데이터 유지
    retry: false,
  });

  return {
    summary: motivationalSummary,
    insight: motivationalInsight,
  };
};

// Emotional Summary & Insight 데이터를 묶어서 관리하는 훅
export const useGetEmotionalData = (): {
  summary: UseQueryResult<CommentSummaryType, Error>;
  insight: UseQueryResult<CommentInsightType[], Error>;
} => {
  const emotionalSummary = useQuery<CommentSummaryType, Error>({
    queryKey: ["emotionalSummary"],
    queryFn: () => getEmotionalSummary(),
    staleTime: 60 * 1000 * 60, // 60분간 데이터 유지
    retry: false,
  });

  const emotionalInsight = useQuery<CommentInsightType[], Error>({
    queryKey: ["emotionalInsight"],
    queryFn: () => getEmotionalInsight(),
    staleTime: 60 * 1000 * 60, // 60분간 데이터 유지
    retry: false,
  });

  return {
    summary: emotionalSummary,
    insight: emotionalInsight,
  };
};

export const useGetComments = (
  id: string | undefined,
  type: "positive" | "negative",
): UseQueryResult<CommentType[], Error> => {
  return useQuery<CommentType[], Error>({
    queryKey: ["comments", id, type],
    queryFn: () => getComments(id as string, type),
    enabled: !!id,
    staleTime: 60 * 1000, // 1분간 데이터 유지
    retry: false,
  });
};

// 댓글과 추천 답글을 함께 가져오는 React Query 훅
export const useGetCommentsWithAsyncReplies = (
  id: string | undefined,
  type: "positive" | "negative",
  limit: number = 3,
): UseQueryResult<CommentWithReplyType[], Error> => {
  const queryClient = useQueryClient();

  // 일반 댓글 가져오기
  const queryResult = useQuery<CommentWithReplyType[], Error>({
    queryKey: ["comments", id, type],
    queryFn: () => getComments(id as string, type),
    enabled: !!id,
    staleTime: 60 * 1000 * 5, // 5분간 데이터 유지
    retry: false,
  });

  useEffect(() => {
    // 댓글이 존재하고 추천 답글이 없는 경우에만 추천 답글 요청을 수행
    if (queryResult.data) {
      // 댓글 중에 추천 답글이 아직 없는 것이 있는지 확인
      const hasNoReplies = queryResult.data.some(
        (comment) => !comment.recommendedReplies || comment.recommendedReplies.length === 0,
      );

      // 추천 답글이 없는 경우에만 비동기로 가져오기
      if (hasNoReplies) {
        const fetchReplies = async () => {
          const comments = queryResult.data ?? [];

          // 각 댓글에 대해 추천 답글을 비동기로 병렬 처리
          const updatedComments = await Promise.allSettled(
            comments.map(async (comment) => {
              // 이미 추천 답글이 있으면 건너뜀
              if (comment.recommendedReplies && comment.recommendedReplies.length > 0) {
                return comment;
              }

              try {
                // 추천 답글을 요청할 때 limit 전달
                const recommendedRepliesResponse = await postRecommendReply(comment, limit);

                return { ...comment, recommendedReplies: recommendedRepliesResponse };
              } catch {
                return { ...comment, recommendedReplies: [] }; // 추천 답글 요청 실패 시 기존 댓글 유지
              }
            }),
          );

          // 성공한 결과들을 반영하여 상태 업데이트
          const finalComments = updatedComments.map((result, index) => {
            if (result.status === "fulfilled") {
              return result.value;
            } else {
              return comments[index];
            }
          });

          // 쿼리 캐시 업데이트 (추천 답글이 추가된 경우에만)
          queryClient.setQueryData(["comments", id, type], finalComments);
        };

        fetchReplies();
      }
    }
  }, [queryResult.data, queryClient, id, type, limit]);

  return queryResult;
};
