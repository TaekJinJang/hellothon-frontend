import { getUserInfo } from "../apis/info";
import { useQuery } from "@tanstack/react-query";

export const useGetUserInfo = () => {
  return useQuery({
    queryKey: ["accountInfo"],
    queryFn: () => getUserInfo(),
    staleTime: 60 * 60 * 1000, // 60분간 데이터 유지
  });
};
