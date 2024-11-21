import CenteredContainer from "@/components/CenteredContainer";
import ErrorAlertWrapper from "@/components/ErrorAlertWrapper";
import Image from "next/image";
import LoginButton from "@/containers/oauth/LoginButton";
import logo from "@imgs/logo.png";

export default function OAuthContainer() {
  return (
    <CenteredContainer>
      <ErrorAlertWrapper />
      <div className="flex">
        <Image src={logo} alt="logo Image" objectFit="contain" width={280} height={120} />
      </div>
      <div className="text-slate-600 mt-4">인스타그램 댓글에 내 마음을 담다.</div>
      <div>
        <LoginButton />
      </div>
    </CenteredContainer>
  );
}
