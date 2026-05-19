<!-- 생성일시: 2026-05-19 -->

# ADR-0002: AI API로 Claude (Anthropic) 선택

- **상태:** 결정됨
- **날짜:** 2026-05-19

## 맥락

음식 이미지를 인식하고 칼로리/영양소를 분석하는 Vision AI가 필요하다. 선택지는 Claude, GPT-4 Vision, Google Gemini Vision 세 가지였다.

## 결정

**Anthropic Claude API (claude-opus-4-7)** 를 선택한다.

## 이유

- **한국어 음식 인식 품질:** 비빔밥, 된장찌개, 삼겹살 등 한식 인식에서 Claude가 가장 자연스러운 한국어 응답을 반환
- **JSON 응답 안정성:** `tool_use` 또는 프롬프트 지시만으로도 구조화된 JSON 응답이 일관적으로 나옴
- **공식 JS SDK:** `@anthropic-ai/sdk` 패키지가 React Native에서 바로 사용 가능
- **프롬프트 유연성:** 시스템 프롬프트로 응답 형식을 정밀하게 제어 가능

## 트레이드오프

- GPT-4 Vision과 비교해 API 비용이 약간 높을 수 있음 → 이미지 압축으로 토큰 절감
- Gemini는 무료 티어가 있으나 한국어 음식 데이터 품질이 상대적으로 낮음

## 비용 관리 전략

- 이미지 전송 전 500KB 이하로 압축 (expo-image-manipulator 활용)
- 개발 중에는 실제 API 호출 최소화, 더미 응답으로 UI 개발
