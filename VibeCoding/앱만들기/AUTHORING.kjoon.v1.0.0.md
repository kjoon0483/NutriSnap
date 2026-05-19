<!-- 생성일시: 2026-05-19 -->

# AUTHORING.kjoon.v1.0.0 — 본인만의 부트스트랩

> 이 파일은 새 프로젝트를 시작할 때 Claude Code에게 전달하는 나만의 부트스트랩 기법을 정의한다.

## 철학

"문서가 먼저, 코드는 나중." — 기획과 설계가 충분히 정리된 후에 코딩을 시작한다.

## 단계별 워크플로우

### Phase 1 — 기획 (Day 1)

```
프롬프트:
나는 [프로젝트 한 줄 설명]을 만들고 싶다.
다음을 순서대로 수행해줘:

1) .planning/00-vision.md — 비전, 문제, 목표 사용자, 성공 기준
2) .planning/01-requirements.md — 사용자 시나리오 3개 + MoSCoW 분류
3) 모호한 부분은 선택형 질문으로 먼저 물어봐

플랫폼은 모바일(React Native/Flutter 중 추천 + 이유)로 제안해.
```

### Phase 2 — 계획 (Day 1~2)

```
프롬프트:
.planning/00-vision.md와 .planning/01-requirements.md를 읽고:

1) .planning/02-wbs.md — WBS (3단계 깊이)
2) .planning/04-schedule.md — 6주 일정 (주차별 목표/산출물/검증/위험)
```

### Phase 3 — 설계 (Day 2~3)

```
프롬프트:
요구사항 기반으로:

1) .planning/03-architecture.md — Mermaid 다이어그램 + 레이어 구조
2) docs/architecture.md — 사람이 읽는 버전
3) .planning/decisions/ADR-000*.md — 핵심 의사결정 3개 이상
```

### Phase 4 — 운영 문서 (Day 3)

```
프롬프트:
기술 스택 기준으로:

1) docs/setup.md — zero → run (5분 안에 실행 가능하게)
2) docs/deploy.md — 빌드/배포 전 단계
3) docs/testing.md — 테스트 시나리오 + 실행 명령
```

### Phase 5 — 에이전트 설정 (Day 3)

```
프롬프트:
이 프로젝트의 AGENTS.md를 생성해줘.
코딩 규칙, 디렉토리 규칙, 금지 사항을 포함해.
```

### Phase 6 — README + BONUS (Day 4)

```
프롬프트:
.planning/과 docs/를 기반으로 README.md를 작성해줘.
가산점 신청을 위한 BONUS.md도 함께 작성해줘.
```

## 나만의 규칙

- 모든 파일 상단에 `// 생성일시: YYYY-MM-DD` 주석 필수
- ADR은 최소 3개 (플랫폼 / AI / 데이터 저장소)
- 문서는 AI가 만들어도 내가 읽고 이해해야 발표에서 답변 가능
- 코드 작성 전 WBS의 각 항목을 태스크로 분해해서 진행

## 버전 히스토리

| 버전 | 날짜 | 변경 내용 |
|---|---|---|
| v1.0.0 | 2026-05-19 | 최초 작성 — NutriSnap 프로젝트에서 정립 |
