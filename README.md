<!-- 생성일시: 2026-05-19 -->

# NutriSnap — AI 식단·칼로리 트래커

사진 한 장으로 음식을 인식하고 칼로리와 영양소를 자동 계산하는 AI 모바일 앱.

## 주요 기능

- 음식 사진 촬영/업로드 → Claude Vision AI가 음식 자동 인식
- 칼로리 및 탄·단·지 자동 계산
- 하루 식단 기록 (아침/점심/저녁/간식)
- 목표 칼로리 대비 진행률 시각화
- 주간 식단 리포트 차트

## 빠른 시작

```bash
# 패키지 설치
npm install

# .env 파일에 API 키 설정
echo "EXPO_PUBLIC_ANTHROPIC_API_KEY=sk-ant-xxxx" > .env

# 실행
npx expo start
```

자세한 설정은 [docs/setup.md](docs/setup.md) 참조.

## 기술 스택

- **React Native + Expo** — 모바일 앱 프레임워크
- **TypeScript** — 타입 안전성
- **Claude API (claude-opus-4-7)** — 음식 Vision 인식
- **AsyncStorage** — 로컬 데이터 저장
- **Victory Native** — 차트 시각화

## 문서

| 문서 | 내용 |
|---|---|
| [docs/architecture.md](docs/architecture.md) | 시스템 구조 및 기술 선택 |
| [docs/setup.md](docs/setup.md) | 개발 환경 설정 |
| [docs/deploy.md](docs/deploy.md) | 빌드 및 배포 |
| [docs/testing.md](docs/testing.md) | 테스트 방법 |
| [.planning/](. planning/) | 기획 문서 (비전, WBS, 일정) |

## 프로젝트 구조

```
nutrisnap/
├── app/            # 화면 (Expo Router)
├── src/
│   ├── api/        # Claude API 호출
│   ├── storage/    # AsyncStorage 관리
│   ├── utils/      # 칼로리 계산 유틸
│   └── types/      # TypeScript 타입
├── docs/           # 운영 문서
└── .planning/      # 기획 문서
```
