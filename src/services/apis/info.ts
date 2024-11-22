import axiosInstance from "./client";

export const getUserInfo = async (): Promise<UserInfoProfileType> => {
  try {
    const response = await axiosInstance.get("/info/profile");
    return response.data;
  } catch (error) {
    console.error("Error getting user info:", error);
    throw error;
  }
};
