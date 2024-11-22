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

//추천 답글 데이터를 생성한다.
export const postRecommendReply = async (comment: CommentType, limit: number): Promise<ReplyType[]> => {
  try {
    const response = await axiosInstance.post("/comment/reply/recommend", comment, {
      params: {
        limit,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error getting recommended reply:", error);
    throw error;
  }
};
