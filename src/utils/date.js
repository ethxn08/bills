import { getLanguageLocale } from "../i18n/translations.js";

export function getCurrentMonthKey() {
  return new Date().toISOString().slice(0, 7);
}

export function getTodayDateKey() {
  return new Date().toISOString().slice(0, 10);
}

export function getMonthKey(dateString) {
  return dateString.slice(0, 7);
}

export function addDays(dateString, amount) {
  const date = new Date(`${dateString}T12:00:00`);
  date.setDate(date.getDate() + amount);
  return date.toISOString().slice(0, 10);
}

export function addWeeks(dateString, amount) {
  return addDays(dateString, amount * 7);
}

export function addMonths(dateString, amount) {
  const [year, month, day] = dateString.split("-").map(Number);
  const targetMonthIndex = month - 1 + amount;
  const targetYear = year + Math.floor(targetMonthIndex / 12);
  const normalizedMonthIndex = ((targetMonthIndex % 12) + 12) % 12;
  const lastDayOfTargetMonth = new Date(
    Date.UTC(targetYear, normalizedMonthIndex + 1, 0),
  ).getUTCDate();
  const safeDay = Math.min(day, lastDayOfTargetMonth);

  return `${targetYear}-${String(normalizedMonthIndex + 1).padStart(2, "0")}-${String(safeDay).padStart(2, "0")}`;
}

export function formatMonthLabel(monthKey, language = "es") {
  const date = new Date(`${monthKey}-01T12:00:00`);
  const label = new Intl.DateTimeFormat(getLanguageLocale(language), {
    month: "long",
    year: "numeric",
  }).format(date);

  return label.charAt(0).toUpperCase() + label.slice(1);
}

export function formatShortDate(dateString, language = "es") {
  return new Intl.DateTimeFormat(getLanguageLocale(language), {
    day: "numeric",
    month: "short",
  }).format(new Date(`${dateString}T12:00:00`));
}

export function sortByDateDescending(items) {
  return [...items].sort((firstItem, secondItem) => {
    return secondItem.date.localeCompare(firstItem.date);
  });
}
