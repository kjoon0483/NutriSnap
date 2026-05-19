<!-- 생성일시: 2026-05-19 -->

# 빌드 및 배포

## 개발 중 실행 (로컬)

```bash
npx expo start
```

Expo Go 앱으로 QR 코드를 스캔해 실기기에서 바로 확인.

## 발표용 데모 빌드

발표 데모는 Expo Go + 실기기를 사용. 별도 빌드 불필요.

### 발표 전 체크리스트

- [ ] `.env`에 유효한 API 키 설정 확인
- [ ] 인터넷 연결 확인 (Claude API 호출 필요)
- [ ] 앱 캐시 초기화: `npx expo start --clear`
- [ ] 데모용 더미 식단 데이터 미리 입력해두기

## 독립 실행 파일 빌드 (선택)

> 발표 평가에는 필요 없으나, 포트폴리오용으로 원하는 경우.

```bash
# EAS CLI 설치
npm install -g eas-cli

# Expo 계정 로그인
eas login

# 빌드 (Android APK)
eas build --platform android --profile preview
```

빌드 완료 후 Expo 대시보드에서 APK 다운로드 링크 확인.
