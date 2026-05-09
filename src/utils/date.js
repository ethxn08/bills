import { getLanguageLocale } from "../i18n/translations.js";

export function getCurrentMonthKey() {
  return new Date().toISOString().slice(0, 7);
}

export function getMonthKey(dateString) {
  return dateString.slice(0, 7);
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
