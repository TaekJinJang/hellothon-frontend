import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

import CommentLayout from "@/layouts/CommentLayout";
import { useGetComments } from "@/services/hooks/comment";
import { useState } from "react";

export default function UserCommentsContainer({ postId }: { postId: string }) {
  const [tab, setTab] = useState<"positive" | "negative">("positive");

  const { data: comments, isLoading, error } = useGetComments(postId, tab);

  //   <Tabs defaultValue="account" className="w-[400px]">
  //   <TabsList>
  //     <TabsTrigger value="account">Account</TabsTrigger>
  //     <TabsTrigger value="password">Password</TabsTrigger>
  //   </TabsList>
  //   <TabsContent value="account">Make changes to your account here.</TabsContent>
  //   <TabsContent value="password">Change your password here.</TabsContent>
  // </Tabs>

  if (!comments) {
    return <></>;
  }

  return (
    <CommentLayout postId={postId}>
      <div className="flex flex-col gap-4">
        <div className="flex justify-between items-center mb-4">
          <select className="border rounded-md p-2 text-sm">
            <option>최신순</option>
            <option>오래된순</option>
          </select>
          <Tabs
            defaultValue="positive"
            onValueChange={(value) => setTab(value as "positive" | "negative")}
            className="mr-8"
          >
            <TabsList>
              <TabsTrigger value="positive">긍정댓글</TabsTrigger>
              <TabsTrigger value="negative">부정댓글</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
      </div>
      <div className="flex flex-col gap-6">
        {comments.map((comment) => (
          <div key={comment.id} className="border rounded-lg shadow-md p-8">
            <div className="border-b pb-4">
              <p className="font-medium">{comment.username}</p>
              <p className="text-gray-600">{comment.text}</p>
              <p className="text-sm text-gray-400">{new Date(comment.timestamp).toLocaleDateString()}</p>
            </div>
          </div>
        ))}
      </div>
    </CommentLayout>
  );
}
