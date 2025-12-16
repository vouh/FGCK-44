export type PlaceholderItem = {
  id: string;
  title: string;
  subtitle?: string;
  dateLabel?: string;
  slug?: string;
};

export const placeholderPosts: PlaceholderItem[] = [
  {
    id: "p1",
    title: "Welcome to FGCK Githurai 44",
    subtitle: "(Placeholder) Announcements and church updates will appear here.",
    dateLabel: "Dec 2025",
    slug: "welcome-to-fgck-githurai-44",
  },
  {
    id: "p2",
    title: "Weekly Devotional",
    subtitle: "(Placeholder) A short devotional and encouragement.",
    dateLabel: "Dec 2025",
    slug: "weekly-devotional",
  },
];

export const placeholderSermons: PlaceholderItem[] = [
  {
    id: "s1",
    title: "Tremendous Divine Grace",
    subtitle: "Speaker (placeholder) • Scripture (placeholder)",
    dateLabel: "Dec 2025",
    slug: "tremendous-divine-grace",
  },
  {
    id: "s2",
    title: "Faith and Fellowship",
    subtitle: "Speaker (placeholder) • Scripture (placeholder)",
    dateLabel: "Dec 2025",
    slug: "faith-and-fellowship",
  },
];

export const placeholderEvents: PlaceholderItem[] = [
  {
    id: "e1",
    title: "Sunday Worship Service",
    subtitle: "Main Sanctuary (placeholder)",
    dateLabel: "Next Sunday",
  },
  {
    id: "e2",
    title: "Prayer Moment",
    subtitle: "Church Hall (placeholder)",
    dateLabel: "This Week",
  },
];

export const placeholderMinistries: PlaceholderItem[] = [
  { id: "m1", title: "Youth Ministry", subtitle: "Meeting times (placeholder)", slug: "youth" },
  { id: "m2", title: "Women’s Ministry", subtitle: "Meeting times (placeholder)", slug: "women" },
  { id: "m3", title: "Men’s Ministry", subtitle: "Meeting times (placeholder)", slug: "men" },
  { id: "m4", title: "Children’s Ministry", subtitle: "Meeting times (placeholder)", slug: "children" },
];

export const placeholderProjects: PlaceholderItem[] = [
  {
    id: "pr1",
    title: "Church Development Project",
    subtitle: "Status: Active (placeholder)",
    dateLabel: "2025–2026",
    slug: "church-development-project",
  },
  {
    id: "pr2",
    title: "Community Outreach",
    subtitle: "Status: Active (placeholder)",
    dateLabel: "2025",
    slug: "community-outreach",
  },
];
