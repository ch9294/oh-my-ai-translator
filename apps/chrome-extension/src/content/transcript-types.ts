/**
 * DOM에서 파싱한 개별 transcript cue 데이터
 * API 전송 전 정규화에 사용된다.
 */
export interface TranscriptCue {
  /** cue 인덱스 (0-based, DOM 순서 기준) */
  index: number;
  /** 시작 시간 (초 단위, 소수점 포함) */
  startTime: number;
  /** 텍스트 원문 */
  text: string;
}
