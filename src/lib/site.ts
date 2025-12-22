export const site = {
  name: "Full Gospel Church Githurai 44",
  tagline: "Jesus Healing Center",
  locationShort: "Githurai 44, Kenya",
  contact: {
    phone: "011788919",
    email: "fgckegithurai44@gmail.com",
    addressLine: "Githurai 44, Nairobi, Kenya",
  },
  serviceTimes: [
    { label: "Sunday Service", time: "9:00 AM" },
    { label: "Midweek Service", time: "Wednesday 6:00 PM" },
  ],
};

export type NavItem = { label: string; href: string };

export const primaryNav: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Pastors", href: "/pastors" },
  { label: "New Here", href: "/new-here" },
  { label: "Ministries", href: "/ministries" },
  { label: "Sermons", href: "/sermons" },
  { label: "Events", href: "/events" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "/contact" },
];
