import { isLecturePage, parseLectureInfo } from "./url-detector";
import { RouteObserver } from "./route-observer";

type BootstrapState = "idle" | "active" | "error";

const TAG = "[OMAT]";

/**
 * 확장 프로그램 초기화 오케스트레이터
 * 강의 페이지 감지 → 활성화/비활성화를 관리한다.
 */
export class Bootstrap {
  private state: BootstrapState = "idle";
  private routeObserver = new RouteObserver();

  /** 최초 초기화 — 라우트 감시 시작 및 현재 페이지 판별 */
  init(): void {
    try {
      this.routeObserver.start((url) => this.onRouteChange(url));
      this.evaluate(location.href);
      console.log(`${TAG} 초기화 완료`);
    } catch (error) {
      this.state = "error";
      console.error(`${TAG} 초기화 실패`, error);
    }
  }

  /** URL을 평가하여 활성화/비활성화 결정 */
  private evaluate(url: string): void {
    if (isLecturePage(url)) {
      this.activate(url);
    } else {
      this.deactivate();
      console.log(`${TAG} 강의 페이지가 아닙니다:`, url);
    }
  }

  /** 라우트 변경 시 재판별 */
  private onRouteChange(url: string): void {
    console.log(`${TAG} 라우트 변경 감지:`, url);
    this.evaluate(url);
  }

  /** 확장 기능 활성화 */
  private activate(url: string): void {
    if (this.state === "active") return;

    const info = parseLectureInfo(url);
    this.state = "active";
    console.log(`${TAG} 강의 페이지 활성화:`, info);
    // TODO: transcript 추출, overlay 렌더링 등 후속 모듈 연결
  }

  /** 확장 기능 비활성화 및 정리 */
  private deactivate(): void {
    if (this.state !== "active") return;

    this.state = "idle";
    console.log(`${TAG} 비활성화`);
    // TODO: overlay 제거, 리소스 정리
  }
}
