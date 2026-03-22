# oh-my-ai-translator

Udemy 강의를 한국어 자막으로 자동 번역해주는 Chrome Extension + Electron Desktop App 프로젝트입니다.

## ✨ 주요 기능

- Udemy transcript 자동 추출
- 영상 시간 기반 자막 동기화
- OpenAI API 기반 실시간 번역
- 번역 결과 로컬 캐싱 (SQLite)
- 영상 위 overlay 자막 표시
- 로컬 서버 기반 Extension ↔ App 통신

---

## 🧱 아키텍처

```
[Chrome Extension]
  → transcript 추출
  → video 시간 추적
  → 로컬 서버 요청
  → 번역 결과 overlay 표시

        ↓

[Electron App]
  → Fastify 서버
  → SQLite DB (캐시)
  → 번역 파이프라인
  → OpenAI API
```

---

## 🚀 실행 방법

### 1. Desktop App 실행
```bash
pnpm install
pnpm dev
```

### 2. Chrome Extension 로드
- chrome://extensions 접속
- "압축해제된 확장 프로그램 로드"
- extension 폴더 선택

---

## ⚙️ 환경 변수

```
OPENAI_API_KEY=your_api_key
PORT=3000
```

---

## 📌 TODO

- UI 설정 페이지 추가
- 번역 모델 선택 기능
- 로컬 LLM 지원
