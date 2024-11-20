import { UseQueryResult, useQuery } from "@tanstack/react-query";

import { getComments } from "../apis/comment";
import { getMediaDetail } from "../apis/media";

export const useGetComments = (
  id: string | undefined,
  type: "positive" | "negative",
): UseQueryResult<CommentType[], Error> => {
  return useQuery<CommentType[], Error>({
    queryKey: ["comments", id, type],
    queryFn: () => getComments(id as string, type),
    enabled: !!id,
    staleTime: 0,
    retry: false,
  });
};
