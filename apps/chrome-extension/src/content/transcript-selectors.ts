/** 개별 셀렉터 정의 — primary(data-purpose)와 fallback(class 부분 매칭) */
interface SelectorEntry {
  primary: string;
  fallback: string;
}

/** Udemy transcript DOM 셀렉터 모음 */
export const TRANSCRIPT_SELECTORS = {
  /** transcript 패널 컨테이너 */
  panel: {
    primary: '[data-purpose="transcript-panel"]',
    fallback: '[class*="transcript--panel"]',
  } satisfies SelectorEntry,

  /** transcript cue 목록 컨테이너 */
  cueContainer: {
    primary: '[data-purpose="transcript-cue-container"]',
    fallback: '[class*="transcript--cue-container"]',
  } satisfies SelectorEntry,

  /** 개별 transcript cue 요소 */
  cue: {
    primary: '[data-purpose="transcript-cue"]',
    fallback: '[class*="transcript--cue"]',
  } satisfies SelectorEntry,

  /** cue 내부 타임스탬프 요소 */
  cueTimestamp: {
    primary: '[data-purpose="transcript-cue-time"]',
    fallback: '[class*="transcript--cue-time"]',
  } satisfies SelectorEntry,

  /** cue 내부 텍스트 요소 */
  cueText: {
    primary: '[data-purpose="transcript-cue-text"]',
    fallback: '[class*="transcript--cue-text"]',
  } satisfies SelectorEntry,

  /** 현재 활성화된(하이라이트) cue */
  activeCue: {
    primary: '[data-purpose="transcript-cue"][class*="active"]',
    fallback: '[class*="transcript--cue"][class*="active"]',
  } satisfies SelectorEntry,
} as const;

type SelectorKey = keyof typeof TRANSCRIPT_SELECTORS;

/** 셀렉터 키에 해당하는 단일 DOM 요소를 조회한다. primary 실패 시 fallback 사용. */
export function queryTranscript(key: SelectorKey): Element | null {
  const { primary, fallback } = TRANSCRIPT_SELECTORS[key];
  return document.querySelector(primary) ?? document.querySelector(fallback);
}

/** 셀렉터 키에 해당하는 모든 DOM 요소를 조회한다. primary 결과가 없으면 fallback 재시도. */
export function queryAllTranscript(key: SelectorKey): NodeListOf<Element> {
  const { primary, fallback } = TRANSCRIPT_SELECTORS[key];
  const result = document.querySelectorAll(primary);
  return result.length > 0 ? result : document.querySelectorAll(fallback);
}
