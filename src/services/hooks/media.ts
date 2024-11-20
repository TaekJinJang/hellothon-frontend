import { UseQueryResult, useQuery } from "@tanstack/react-query";

import { getMediaData } from "../apis/media";

export const useGetMedia = (): UseQueryResult<MediaType[], Error> => {
  return useQuery({
    queryKey: ["mediaData"],
    queryFn: () => getMediaData(),
    staleTime: 0,
  });
};
