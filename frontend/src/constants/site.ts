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
  phone: "+961 1 000 101",
  whatsapp: "+9611000101",
  address: {
    line1: "101 Riverside Avenue",
    city: "Beirut",
    country: "Lebanon",
  },
  social: {
    instagram: "https://instagram.com/101bistro",
    facebook: "https://facebook.com/101bistro",
    tiktok: "https://tiktok.com/@101bistro",
  },
  defaultCurrency: "USD" as const,
} as const;

export const PRIMARY_NAV: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "Menu", href: "/menu" },
  { label: "Our Story", href: "/#story" },
  { label: "Visit", href: "/#visit" },
];

export const OPENING_HOURS: OpeningHours[] = [
  { day: "Monday", open: "12:00", close: "23:00" },
  { day: "Tuesday", open: "12:00", close: "23:00" },
  { day: "Wednesday", open: "12:00", close: "23:00" },
  { day: "Thursday", open: "12:00", close: "00:00" },
  { day: "Friday", open: "12:00", close: "01:00" },
  { day: "Saturday", open: "11:00", close: "01:00" },
  { day: "Sunday", open: "11:00", close: "23:00" },
];
