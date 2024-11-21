import axiosInstance from "./client";

// 로그인 API 호출
export const login = async (code: string, redirectUri: string): Promise<string> => {
  try {
    const response = await axiosInstance.post("/auth/login", {
      code: code,
      redirect_uri: redirectUri,
      expires_seconds: 86400,
    });
    const token = response.data.token;
    const expiresAt = Date.now() + 86400 * 1000; // 유효 시간 설정
    localStorage.setItem("token", token);
    localStorage.setItem("tokenExpiresAt", expiresAt.toString());
    return token;
  } catch (error) {
    console.error("Error logging in:", error);
    throw error;
  }
};
export const logout = async (): Promise<string> => {
  try {
    const response = await axiosInstance.get("/auth/logout");
    return response.data;
  } catch (error) {
    console.error("Error logging out:", error);
    throw error;
  }
};

// 유효한 토큰 가져오기
export const getValidToken = (): string | null => {
  if (typeof window === "undefined") {
    return null; // 서버 사이드에서는 localStorage가 없으므로 null 반환
  }

  const token = localStorage.getItem("token");
  const tokenExpiresAt = localStorage.getItem("tokenExpiresAt");
  if (!token || !tokenExpiresAt || Date.now() > parseInt(tokenExpiresAt)) {
    console.warn("토큰이 만료되었거나 존재하지 않습니다. 다시 로그인해야 합니다.");
    return null;
  }
  return token;
};
