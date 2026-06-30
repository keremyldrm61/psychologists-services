import type { Theme } from "../types/psychologist";

export const DB_ROOT = import.meta.env.VITE_FIREBASE_DB_ROOT;

export const themes: { id: Theme; color: string }[] = [
    { id: "green", color: "#54be96" },
    { id: "blue", color: "#3470ff" },
    { id: "orange", color: "#fc832c" }
];

export const timeSlots = [
  "09:00",
  "09:30",
  "10:00",
  "10:30",
  "11:00",
  "11:30",
  "12:00",
  "12:30",
  "13:00",
  "13:30",
  "14:00",
  "14:30",
  "15:00",
  "15:30",
  "16:00",
  "16:30",
  "17:00",
];

export const PSYCHOLOGIST_FILTERS = {
  SHOW_ALL: "Show all",
  A_TO_Z: "A to Z",
  Z_TO_A: "Z to A",
  PRICE_LESS_THAN_10: "Less than 10$",
  PRICE_GREATER_THAN_10: "Greater than 10$",
  POPULAR: "Popular",
  NOT_POPULAR: "Not popular",
} as const;

export const ITEMS_PER_PAGE = 3;