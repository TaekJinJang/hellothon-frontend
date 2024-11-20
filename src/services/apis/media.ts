import axiosInstance from "./client";

export const getMediaData = async (): Promise<MediaType[]> => {
  try {
    const response = await axiosInstance.get("/media");
    return response.data;
  } catch (error) {
    console.error("Error getting media data:", error);
    throw error;
  }
};
export const getMediaDetail = async (id: string | undefined): Promise<MediaDetailType> => {
  if (!id) {
    throw new Error("Invalid ID");
  }
  try {
    const response = await axiosInstance.get(`/media/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error getting media data:", error);
    throw error;
  }
};
