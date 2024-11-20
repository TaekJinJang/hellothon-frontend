import axiosInstance from "./client";

export const getMediaData = async (): Promise<MediaType[]> => {
  try {
    const response = await axiosInstance.get("/media");
    return response.data;
  } catch (error) {
    console.error("Error fetching media data:", error);
    throw error;
  }
};
