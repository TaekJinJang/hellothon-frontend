import Image from "next/image";
import { LOADING_MESSAGE } from "@/utils/constants/messages";
import loadingSpinner from "@imgs/loadingSpinner.gif";

export default function LoadingComponent() {
  return (
    <>
      <Image src={loadingSpinner} alt="loadingSpinner" width={300} height={300} unoptimized={true} />
      <div className="text-slate-800 text-center whitespace-pre-line">{LOADING_MESSAGE}</div>
    </>
  );
}
