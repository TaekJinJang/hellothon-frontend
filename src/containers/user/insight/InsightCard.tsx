import { RefreshCcw, Wand2 } from "lucide-react";

interface InsightCardProps {
  insight: CommentInsightType[] | undefined;
  summary: CommentSummaryType | undefined;
  name: string | undefined;
}

export const InsightCard = ({ insight, summary, name }: InsightCardProps) => (
  <div className="border rounded-lg shadow-md p-4 w-2/5">
    <div className="border-b pb-4 mb-4">
      <div className="flex justify-between items-center">
        <h3 className="text-slate-800">
          {name ? name : "사용자"}님의 콘텐츠에서 팔로워들은 이런 점을 더 알고 싶어요🤔
        </h3>
      </div>
      <div className="text-sm text-gray-400 flex flex-row mt-4 ">
        <RefreshCcw size={16} className="mr-2" />
        {summary && new Date(summary.timestamp).toISOString().slice(0, 10)}
      </div>
      {summary ? (
        <p className="font-medium h-60">{summary.text}</p>
      ) : (
        <div className="text-center text-xl text-slate-400 pt-4">인사이트가 없습니다.</div>
      )}
    </div>
    <div className="flex items-center text-slate-800 font-semibold pb-2">
      <Wand2 className="mr-2" width={16} /> 추천 개선 방향
    </div>
    {insight ? (
      insight.map((data) => (
        <div key={data.timestamp} className="border rounded-md p-4 bg-slate-50 flex justify-between items-start my-2">
          <p className="text-slate-700 font-medium">{data.text}</p>
        </div>
      ))
    ) : (
      <div className="text-center text-xl text-slate-400 p-4">추천 개선 방향이 없습니다.</div>
    )}
  </div>
);
