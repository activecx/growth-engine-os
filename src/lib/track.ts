// Client-safe Meta Pixel event helper.
// No-ops on the server and when the pixel hasn't loaded (ad-blockers, etc.).
type TrackParams = Record<string, unknown>;

interface FbqWindow {
  fbq?: (...args: unknown[]) => void;
}

/** Fire a Meta standard event, e.g. track('Purchase', { value: 49, currency: 'USD' }). */
export function track(event: string, params?: TrackParams): void {
  if (typeof window === 'undefined') return;
  const w = window as unknown as FbqWindow;
  if (typeof w.fbq === 'function') {
    w.fbq('track', event, params ?? {});
  }
}
