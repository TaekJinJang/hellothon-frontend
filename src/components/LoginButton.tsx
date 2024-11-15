"use client";

import { Button } from "./ui/button";
import React from "react";

export default function LoginButton() {
  const handleLogin = () => {
    // OAuth 인증 URL로 리디렉션
    const redirectUri = process.env.NEXT_PUBLIC_OAUTH_REDIRECT_URI;
    window.location.href = `https://www.instagram.com/oauth/authorize?enable_fb_login=0&force_authentication=1&client_id=939297224922758&redirect_uri=${redirectUri}&response_type=code&scope=instagram_business_basic%2Cinstagram_business_manage_messages%2Cinstagram_business_manage_comments%2Cinstagram_business_content_publish`;
  };

  return <Button onClick={handleLogin}>인스타그램으로 로그인</Button>;
}
