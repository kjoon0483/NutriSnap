<!-- 생성일시: 2026-05-19 -->

# ADR-0001: 플랫폼으로 React Native + Expo 선택

- **상태:** 결정됨
- **날짜:** 2026-05-19

## 맥락

모바일 앱을 만들어야 하며, 선택지는 Flutter, React Native(Expo), 네이티브(Swift/Kotlin) 세 가지였다.

## 결정

**React Native + Expo** 를 선택한다.

## 이유

| 기준 | Flutter | React Native + Expo | 네이티브 |
|---|---|---|---|
| 학습 곡선 | Dart 신규 학습 필요 | JS/TS 재활용 가능 | 각 플랫폼 별도 학습 |
| 초기 셋업 | 중간 | 매우 빠름 (Expo Go) | 느림 |
| Claude API 연동 | 가능 (http 패키지) | 공식 JS SDK 사용 | 각각 구현 필요 |
| 테스트 편의성 | 에뮬레이터 필요 | Expo Go 앱으로 즉시 | 에뮬레이터 필요 |

- Expo의 `expo-image-picker`로 카메라/갤러리 접근이 코드 5줄로 가능
- `@anthropic-ai/sdk` 공식 JS SDK를 그대로 사용 가능
- `npx expo start` 한 줄로 실행, Expo Go 앱으로 실기기 테스트 가능

## 트레이드오프

- Expo 관리형 워크플로우는 일부 네이티브 기능 제한 → 이 프로젝트에서는 해당 없음
- Flutter 대비 성능이 약간 낮을 수 있음 → 식단 앱 수준에서는 무관
