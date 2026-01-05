"use client";

import { useEffect, useRef } from "react";
import { trackPageVisit } from "@/lib/analytics/tracking";

interface PageTrackerProps {
  page: "home" | "blog" | "sermons";
}

export default function PageTracker({ page }: PageTrackerProps) {
  const hasTracked = useRef(false);

  useEffect(() => {
    if (!hasTracked.current) {
      hasTracked.current = true;
      trackPageVisit(page);
    }
  }, [page]);

  return null; // This component doesn't render anything
}
