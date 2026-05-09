import { getCategoryLabel } from "../i18n/translations.js";

export const CATEGORIES = [
  { id: "vivienda", label: "Vivienda", color: "#3f6f78" },
  { id: "alimentacion", label: "Alimentacion", color: "#d97706" },
  { id: "transporte", label: "Transporte", color: "#4f46e5" },
  { id: "suscripciones", label: "Suscripciones", color: "#c2410c" },
  { id: "ocio", label: "Ocio", color: "#be185d" },
  { id: "salud", label: "Salud", color: "#0f766e" },
  { id: "ahorro", label: "Ahorro", color: "#15803d" },
  { id: "otros", label: "Otros", color: "#6b7280" },
];

export const CATEGORY_MAP = Object.fromEntries(
  CATEGORIES.map((category) => [category.id, category]),
);

export function getLocalizedCategories(language = "es") {
  return CATEGORIES.map((category) => ({
    ...category,
    label: getCategoryLabel(category.id, language),
  }));
}
