import type { NavItem, OpeningHours } from "@/types/menu";

/**
 * Restaurant-wide constants. These will eventually be served by the CMS
 * (settings collection); kept here so there is a single source of truth.
 */
export const SITE = {
  name: "101 Bistro",
  shortName: "101",
  tagline: "A modern bistro, plated with intent.",
  description:
    "101 Bistro — a contemporary neighbourhood bistro. Browse our seasonal menu of plates, pasta, grills and desserts, crafted from the finest ingredients.",
  url: "https://101bistro.example",
  email: "hello@101bistro.example",
  phones: ["0750 207 1177", "0770 533 1177"],
  whatsapp: "+9647502071177",
  address: {
    line1: "Gulan Street",
    city: "Erbil",
    region: "Erbil Governorate",
    country: "Iraq",
    plusCode: "6X4G+GJP",
    full: "6X4G+GJP, Gulan St, Erbil, Erbil Governorate",
  },
  map: {
    /** Google Maps interactive embed for the storefront. */
    embedUrl:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3219.5352379310525!2d43.9817165!3d36.202183399999996!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4007222fe78d4685%3A0x5b22e3f66d655d6d!2sGulan%20St%2C%20Erbil%2C%20Erbil%20Governorate%2C%20Iraq!5e0!3m2!1sen!2slb!4v1782867657260!5m2!1sen!2slb",
    /** Deep link that opens directions in the Google Maps app/site. */
    directionsUrl:
      "https://www.google.com/maps/search/?api=1&query=6X4G%2BGJP%2C+Gulan+St%2C+Erbil%2C+Erbil+Governorate",
  },
  social: {
    instagram:
      "https://www.instagram.com/101bistro.erbil?igsh=MTRpenJoYzVvcmg5",
  },
  defaultCurrency: "USD" as const,
} as const;

export const PRIMARY_NAV: NavItem[] = [
  { label: "Home", href: "/", key: "home" },
  { label: "Menu", href: "/menu", key: "menu" },
  { label: "Visit", href: "/#visit", key: "visit" },
];

export const OPENING_HOURS: OpeningHours[] = [
  { day: "Monday", open: "10:00", close: "02:00" },
  { day: "Tuesday", open: "10:00", close: "02:00" },
  { day: "Wednesday", open: "10:00", close: "02:00" },
  { day: "Thursday", open: "10:00", close: "02:00" },
  { day: "Friday", open: "10:00", close: "02:00" },
  { day: "Saturday", open: "10:00", close: "02:00" },
  { day: "Sunday", open: "10:00", close: "02:00" },
];
