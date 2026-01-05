// Analytics tracking utilities for FGCK-44
// Tracks: home (Total Visits), blog (Blog Reads), sermons (Sermon Views)

const VISITOR_ID_KEY = "visitor_id";
const LAST_VISIT_PREFIX = "last_visit_";

// Generate a UUID v4
function generateUUID(): string {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
    const r = (Math.random() * 16) | 0;
    const v = c === "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

// Get or create visitor ID
export function getVisitorId(): string {
  if (typeof window === "undefined") return "";
  
  let visitorId = localStorage.getItem(VISITOR_ID_KEY);
  if (!visitorId) {
    visitorId = generateUUID();
    localStorage.setItem(VISITOR_ID_KEY, visitorId);
  }
  return visitorId;
}

// Check if we should track this visit (prevent duplicate within 5 minutes)
function shouldTrackVisit(page: string): boolean {
  if (typeof window === "undefined") return false;
  
  const lastVisitKey = `${LAST_VISIT_PREFIX}${page}`;
  const lastVisit = localStorage.getItem(lastVisitKey);
  const now = Date.now();
  
  if (lastVisit) {
    const timeSinceLastVisit = now - parseInt(lastVisit, 10);
    const fiveMinutes = 5 * 60 * 1000; // 5 minutes in milliseconds
    if (timeSinceLastVisit < fiveMinutes) {
      return false;
    }
  }
  
  localStorage.setItem(lastVisitKey, now.toString());
  return true;
}

// Get screen width
function getScreenWidth(): number {
  if (typeof window === "undefined") return 0;
  return window.innerWidth;
}

// Track page data interface
interface TrackPageData {
  visitorId: string;
  page: "home" | "blog" | "sermons";
  screenWidth: number;
  timestamp: number;
}

// Track a page visit
export async function trackPageVisit(page: "home" | "blog" | "sermons"): Promise<void> {
  if (typeof window === "undefined") return;
  
  // Check if we should track this visit
  if (!shouldTrackVisit(page)) {
    console.log(`[Analytics] Skipping duplicate visit for ${page}`);
    return;
  }
  
  const data: TrackPageData = {
    visitorId: getVisitorId(),
    page,
    screenWidth: getScreenWidth(),
    timestamp: Date.now(),
  };
  
  try {
    const response = await fetch("/api/track", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    
    if (!response.ok) {
      console.error("[Analytics] Failed to track visit:", response.statusText);
    } else {
      console.log(`[Analytics] Tracked visit to ${page}`);
    }
  } catch (error) {
    console.error("[Analytics] Error tracking visit:", error);
  }
}

// React hook for tracking page visits
export function usePageTracking(page: "home" | "blog" | "sermons") {
  if (typeof window !== "undefined") {
    // Track on initial load
    trackPageVisit(page);
  }
}
