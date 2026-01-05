"use client";

import { useEffect, useRef } from "react";
import { trackPageVisit } from "./tracking";

// React hook for tracking page visits
export function useTrackPage(page: "home" | "blog" | "sermons") {
  const hasTracked = useRef(false);

  useEffect(() => {
    if (!hasTracked.current) {
      hasTracked.current = true;
      trackPageVisit(page);
    }
  }, [page]);
}
