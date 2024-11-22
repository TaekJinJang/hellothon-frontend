import type { Metadata } from "next";
import UserCommentsContainer from "@/containers/user/posts/comments";

export const metadata: Metadata = {
  title: "댓글 관리 : insense",
};

export default function UserCommentsPage({ params }: { params: { id: string } }) {
  const id = params.id;

  return <UserCommentsContainer postId={id} />;
}
