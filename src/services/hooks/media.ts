import { UseQueryResult, useQuery } from "@tanstack/react-query";
import { getMediaData, getMediaDetail } from "../apis/media";

export const useGetMedia = (): UseQueryResult<MediaType[], Error> => {
  return useQuery({
    queryKey: ["mediaData"],
    queryFn: () => getMediaData(),
    staleTime: 0,
  });
};
export const useGetMediaDetail = (id: string | undefined): UseQueryResult<MediaDetailType, Error> => {
  return useQuery({
    queryKey: ["mediaDetail", id],
    queryFn: () => {
      return getMediaDetail(id);
    },
    enabled: !!id,
    staleTime: 0,
    retry: false,
  });
};
