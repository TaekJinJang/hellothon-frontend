import { Calendar, Heart, MessageCircle } from "lucide-react";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";

import Image from "next/image";
import Link from "next/link";

interface MediaCardListProps {
  mediaList: MediaType[];
  width?: number;
  height?: number;
}

function MediaCardList({ mediaList, width = 240, height = 380 }: MediaCardListProps) {
  return (
    <div className="flex gap-6 pb-4 overflow-x-auto w-full">
      {mediaList.map((media, index) => (
        <Link href={`/user/posts/${media.id}/comments`} key={index} passHref>
          <Card
            key={index}
            className={`bg-white shadow-md rounded-md flex flex-col justify-between`}
            style={{ width: `${width}px`, height: `${height}px` }}
          >
            <CardHeader className="mb-4 flex justify-center items-center p-2">
              <Image
                src={media.thumbnail_url}
                alt="Thumbnail"
                width={200}
                height={130}
                className="object-cover rounded-md"
              />
            </CardHeader>
            <CardContent className="flex-grow min-h-[60px]">
              <p className="text-sm text-gray-600">
                {media.caption.length > 50 ? `${media.caption.slice(0, 50)}...` : media.caption}
              </p>
            </CardContent>
            <CardFooter className="flex flex-col items-start mt-4 space-y-2">
              <div className="flex items-center space-x-2">
                <span className="text-slate-600 text-xs flex items-center">
                  <Heart size={12} className="mr-1" /> {media.like_count}
                </span>
                <span className="text-slate-600 text-xs flex items-center">
                  <MessageCircle size={12} className="mr-1" /> {media.comments_count}
                </span>
              </div>
              <div className="text-slate-400 text-xs flex items-center">
                <Calendar size={12} className="mr-1" /> {new Date(media.timestamp).toISOString().slice(0, 10)}
              </div>
            </CardFooter>
          </Card>
        </Link>
      ))}
    </div>
  );
}

type SkeletonMediaCardListProps = {
  count?: number;
  width?: number;
  height?: number;
};

function SkeletonMediaCardList({ count = 6, width = 240, height = 380 }: SkeletonMediaCardListProps) {
  return (
    <div className="space-y-4">
      {/* 스켈레톤 카드 리스트 */}
      <div className="flex gap-6 pb-4 overflow-x-auto w-full">
        {[...Array(count)].map((_, idx) => (
          <Card
            key={idx}
            className={`bg-white shadow-md rounded-md flex flex-col justify-between animate-pulse`}
            style={{ width: `${width}px`, height: `${height}px` }}
          >
            {/* 카드 헤더 부분 */}
            <CardHeader className="flex justify-center items-center p-2 mb-4">
              <div className="w-full h-[130px] bg-gray-200 rounded-md"></div>
            </CardHeader>

            {/* 카드 본문 부분 */}
            <CardContent className="flex-grow min-h-[60px] px-2">
              <div className="h-4 w-3/4 bg-gray-200 mb-2 rounded-md"></div>
              <div className="h-4 w-1/2 bg-gray-200 rounded-md"></div>
            </CardContent>

            {/* 카드 푸터 부분 */}
            <CardFooter className="flex flex-col items-start mt-4 space-y-2 px-2">
              <div className="flex items-center space-x-2">
                <div className="w-10 h-4 bg-gray-200 rounded-md"></div>
                <div className="w-10 h-4 bg-gray-200 rounded-md"></div>
              </div>
              <div className="w-20 h-4 bg-gray-200 rounded-md"></div>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
export { MediaCardList, SkeletonMediaCardList };
