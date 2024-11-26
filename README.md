# **Insense: 센스를 더한 인스타그램 자동 답변 서비스**

![main](https://github.com/user-attachments/assets/9017d620-615d-4a72-97d4-97a13260381a)

- 개발 기간: 2024.11.11 ~ 2024.11.24  
- 해커톤 본선: 2024.11.23 ~ 2024.11.24

## **프로젝트 개요**
**Insense**는 “인스타그램 자동 답변에 센스를 더하다”라는 아이디어를 바탕으로 개발된 서비스입니다. 이 서비스는 인플루언서의 개성과 소통 스타일을 학습하여, 댓글 및 답글 관리를 효율적으로 지원합니다. 또한, 수집된 댓글 데이터를 분석해 인사이트를 제공함으로써 소셜 미디어 전략 수립에 도움을 줍니다. Insense는 AI를 활용해 사용자의 브랜드 이미지를 유지하면서도 시간과 노력을 절약할 수 있는 해결책을 제공합니다.

**Insense**는 인플루언서가 댓글 관리를 통해 겪는 시간적, 감정적 부담을 줄이는 데 초점을 맞추었으며, AI 기반의 유연한 소통 도구를 제공합니다. 더불어, 댓글 데이터를 기반으로 한 인사이트 제공을 통해 소셜 미디어 운영의 효율성을 극대화할 수 있습니다.

## **주요 기능**

### 1. 추천 답글 생성
- AI가 사용자의 말투와 표현 방식을 학습하여, 각 댓글에 적합한 답글을 자동으로 생성합니다.
- 사용자는 생성된 답글을 수정 후 클릭 한 번으로 인스타그램에 업로드할 수 있습니다.
- 이 기능은 답글 작성에 소요되는 시간과 감정적 스트레스를 줄이고, 일관성 있는 소통을 지원합니다.

### 2. 부정 댓글 필터링
- AI가 악성 댓글을 자동으로 분류 및 필터링하여 관리 과정을 단순화합니다.
- “원문 보기” 기능을 통해 필터링 여부를 사용자에게 위임합니다.
- 이를 통해 부정적인 댓글로 인한 감정적 피해를 방지하고 긍정적인 소통 환경을 조성합니다.

### 3. 댓글 인사이트 제공
- 사용자의 계정에 달린 댓글 데이터를 분석하여 의미 있는 인사이트를 제공합니다.
- 주요 키워드, 감정 분석, 댓글 작성 패턴 등을 시각화하여 소셜 미디어 전략 수립에 활용할 수 있습니다.
- 이를 통해 사용자는 타겟 고객과의 소통을 더욱 효과적으로 계획할 수 있습니다.

## **페이지 구성 및 시연 영상**

|                                                          로그인                                                           |                                                           메인                                                           |
| :---------------------------------------------------------------------------------------------------------------------: | :----------------------------------------------------------------------------------------------------------------------: |
| <img  alt="login" src="https://github.com/user-attachments/assets/5311eae1-60de-42ff-857e-6e5fb8f819c5"> | <img alt="main" src="https://github.com/user-attachments/assets/5bda3797-bd92-4660-82e7-4b10ab2292a2"> |

|                                                          긍정댓글                                                           |                                                           부정댓글                                                           |
| :---------------------------------------------------------------------------------------------------------------------: | :----------------------------------------------------------------------------------------------------------------------: |
|  <img  alt="positive" src="https://github.com/user-attachments/assets/be73ecd3-09e7-4dd9-bd80-3ec12cc478a0"> |  <img  alt="negative" src="https://github.com/user-attachments/assets/2d50f0ad-9841-486a-947f-4b5ea1dc96cc"> |

|   인사이트     |   
| :-------------------------: | 
| <img  alt="insight" src="https://github.com/user-attachments/assets/c8d30c16-2b73-4526-8fd8-62b6c401c8ae"> |


### **🎥 시연 영상**

|   화면 구성     |   
| :-------------------------: | 
|![demo](https://github.com/user-attachments/assets/33d38799-9b8b-4b47-bcfd-08643360ca91) |


## 💡 기술 스택

<img src="https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=Javascript&logoColor=white"> <img src="https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=TypeScript&logoColor=white">
<img src="https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=React&logoColor=white"> <img src="https://img.shields.io/badge/Next14-000000?style=for-the-badge&logo=Next.js&logoColor=white"> 

<img src="https://img.shields.io/badge/React%20query-FF4154?style=for-the-badge&logo=React Query&logoColor=white"> <img src="https://img.shields.io/badge/Zustand-000000?style=for-the-badge&logo=Zustand&logoColor=white"> <img src="https://img.shields.io/badge/Tailwind%20CSS-06B6D4?style=for-the-badge&logo=Tailwind CSS&logoColor=white"> <img src="https://img.shields.io/badge/shadcn%20ui-000000?style=for-the-badge&logo=shadcn/ui&logoColor=white">

### **기술 스택 선택 이유**

#### 1. React Query와 Zustand의 조합
- **React Query**: 서버 상태를 관리하고 데이터 패칭 로직을 단순화하기 위해 선택했습니다.
  - 예: 댓글 데이터를 서버에서 패칭하고 캐싱하여 클라이언트 요청 속도를 향상시킴.
- **Zustand**: 클라이언트 상태(모달 열림 여부, 사용자 인터랙션 등)를 가볍고 명확히 관리하기 위해 사용했습니다.
  - 예: "답글 생성 모달"의 열림 여부와 같은 UI 상태 관리.

**➡️ 이유**: 서버와 클라이언트 상태를 명확히 분리하여 관리 로직의 가독성과 유지보수성을 향상시키기 위함.

#### 2. Tailwind CSS와 shadcn/ui
- **Tailwind CSS**: 빠른 UI 개발과 일관된 디자인 시스템 구현을 위해 선택했습니다.
- **shadcn/ui**: Tailwind 기반의 UI 컴포넌트 라이브러리를 활용하여 UI 개발 속도를 향상시켰습니다.
  - 예: 버튼, 모달, 입력 폼 등 반복적으로 사용되는 컴포넌트를 효율적으로 개발.
 
## **프로젝트 구조**
```
📦src
 ┣ 📂app                # Next.js 14 앱 라우터의 페이지 엔트리 포인트 디렉토리
 ┣ 📂components          # 재사용 가능한 작은 UI 컴포넌트 모음
 ┃ ┣ 📂ui               # 버튼, 인풋 등 기본 UI 요소를 구성하는 컴포넌트 (shadcn-ui)
 ┣ 📂containers          # 페이지 또는 섹션 단위의 주요 컨테이너 컴포넌트
 ┣ 📂hooks               # UI 및 클라이언트 로직 관련 커스텀 훅
 ┣ 📂layouts             # 페이지 공통 레이아웃 컴포넌트
 ┣ 📂lib                 # 외부 라이브러리 관련 코드 및 헬퍼 함수
 ┣ 📂providers           # 글로벌 상태 관리 Provider
 ┣ 📂services            # API 호출 및 비즈니스 로직 처리
 ┃ ┣ 📂apis             # Axios 등으로 구성된 API 호출 함수
 ┃ ┗ 📂hooks            # React Query 등 데이터 패칭 로직을 위한 커스텀 훅
 ┣ 📂store               # Zustand 클라이언트 상태 관리 디렉토리
 ┣ 📂types               # TypeScript 타입 정의 파일
 ┗ 📂utils               # 유틸리티 함수 모음
 ┃ ┣ 📂constants        # 프로젝트에서 사용하는 상수 정의 파일
```


