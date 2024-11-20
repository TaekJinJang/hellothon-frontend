import axiosInstance from "./client";

export const getComments = async (id: string, type: "positive" | "negative"): Promise<CommentType[]> => {
  try {
    const response = await axiosInstance.get(`/comment/${id}/${type}`);
    return response.data;
  } catch (error) {
    console.error("Error getting comments data:", error);
    throw error;
  }
};
