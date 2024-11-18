// https://developers.facebook.com/docs/instagram-platform/instagram-api-with-instagram-login/get-started#get-the-app-user-id---username
export function makeOAuthUrl() {
  const enable_fb_login = "0";
  const force_authentication = "1";
  const client_id = process.env.NEXT_PUBLIC_IG_CLIENT_ID ?? "";
  const redirect_uri = process.env.NEXT_PUBLIC_OAUTH_REDIRECT_URI ?? "";

  // 필수 환경 변수 체크
  if (!client_id || !redirect_uri) {
    throw new Error(
      "필수 환경 변수가 설정되지 않았습니다. NEXT_PUBLIC_IG_CLIENT_ID 또는 NEXT_PUBLIC_OAUTH_REDIRECT_URI를 확인하세요.",
    );
  }
  const response_type = "code";
  const scope = [
    "instagram_business_basic",
    "instagram_business_manage_messages",
    "instagram_business_manage_comments",
    "instagram_business_content_publish",
  ].join(",");
  const baseUrl = "https://www.instagram.com/oauth/authorize";
  const params = new URLSearchParams({
    client_id,
    redirect_uri,
    response_type,
    scope,
    enable_fb_login,
    force_authentication,
  }).toString();
  return `${baseUrl}?${params}`;
}
