<!-- 생성일시: 2026-05-19 -->

# 개발 환경 설정 (zero → run)

> 이 문서대로 따라하면 5분 안에 앱이 실행됩니다.

## 사전 요구사항

| 도구 | 버전 | 설치 확인 |
|---|---|---|
| Node.js | 18 이상 | `node -v` |
| npm | 9 이상 | `npm -v` |
| Expo Go 앱 | 최신 | iOS App Store / Android Play Store |

## 1단계 — 저장소 클론

```bash
git clone https://github.com/{username}/nutrisnap.git
cd nutrisnap
```

## 2단계 — 패키지 설치

```bash
npm install
```

## 3단계 — 환경변수 설정

프로젝트 루트에 `.env` 파일 생성:

```
EXPO_PUBLIC_ANTHROPIC_API_KEY=sk-ant-xxxxxxxxxx
```

> API 키는 [Anthropic Console](https://console.anthropic.com)에서 발급.
> `.env` 파일은 `.gitignore`에 포함되어 있으므로 커밋하지 마세요.

## 4단계 — 앱 실행

```bash
npx expo start
```

터미널에 QR 코드가 표시됩니다.

- **실기기 테스트:** Expo Go 앱에서 QR 코드 스캔
- **웹 브라우저:** `w` 키 입력 (일부 기능 제한)
- **Android 에뮬레이터:** `a` 키 입력 (Android Studio 필요)

## 문제 해결

| 증상 | 해결 방법 |
|---|---|
| `Metro bundler` 오류 | `npx expo start --clear` |
| API 키 인식 안 됨 | `.env` 파일 위치 확인 (루트 디렉토리) |
| Expo Go 연결 안 됨 | 폰과 PC가 같은 Wi-Fi에 있는지 확인 |
