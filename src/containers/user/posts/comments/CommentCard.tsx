import { AlertCircle, Edit3, RefreshCcw, Save, Send, Wand2 } from "lucide-react";
import { ERROR_MESSAGE, ERROR_REPLY_RELOAD, SUCCESS_REPLY_UPLOAD } from "@/utils/constants/alertMessages";
import { postInstagramReply, postRecommendReply, updateRecommendReply } from "@/services/apis/comment";
import { showErrorAlert, showSuccessAlert } from "@/components/AlertWrapper";
import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import ConfirmDialog from "@/components/ConfirmDialog";
import { Label } from "@/components/ui/label";
import Lottie from "react-lottie-player";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import loadingSpinner from "@imgs/lottiLoadingSpinner.json";
import { useQueryClient } from "@tanstack/react-query";

interface CommentCardProps {
  comment: CommentWithReplyType;
  type: "positive" | "negative";
  postId: string;
}
interface CommentCardState {
  dotCount: number;
  showOriginalText: boolean;
  isLoadingReplyReload: boolean;
  editingIndex: number | null;
  editedReply: ReplyType[];
}

const CommentCard = ({ comment, type, postId }: CommentCardProps) => {
  const [dotCount, setDotCount] = useState<CommentCardState["dotCount"]>(1);
  const [showOriginalText, setShowOriginalText] = useState<CommentCardState["showOriginalText"]>(false);
  const [editingIndex, setEditingIndex] = useState<CommentCardState["editingIndex"]>(null);
  const [editedReply, setEditedReply] = useState<CommentCardState["editedReply"]>([]);
  const [isLoadingReplyReload, setIsLoadingReplyReload] = useState<CommentCardState["isLoadingReplyReload"]>(false);
  const queryClient = useQueryClient();

  const handleEditClick = (index: number) => {
    setEditingIndex(index);
  };

  const handleSaveClick = async (replyObj: ReplyType) => {
    setEditingIndex(null);
    try {
      await updateRecommendReply(replyObj);
      queryClient.setQueryData<CommentWithReplyType[]>(["comments", postId, type], (oldData) => {
        if (!oldData) return [];
        return oldData.map((item) => (item.id === comment.id ? { ...item, recommendedReplies: editedReply } : item));
      });
    } catch (error) {
      showErrorAlert(ERROR_MESSAGE);
    }
  };

  const handlePostInstagramReply = async (commentId: string, replyObj: ReplyType) => {
    try {
      await postInstagramReply(commentId, replyObj);
      showSuccessAlert(SUCCESS_REPLY_UPLOAD);
    } catch (error) {
      showErrorAlert(ERROR_MESSAGE);
    }
  };

  const handleReplyReload = async () => {
    // 댓글 재생성 로직
    try {
      setIsLoadingReplyReload(true);
      const recommendedRepliesResponse = await postRecommendReply(comment, 3);
      queryClient.setQueryData(["comments", postId, type], (oldData: CommentWithReplyType[]) => {
        if (!oldData) return []; // 캐시에 데이터가 없는 경우 빈 배열 반환
        return oldData.map((item) => {
          if (item.id === comment.id) {
            return {
              ...item,
              recommendedReplies: recommendedRepliesResponse, // 예시로 빈 배열 설정, 실제로는 새로운 추천 답글 데이터로 업데이트해야 함
            };
          }
          return item;
        });
      });
    } catch (error) {
      showErrorAlert(ERROR_REPLY_RELOAD);
    } finally {
      setIsLoadingReplyReload(false);
    }
  };

  const loadingText = `인플루언서님의 마음을 담는 중 입니다${".".repeat(dotCount)}`;
  useEffect(() => {
    // 500ms마다 dotCount를 업데이트하여 점이 늘어나게 함
    const interval = setInterval(() => {
      setDotCount((prevCount) => (prevCount === 3 ? 1 : prevCount + 1));
    }, 500);

    return () => clearInterval(interval); // 컴포넌트가 언마운트될 때 인터벌 정리
  }, []);

  useEffect(() => {
    if (comment.recommendedReplies && editedReply.length === 0) {
      setEditedReply(comment.recommendedReplies);
    }
  }, [comment.recommendedReplies, editedReply]);

  return (
    <div className="border rounded-lg shadow-md p-4">
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

      {isLoadingReplyReload ? (
        <div>
          {" "}
          <div className="border rounded-md p-4 bg-slate-50 flex justify-between items-start my-2">
            <p className="text-slate-700 font-medium">{loadingText}</p>
          </div>{" "}
          <div className="border rounded-md p-4 bg-slate-50 flex justify-between items-start my-2">
            <p className="text-slate-700 font-medium">{loadingText}</p>
          </div>{" "}
          <div className="border rounded-md p-4 bg-slate-50 flex justify-between items-start my-2">
            <p className="text-slate-700 font-medium">{loadingText}</p>
          </div>
        </div>
      ) : comment.recommendedReplies && comment.recommendedReplies.length > 0 ? (
        comment.recommendedReplies.map((replyObj, index) => {
          const replyText = editedReply[index]?.reply;
          const isOverLimit = replyText?.length > 2200;

          return (
            <div key={index} className="my-2">
              {editingIndex === index ? (
                <div
                  className={`${isOverLimit ? "border-red-500 border" : "border"} bg-white rounded-md p-4 flex justify-between items-start`}
                >
                  <Textarea
                    value={replyText}
                    onChange={(e) =>
                      setEditedReply((prev) => prev.map((r, i) => (i === index ? { ...r, reply: e.target.value } : r)))
                    }
                    className={"w-full mr-4 text-slate-700 font-medium border-none overflow-hidden resize-none"}
                  />

                  <button
                    className={`flex items-center justify-center ${isOverLimit ? "text-slate-100" : "text-slate-500 hover:text-slate-700 transition"} w-6 h-6 border rounded-md bg-white `}
                    onClick={() => handleSaveClick({ id: replyObj.id, reply: replyText })}
                    disabled={isOverLimit}
                  >
                    <Save size={16} />
                  </button>
                </div>
              ) : (
                <div className="border rounded-md p-4 bg-slate-50 flex justify-between items-start">
                  <p className="text-slate-700 font-medium">{replyObj.reply}</p>
                  <div className="flex items-center space-x-2">
                    <button
                      className="flex items-center justify-center text-slate-500 hover:text-slate-700 transition w-6 h-6 border rounded-md bg-white "
                      onClick={() => handleEditClick(index)}
                    >
                      <Edit3 size={16} />
                    </button>
                    <ConfirmDialog
                      title="업로드하시겠습니까?"
                      description="인스타그램에 답글이 자동으로 업로드됩니다. 이 작업은 취소할 수 없습니다."
                      onConfirm={() => handlePostInstagramReply(comment.id, replyObj)}
                    >
                      <button className="flex items-center justify-center text-slate-500 hover:text-slate-700 transition w-6 h-6 border rounded-md bg-white ">
                        <Send size={16} />
                      </button>
                    </ConfirmDialog>
                  </div>
                </div>
              )}
              {editingIndex === index && isOverLimit && (
                <div className="text-red-500">2200자를 초과할 수 없습니다.</div>
              )}
            </div>
          );
        })
      ) : comment.recommendedReplies === undefined ? (
        // 생성중일 때
        <div className="border rounded-md p-4 bg-slate-50 flex justify-between items-start my-2">
          <p className="text-slate-700 font-medium">{loadingText}</p>
        </div>
      ) : (
        // 실패했을 때
        <div className="my-2">
          {" "}
          <div className="border border-slate-300 rounded-md p-4 bg-slate-50 h-52 flex justify-center">
            <p className="text-slate-400 font-medium flex justify-center items-center flex-col  ">
              <AlertCircle size={17} />
              추천 답글 생성에 실패했습니다. 아래 버튼을 눌러 새로고침 해주세요.
            </p>
          </div>
        </div>
      )}
      {comment.recommendedReplies !== undefined && (
        <Button
          onClick={handleReplyReload}
          className={`${isLoadingReplyReload ? "bg-slate-400" : "bg-slate-900 hover:bg-slate-700"} w-full`}
          disabled={isLoadingReplyReload}
        >
          {isLoadingReplyReload ? (
            <Lottie className="w-6 h-6" loop animationData={loadingSpinner} play />
          ) : (
            <RefreshCcw />
          )}
          추천 답글 재생성하기
        </Button>
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
