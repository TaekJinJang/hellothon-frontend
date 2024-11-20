import axiosInstance from "./client";

// 계정 정보 불러오기
type AccountInfoType = {
  name: string;
  username: string;
  account_type: string;
  followers_count: string;
};

export const getAccountInfo = async (): Promise<AccountInfoType> => {
  try {
    const response = await axiosInstance.get("/info");
    return response.data;
  } catch (error) {
    console.error("Error fetching account info:", error);
    throw error;
  }
};
