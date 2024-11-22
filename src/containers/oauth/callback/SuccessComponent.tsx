import { Button } from "@/components/ui/button";
import { SUCCESS_MESSAGE } from "@/utils/constants/messages";
import { useRouter } from "next/navigation";

export default function SuccessComponent() {
  const router = useRouter();

  return (
    <>
      <div className="text-slate-800 my-8">{SUCCESS_MESSAGE}</div>
      <Button
        onClick={() => router.push("/user/posts")}
        size="lg"
        className="w-[330px] text-white bg-slate-900 rounded-md hover:bg-slate-900"
      >
        인센스 시작하기
      </Button>
    </>
  );
}
