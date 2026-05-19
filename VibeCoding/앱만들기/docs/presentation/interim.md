<!-- 생성일시: 2026-05-19 -->
---
marp: true
theme: default
paginate: true
size: 16:9
header: "NutriSnap — 중간 발표"
footer: "AI 식단·칼로리 트래커 | kjoon0483"
---

# NutriSnap
## AI 식단·칼로리 트래커

사진 한 장으로 음식을 인식하고
칼로리와 영양소를 자동 계산하는 모바일 앱

---

## 문제 정의

- 식단 기록은 귀찮고 시간이 많이 걸린다
- 칼로리를 일일이 검색해야 해서 꾸준히 하기 어렵다
- 영양 불균형 여부를 직관적으로 파악하기 힘들다

> **핵심 가설:** 사진 찍기만 하면 자동으로 기록된다면, 식단 관리를 꾸준히 할 수 있다.

---

## 솔루션

```
음식 사진 촬영
    ↓
Claude Vision AI 자동 인식
    ↓
칼로리 · 영양소 결과 표시
    ↓
수정 후 저장 → 하루 식단 누적
    ↓
주간 리포트 차트
```

---

## 기술 스택 선택 (ADR 기반)

| 선택 | 이유 |
|---|---|
| **React Native + Expo** | JS 기반 — 기존 언어 재활용, Expo Go로 즉시 테스트 |
| **Claude API (Vision)** | 한국 음식 인식 품질 우수, 공식 JS SDK 사용 가능 |
| **AsyncStorage** | 서버 없이 기기 내 저장 — 6주 일정에 적합 |

> 모든 결정은 `.planning/decisions/ADR-000*.md` 에 근거 기록

---

## 프로젝트 구조

```
nutrisnap/
├── app/              # 화면 (Expo Router)
├── src/
│   ├── api/          # Claude Vision API 호출
│   ├── storage/      # AsyncStorage (식단 저장)
│   ├── utils/        # 칼로리 계산
│   └── types/        # TypeScript 타입
├── docs/             # 운영 문서
└── .planning/        # 기획 문서 + ADR
```

> Presentation → Application → Data 레이어 구조 적용

---

## 진행 현황

| 항목 | 완료 |
|---|---|
| 비전 / 요구사항 / WBS / 일정 문서 | ✅ |
| 아키텍처 문서 + ADR 3개 | ✅ |
| setup / deploy / testing 문서 | ✅ |
| AGENTS.md / README / AUTHORING | ✅ |
| Expo 프로젝트 초기화 + 패키지 설치 | ✅ |
| Claude API 연동 모듈 (`src/api/`) | ✅ |
| 화면 개발 (홈 / 추가 / 리포트) | 🔄 진행 중 |

---

## 데모

> (실기기 또는 시뮬레이터 화면 시연)

- 음식 사진 업로드 → Claude Vision 인식 결과 표시
- 하루 식단 목록 + 칼로리 합계

---

## 다음 단계 (13~14주차)

1. 탄·단·지 차트 시각화 (Victory Native)
2. 주간 리포트 화면
3. 에러 처리 / 로딩 UI 개선
4. 최종 발표 자료 준비

---

## Q&A 대비 — 개발자 기본 소양

| 예상 질문 | 답변 위치 |
|---|---|
| 왜 React Native + Expo? | ADR-0001 |
| 왜 Claude API? | ADR-0002 |
| 데이터는 어디에 저장? | ADR-0003 |
| 환경 설정은? | docs/setup.md |
| 배포는 어떻게? | docs/deploy.md |
| 테스트는? | docs/testing.md |
