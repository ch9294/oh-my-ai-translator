/** Udemy 강의 URL 패턴: /course/{slug}/learn/lecture/{id} */
const LECTURE_PATTERN = /\/course\/([^/]+)\/learn\/lecture\/(\d+)/;

export interface LectureInfo {
  courseSlug: string;
  lectureId: string;
}

/** 현재 URL이 Udemy 강의 페이지인지 판별 */
export function isLecturePage(url: string): boolean {
  return LECTURE_PATTERN.test(url);
}

/** URL에서 강의 정보(courseSlug, lectureId) 추출 */
export function parseLectureInfo(url: string): LectureInfo | null {
  const match = url.match(LECTURE_PATTERN);
  if (!match) return null;
  return { courseSlug: match[1], lectureId: match[2] };
}
