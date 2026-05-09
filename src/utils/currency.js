import { getLanguageLocale } from "../i18n/translations.js";

export function formatCurrency(value, language = "es") {
  return new Intl.NumberFormat(getLanguageLocale(language), {
    style: "currency",
    currency: "EUR",
    minimumFractionDigits: 2,
  }).format(value);
}
