import type { Metadata } from "next";
import OAuthContainer from "@/containers/oauth";

export const metadata: Metadata = {
  title: "로그인 : insense",
};
export default function OAuthPage() {
  return <OAuthContainer />;
}
