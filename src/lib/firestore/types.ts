// Firestore document types for FGCK-44

export interface Blog {
  id?: string;
  title: string;
  subheading: string;
  image: string;
  date: string;
  content: string;
  createdAt: number;
  updatedAt: number;
}

export interface Sermon {
  id?: string;
  title: string;
  description: string;
  youtube: string;
  image?: string;
  date: string;
  createdAt: number;
  updatedAt: number;
}

export interface Event {
  id?: string;
  title: string;
  image: string;
  date: string;
  description: string;
  createdAt: number;
  updatedAt: number;
}

export interface Project {
  id?: string;
  title: string;
  image: string;
  deadline: string;
  progress: number;
  description: string;
  createdAt: number;
  updatedAt: number;
}

export interface InboxMessage {
  id?: string;
  name: string;
  email: string;
  phone?: string;
  message: string;
  createdAt: number;
  read: boolean;
}

export interface PageVisit {
  id?: string;
  visitorId: string;
  page: "home" | "blog" | "sermons";
  screenWidth: number;
  timestamp: number;
}

// Analytics data types
export interface AnalyticsData {
  totalVisits: number;
  blogReads: number;
  sermonViews: number;
  lastMonthTotalVisits: number;
  lastMonthBlogReads: number;
  lastMonthSermonViews: number;
}
