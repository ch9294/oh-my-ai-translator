type RouteChangeCallback = (url: string) => void;

/**
 * SPA 라우트 변경을 감지하는 옵저버
 * pushState, replaceState, popstate 이벤트를 모두 가로챈다.
 */
export class RouteObserver {
  private callback: RouteChangeCallback | null = null;
  private originalPushState: typeof history.pushState | null = null;
  private originalReplaceState: typeof history.replaceState | null = null;
  private popstateHandler: (() => void) | null = null;

  /** 라우트 변경 감시 시작 */
  start(callback: RouteChangeCallback): void {
    this.callback = callback;
    this.patchHistoryMethod("pushState");
    this.patchHistoryMethod("replaceState");

    this.popstateHandler = () => {
      this.callback?.(location.href);
    };
    window.addEventListener("popstate", this.popstateHandler);
  }

  /** 감시 중지 및 원본 복원 */
  stop(): void {
    if (this.originalPushState) {
      history.pushState = this.originalPushState;
      this.originalPushState = null;
    }
    if (this.originalReplaceState) {
      history.replaceState = this.originalReplaceState;
      this.originalReplaceState = null;
    }
    if (this.popstateHandler) {
      window.removeEventListener("popstate", this.popstateHandler);
      this.popstateHandler = null;
    }
    this.callback = null;
  }

  /** History API 메서드를 래핑하여 라우트 변경 콜백 호출 */
  private patchHistoryMethod(method: "pushState" | "replaceState"): void {
    const original = history[method].bind(history);

    if (method === "pushState") {
      this.originalPushState = history.pushState;
    } else {
      this.originalReplaceState = history.replaceState;
    }

    history[method] = (...args: Parameters<typeof history.pushState>) => {
      original(...args);
      this.callback?.(location.href);
    };
  }
}
