export async function requestInstagramAccessToken(code: string) {
  try {
    //   const response = await fetch('/api/auth/instagram', {
    //     method: 'POST',
    //     headers: {
    //       'Content-Type': 'application/json',
    //     },
    //     body: JSON.stringify({ code }),
    //   });
    //   return await response.json();
    await new Promise((resolve) => setTimeout(resolve, 1000)); // 1초 대기 후 응답
    if (code !== "") {
      return { success: true, accessToken: "code" };
    } else {
      return { success: false, message: "Invalid Authorization Code" };
    }
  } catch (error) {
    throw new Error("Access Token 요청 중 오류 발생");
  }
}
