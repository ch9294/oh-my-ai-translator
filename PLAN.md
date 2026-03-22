# PLAN - oh-my-ai-translator

## 1. 목표

Udemy 강의를 자동으로 한국어 자막으로 변환하는 시스템 구축

---

## 2. 기술 스택

### Frontend (Extension)
- TypeScript
- Chrome Extension (Manifest v3)
- DOM API

### Desktop App
- Electron
- React (Dashboard)
- TypeScript

### Backend (Local)
- Fastify
- SQLite
- Drizzle ORM (or better-sqlite3)

### AI
- OpenAI API (GPT)

---

## 3. 시스템 설계

### 3.1 Extension

#### 역할
- transcript 추출
- video currentTime 추적
- overlay UI 렌더링
- 서버 요청

#### 핵심 모듈
- bootstrap
- transcript parser
- video observer
- overlay renderer
- api client

---

### 3.2 Desktop App

#### 역할
- 로컬 서버 실행
- 번역 처리
- 캐시 저장

#### 구조
- main (Electron)
- renderer (UI)
- server (Fastify)

---

### 3.3 데이터베이스 설계

#### tables

**lectures**
- id
- platform
- courseId
- lectureId
- transcriptHash

**transcript_items**
- id
- lectureId
- start
- end
- originalText
- translatedText

---

## 4. 번역 파이프라인

```
transcript
 → hash 계산
 → 캐시 조회
   → hit: 반환
   → miss:
        → chunk 분할
        → OpenAI 호출
        → 결과 저장
        → 반환
```

---

## 5. API 설계

### POST /translate-transcript

#### request
```
{
  courseId,
  lectureId,
  items: [{ id, start, end, text }]
}
```

#### response
```
{
  items: [{ id, translatedText }]
}
```

---

## 6. 구현 단계

### Phase 1 - Extension MVP
- transcript 추출
- video sync
- overlay

### Phase 2 - Server
- Fastify
- /health

### Phase 3 - DB
- SQLite
- migration

### Phase 4 - Pipeline
- hash
- cache
- chunk

### Phase 5 - OpenAI
- API 연동

### Phase 6 - Integration
- Extension ↔ App 연결

---

## 7. 향후 확장

- 다른 강의 플랫폼 지원
- 로컬 LLM 지원
- 번역 품질 개선
