// Centralized tracking utility
// Console logs in dev, pushes to dataLayer in production

type TrackingEvent = {
  event: string;
  event_category?: string;
  event_label?: string;
  value?: number;
  [key: string]: string | number | undefined;
};

export function trackEvent(eventData: TrackingEvent) {
  // Always console.log in dev
  if (process.env.NODE_ENV === "development") {
    console.log("[TRACKING]", eventData.event, eventData);
  }

  if (typeof window === "undefined") return;

  // Push to dataLayer (GTM)
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const w = window as any;
  if (w.dataLayer) {
    w.dataLayer.push(eventData);
  }

  // Fire GA4 event
  if (w.gtag) {
    w.gtag("event", eventData.event, {
      event_category: eventData.event_category,
      event_label: eventData.event_label,
      value: eventData.value,
    });
  }
}
