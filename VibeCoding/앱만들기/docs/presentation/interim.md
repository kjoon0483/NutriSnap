<!-- 생성일시: 2026-05-19 -->
---
marp: true
theme: default
paginate: true
size: 16:9
header: "NutriSnap — 중간 발표"
footer: "AI 식단·칼로리 트래커 | kjoon0483"
---

<!-- _class: lead -->

<style scoped>
section {
  background: linear-gradient(135deg, #16a34a, #15803d);
  color: white;
  text-align: center;
}
h1 { font-size: 3.2em; font-weight: 900; letter-spacing: -2px; margin-bottom: 0.1em; }
h2 { font-size: 1.3em; font-weight: 400; opacity: 0.85; }
p  { margin-top: 1em; opacity: 0.75; font-size: 0.9em; }
</style>

# NutriSnap
## AI 식단·칼로리 트래커

사진 한 장으로 음식을 인식하고 칼로리와 영양소를 자동 계산하는 모바일 앱

---

<style scoped>
.problem-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
  margin-top: 24px;
}
.problem-card {
  background: #f8fafc;
  border: 2px solid #e2e8f0;
  border-radius: 16px;
  padding: 24px 20px;
  text-align: center;
}
.problem-card .num {
  font-size: 2em;
  font-weight: 900;
  color: #16a34a;
  display: block;
  margin-bottom: 8px;
}
.problem-card h3 { font-size: 1em; font-weight: 700; margin-bottom: 8px; }
.problem-card p  { font-size: 0.82em; color: #64748b; line-height: 1.5; }
.hypothesis {
  margin-top: 20px;
  background: #dcfce7;
  border-left: 4px solid #16a34a;
  padding: 12px 20px;
  border-radius: 8px;
  font-size: 0.88em;
  color: #166534;
  text-align: left;
}
</style>

## 문제 정의

<div class="problem-grid">
  <div class="problem-card">
    <span class="num">01</span>
    <h3>기록이 귀찮다</h3>
    <p>음식명과 양을 매번 직접 입력해야 해서 지속하기 어렵다</p>
  </div>
  <div class="problem-card">
    <span class="num">02</span>
    <h3>검색이 번거롭다</h3>
    <p>칼로리를 일일이 검색해야 해서 꾸준한 관리가 힘들다</p>
  </div>
  <div class="problem-card">
    <span class="num">03</span>
    <h3>균형 파악이 어렵다</h3>
    <p>영양 불균형 여부를 직관적으로 확인할 방법이 없다</p>
  </div>
</div>

<div class="hypothesis">
  💡 핵심 가설 — 사진 찍기만 하면 자동으로 기록된다면, 식단 관리를 꾸준히 할 수 있다
</div>

---

<style scoped>
.flow {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  margin-top: 28px;
  flex-wrap: wrap;
}
.step {
  background: #f1f5f9;
  border: 2px solid #e2e8f0;
  border-radius: 12px;
  padding: 14px 18px;
  text-align: center;
  min-width: 120px;
}
.step .emoji { font-size: 1.6em; display: block; margin-bottom: 4px; }
.step span   { font-size: 0.78em; font-weight: 600; color: #334155; }
.arrow { font-size: 1.4em; color: #94a3b8; }
</style>

## 솔루션

<div class="flow">
  <div class="step"><span class="emoji">📷</span><span>음식 촬영</span></div>
  <span class="arrow">→</span>
  <div class="step"><span class="emoji">🤖</span><span>AI 자동 인식</span></div>
  <span class="arrow">→</span>
  <div class="step"><span class="emoji">🔢</span><span>칼로리 계산</span></div>
  <span class="arrow">→</span>
  <div class="step"><span class="emoji">✏️</span><span>수정 & 저장</span></div>
  <span class="arrow">→</span>
  <div class="step"><span class="emoji">📊</span><span>주간 리포트</span></div>
</div>

---

## 아키텍처

```mermaid
graph LR
    User([👤 사용자])

    subgraph App ["📱 앱 (React Native + Expo)"]
        UI["Presentation\napp/ 화면"]
        API["api/claude.ts"]
        Store["storage/mealStorage.ts"]
        Util["utils/nutrition.ts"]
    end

    Claude[(☁️ Claude API)]
    DB[(📦 AsyncStorage)]

    User --> UI
    UI --> API --> Claude
    Claude --> API --> UI
    UI --> Store <--> DB
    UI --> Util
```

---

<style scoped>
.adr-grid { display: grid; grid-template-columns: repeat(3,1fr); gap: 16px; margin-top: 20px; }
.adr-card { border-radius: 14px; padding: 20px; border: 2px solid #e2e8f0; background: white; }
.adr-card .label { font-size: 0.7em; font-weight: 700; color: #16a34a; text-transform: uppercase; letter-spacing: 1px; margin-bottom: 6px; }
.adr-card h3 { font-size: 0.95em; font-weight: 700; margin-bottom: 10px; }
.adr-card .chosen { background: #dcfce7; color: #166534; border-radius: 8px; padding: 4px 10px; font-size: 0.82em; font-weight: 700; display: inline-block; margin-bottom: 8px; }
.adr-card .alt { font-size: 0.78em; color: #94a3b8; margin-bottom: 6px; }
.adr-card .reason { font-size: 0.8em; color: #475569; border-left: 3px solid #16a34a; padding-left: 8px; }
</style>

## ADR — 핵심 의사결정 3가지

<div class="adr-grid">
  <div class="adr-card">
    <div class="label">ADR-0001 · 플랫폼</div>
    <h3>모바일 프레임워크</h3>
    <span class="chosen">✅ React Native + Expo</span>
    <div class="alt">vs Flutter · 네이티브</div>
    <div class="reason">기존 JS 지식 재활용 + Claude 공식 JS SDK 사용 가능</div>
  </div>
  <div class="adr-card">
    <div class="label">ADR-0002 · AI</div>
    <h3>Vision AI API</h3>
    <span class="chosen">✅ Claude API</span>
    <div class="alt">vs GPT-4 Vision · Gemini</div>
    <div class="reason">한식 인식 품질 우수 + JSON 응답 안정성 높음</div>
  </div>
  <div class="adr-card">
    <div class="label">ADR-0003 · 저장소</div>
    <h3>데이터 저장</h3>
    <span class="chosen">✅ AsyncStorage</span>
    <div class="alt">vs Firebase · 자체 서버</div>
    <div class="reason">서버 없이 기기 내 저장 — 6주 일정 내 구현 가능</div>
  </div>
</div>

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
