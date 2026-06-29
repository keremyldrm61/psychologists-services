import type { Theme } from "../types/psychologist";

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

export const DB_ROOT = import.meta.env.VITE_FIREBASE_DB_ROOT;