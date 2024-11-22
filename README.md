# insense
이 프로젝트는 Instagram 댓글 관리 기능을 제공하는 웹 애플리케이션입니다. 사용자는 Instagram의 댓글을 관리하고, 추천 답글을 받을 수 있습니다.

## 기능 소개
- 댓글 관리: 최신순 또는 오래된 순으로 댓글을 정렬하여 확인합니다.
- 추천 답글: 댓글에 대한 추천 답글을 제공합니다.

### 기술 스택
Next.js 14, TypeScript, Zustand, React Query, Tailwind CSS, shadcn-ui

## 중요 사항
### Instagram OAuth 정책 관련
Instagram OAuth 정책에 따라 로컬 개발 환경에서도 HTTPS를 사용해야 합니다. 따라서 프로젝트를 실행할 때 **localhost에서 SSL 인증서(pem 파일)** 를 이용해 HTTPS를 유지해야 합니다. 이를 위해 자체 서명된 인증서를 생성하고, 로컬 개발 환경에 적용해야 합니다.

## (인증서 있을 시)실행
```
yarn
yarn secure
```



브라우저에서 https://xaekxtkwpxqaaqyh.tunnel-pt.elice.io으로 접속하면 프로젝트를 확인할 수 있습니다.
