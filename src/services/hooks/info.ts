import { getUserInfo } from "../apis/infoApi";
import { getValidToken } from "../apis/authApi";
import { useQuery } from "@tanstack/react-query";

export const useGetUserInfo = () => {
  return useQuery({
    queryKey: ["accountInfo"],
    queryFn: () => getUserInfo(),
  });
};
