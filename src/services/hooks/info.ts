import { getUserInfo } from "../apis/infoApi";
import { getValidToken } from "../apis/authApi";
import { useQuery } from "@tanstack/react-query";

export const useGetUserInfo = () => {
  return useQuery({
    queryKey: ["accountInfo"],
    queryFn: () => getUserInfo(),
    staleTime: 5 * 60 * 1000, // 데이터가 신선하게 유지될 시간
  });
};
