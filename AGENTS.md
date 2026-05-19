<!-- 생성일시: 2026-05-19 -->

# AGENTS.md — 에이전트 운영 헌법

> Claude Code 등 AI Agent가 이 프로젝트에서 작업할 때 항상 참조하는 문서.

## 프로젝트 개요

**NutriSnap** — AI 식단·칼로리 트래커
- 플랫폼: React Native + Expo
- AI: Claude API (Vision)
- 저장소: AsyncStorage (서버리스)

## 코딩 규칙

- 언어: TypeScript (any 타입 금지)
- 파일 상단에 생성일시 주석 필수: `// 생성일시: YYYY-MM-DD`
- 컴포넌트는 함수형으로 작성 (클래스 컴포넌트 사용 금지)
- API 키는 절대 코드에 하드코딩 금지 → `.env` 파일 사용
- 에러 처리 필수: API 호출 시 try/catch 항상 포함

## 디렉토리 규칙

- 화면 컴포넌트: `app/` (Expo Router)
- 비즈니스 로직: `src/api/`, `src/storage/`, `src/utils/`
- 타입 정의: `src/types/index.ts`

## 문서 규칙

- 의사결정 기록: `.planning/decisions/ADR-NNNN-*.md`
- 새 기술 도입 시 ADR 반드시 작성
- 문서 변경 시 관련 ADR도 함께 업데이트

## 금지 사항

- 백엔드 서버 코드 생성 금지 (클라이언트 전용)
- 소셜 기능, 결제 기능 추가 금지 (요구사항 Won't 항목)
- `.env` 파일 커밋 금지
