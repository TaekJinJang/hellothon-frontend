import type { Metadata } from "next";
import OAuthCallbackContainer from "@/containers/oauth/callback";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "로그인 과정 : insense",
};

export default function OAuthCallbackPage() {
  return (
    <Suspense>
      <OAuthCallbackContainer />
    </Suspense>
  );
}
