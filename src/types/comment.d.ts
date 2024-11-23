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
  id: string;
  reply: string;
}
type CommentWithReplyType = CommentType & {
  recommendedReplies?: ReplyType[]; // 선택적 필드
};
