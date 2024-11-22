import OAuthCallbackContainer from "@/containers/oauth/callback";
import { Suspense } from "react";

export default function OAuthCallbackPage() {
  return (
    <Suspense>
      <OAuthCallbackContainer />
    </Suspense>
  );
}
