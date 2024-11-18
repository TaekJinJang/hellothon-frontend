// src/services/api.ts

import axios from "axios";

// Axios 인스턴스 설정 (재사용 가능)
const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Access Token 가져오기
export async function getAccessCode(code: string): Promise<{ access_token: string }> {
  try {
    const response = await axiosInstance.post("/access_token", {
      code,
    });

    return { access_token: response.data.access_token };
  } catch (error) {
    throw new Error("Failed to get access code");
  }
}

// 사용자 정보 가져오기 예시
export async function getUserInfo(userId: string): Promise<{ name: string; id: string }> {
  try {
    const response = await axiosInstance.get(`/user/${userId}`);
    return response.data;
  } catch (error) {
    throw new Error("Failed to get user info");
  }
}

// 댓글 달기 API 예시
export async function postComment(postId: string, comment: string): Promise<{ success: boolean }> {
  try {
    const response = await axiosInstance.post(`/post/${postId}/comment`, {
      comment,
    });

    return { success: response.data.success };
  } catch (error) {
    throw new Error("Failed to post comment");
  }
}
