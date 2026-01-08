export const site = {
  name: "Full Gospel Church Githurai 44",
  tagline: "Jesus Healing Center",
  locationShort: "Githurai 44, Kenya",
  contact: {
    phone: "0113788919",
    email: "fgckgithurai44@gmail.com",
    addressLine: "Githurai 44, Nairobi, Kenya",
    poBox: "65941-00607",
  },
  serviceTimes: [
    { label: "1st Service", time: "9:00am - 10:45am" },
    { label: "2nd Service", time: "10:45am - 1:00pm" },
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
