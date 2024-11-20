import axiosInstance from "./client";

// 계정 정보 불러오기
type UserInfoProfileType = {
  name: string;
  username: string;
  profile_picture_url: string;
};

export const getUserInfo = async (): Promise<UserInfoProfileType> => {
  try {
    const response = await axiosInstance.get("/info/profile");
    return response.data;
  } catch (error) {
    console.error("Error getting user info:", error);
    throw error;
  }
};
