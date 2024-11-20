import { getAccountInfo } from "../apis/infoApi";
import { getValidToken } from "../apis/authApi";
import { useQuery } from "@tanstack/react-query";

export const useGetAccountInfo = () => {
  return useQuery({
    queryKey: ["accountInfo"],
    queryFn: () => getAccountInfo(),
  });
};
