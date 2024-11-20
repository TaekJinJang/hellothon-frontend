import { Calendar, Heart, MessageCircle } from "lucide-react";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";

import Image from "next/image";
import Link from "next/link";

interface MediaCardListProps {
  mediaList: MediaType[];
  width?: number;
  height?: number;
}

function MediaCardList({ mediaList, width = 180, height = 360 }: MediaCardListProps) {
  return (
    <div className="flex gap-4 pb-4 overflow-x-auto w-full">
      {mediaList.map((media, index) => (
        <Link href={`/user/posts/${media.id}/comments`} key={index} passHref>
          <Card
            key={index}
            className={`bg-white shadow-md rounded-md flex flex-col justify-between`}
            style={{ width: `${width}px`, height: `${height}px` }}
          >
            <CardHeader className="mb-4 flex justify-center items-center h-[130px] mt-4">
              <Image
                src={media.thumbnail_url}
                alt="Thumbnail"
                width={130} // 적절한 너비 설정
                height={130} // 적절한 높이 설정
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
                <span className="text-gray-500 text-xs flex items-center">
                  <Heart size={12} className="mr-1" /> {media.like_count}
                </span>
                <span className="text-gray-500 text-xs flex items-center">
                  <MessageCircle size={12} className="mr-1" /> {media.comments_count}
                </span>
              </div>
              <div className="text-gray-500 text-xs flex items-center">
                <Calendar size={12} className="mr-1" /> {new Date(media.timestamp).toLocaleDateString()}
              </div>
            </CardFooter>
          </Card>
        </Link>
      ))}
    </div>
  );
}

function SkeletonMediaCardList() {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-bold mb-4 bg-gray-200 w-1/5 h-6 rounded-md animate-pulse"></h3>
      <div className="flex gap-4 pb-4">
        {[...Array(6)].map((_, idx) => (
          <Card
            key={idx}
            className="bg-white shadow-md rounded-md w-[180px] h-[320px] flex flex-col justify-between animate-pulse"
          >
            <CardHeader className="flex justify-center items-center h-[130px] mb-4">
              <div className="w-[130px] h-[130px] bg-gray-200 rounded-md"></div>
            </CardHeader>
            <CardContent className="flex-grow min-h-[60px]">
              <div className="h-4 w-3/4 bg-gray-200 mb-2 rounded-md"></div>
              <div className="h-4 w-1/2 bg-gray-200 rounded-md"></div>
            </CardContent>
            <CardFooter className="flex flex-col items-start mt-4 space-y-2">
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
