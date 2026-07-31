import { onCLS, onFCP, onINP, onLCP, onTTFB } from "web-vitals";
import type { Metric } from "web-vitals";
import { track } from "@vercel/analytics/react";

function sendToAnalytics(metric: Metric) {
  const { id, name, delta, value, rating } = metric;

  track("web-vital", {
    name,
    id,
    delta,
    value,
    rating,
  });
}

export function reportWebVitals() {
  onCLS(sendToAnalytics);
  onFCP(sendToAnalytics);
  onLCP(sendToAnalytics);
  onINP(sendToAnalytics);
  onTTFB(sendToAnalytics);
}
