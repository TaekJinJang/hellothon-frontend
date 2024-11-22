import { Copy, Wand2 } from "lucide-react";
import { useEffect, useState } from "react";

import Alert from "@/utils/Alert";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";

interface CommentCardProps {
  comment: CommentWithReplyType;
  type: "positive" | "negative";
}
interface CommentCardState {
  dotCount: number;
  showSuccessAlert: boolean;
  showOriginalText: boolean;
}

const CommentCard = ({ comment, type }: CommentCardProps) => {
  const [dotCount, setDotCount] = useState<CommentCardState["dotCount"]>(1);
  const [showSuccessAlert, setShowSuccessAlert] = useState<CommentCardState["showSuccessAlert"]>(false);
  const [showOriginalText, setShowOriginalText] = useState<CommentCardState["showOriginalText"]>(false);

  const loadingText = `인플루언서님의 마음을 담는 중 입니다${".".repeat(dotCount)}`;
  useEffect(() => {
    // 500ms마다 dotCount를 업데이트하여 점이 늘어나게 함
    const interval = setInterval(() => {
      setDotCount((prevCount) => (prevCount === 3 ? 1 : prevCount + 1));
    }, 500);

    return () => clearInterval(interval); // 컴포넌트가 언마운트될 때 인터벌 정리
  }, []);

  return (
    <div className="border rounded-lg shadow-md p-4">
      {showSuccessAlert && (
        <Alert
          message="추천 댓글이 클립보드에 복사되었습니다."
          type="success"
          onClose={() => setShowSuccessAlert(false)}
        />
      )}
      <div className="border-b pb-4 mb-4">
        <div className="flex justify-between items-center">
          <p className="font-semibold">{comment.username}</p>
          {type === "negative" && (
            <div className="flex items-center space-x-2">
              <Switch
                id="originalTextMode"
                checked={showOriginalText}
                onCheckedChange={(check) => setShowOriginalText(check)}
              />
              <Label htmlFor="originalTextMode" className="font-small text-slate-800">
                원문 보기
              </Label>
            </div>
          )}
        </div>
        <div className="font-medium mt-2">
          {type === "negative" && !showOriginalText ? comment.filtered : comment.text}
        </div>
        <div className="text-sm text-gray-400 mt-1">{new Date(comment.timestamp).toISOString().slice(0, 10)}</div>
      </div>
      <div className="flex items-center text-slate-800 font-semibold pt-4 pb-2">
        <Wand2 className="mr-2" width={16} /> 추천 답글
      </div>

      {comment.recommendedReplies && comment.recommendedReplies.length > 0 ? (
        comment.recommendedReplies.map((reply, index) => (
          <div key={index} className="border rounded-md p-4 bg-slate-50 flex justify-between items-start my-2">
            <p className="text-slate-700 font-medium">{reply ?? loadingText}</p>
            <button
              className="text-slate-500 hover:text-slate-700 transition"
              onClick={() => {
                navigator.clipboard.writeText(reply).then(() => setShowSuccessAlert(true));
              }}
            >
              <Copy />
            </button>
          </div>
        ))
      ) : (
        <div className="border rounded-md p-4 bg-slate-50 flex justify-between items-start">
          <p className="text-slate-700 font-medium">{loadingText}</p>
        </div>
      )}
    </div>
  );
};

interface SkeletonCommentCardListProps {
  count?: number;
}

const SkeletonCommentCardList = ({ count = 3 }: SkeletonCommentCardListProps) => {
  return (
    <div className="flex flex-col gap-6">
      {[...Array(count)].map((_, idx) => (
        <div key={idx} className="border rounded-lg shadow-md p-4 animate-pulse">
          {/* 상단 댓글 사용자명, 본문 및 날짜 부분 */}
          <div className="border-b pb-4 mb-4">
            <div className="h-4 w-1/6 bg-gray-200 rounded-md mb-2"></div> {/* 사용자명 스켈레톤 */}
            <div className="h-4 w-1/3 bg-gray-200 rounded-md mb-2"></div> {/* 댓글 내용 스켈레톤 */}
            <div className="h-4 w-1/12 bg-gray-200 rounded-md"></div> {/* 날짜 스켈레톤 */}
          </div>

          {/* 추천 답글이 있을 때 보여지는 스켈레톤 */}
          <div className="pt-4 pb-2">
            <div className="flex items-center text-slate-800 font-semibold mb-2">
              <div className="h-4 w-1/12 bg-gray-200 rounded-md flex items-center gap-2"></div>
            </div>
          </div>

          {/* 추천 답글 본문 및 복사 버튼 */}
          <div className="border rounded-md p-4 bg-slate-50 flex justify-between items-start">
            <div className="h-4 w-1/4 bg-gray-200 rounded-md"></div> {/* 추천 답글 텍스트 */}
            <div className="h-4 w-4 bg-gray-300 rounded-md"></div> {/* 복사 버튼 스켈레톤 */}
          </div>
        </div>
      ))}
    </div>
  );
};

export { CommentCard, SkeletonCommentCardList };
