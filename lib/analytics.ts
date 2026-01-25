export function track(event: string, params?: Record<string, unknown>) {
  if (typeof window === "undefined") return;
  const w = window as typeof window & { gtag?: Function };
  if (!w.gtag) return;
  w.gtag("event", event, params ?? {});
}

