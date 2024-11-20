"use client";

import UserCommentsContainer from "@/containers/user/posts/comments";

export default function UserCommentsPage({ params }: { params: { id: string } }) {
  const id = params.id;

  return <UserCommentsContainer postId={id} />;
}
