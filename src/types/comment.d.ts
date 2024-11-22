interface CommentType {
  id: string;
  text: string;
  user: boolean;
  toxicity: boolean;
  filtered: string;
  timestamp: string;
  username: string;
}

interface ReplyType {
  reply: string;
}
type CommentWithReplyType = CommentType & {
  recommendedReplies?: string[]; // 선택적 필드
};
