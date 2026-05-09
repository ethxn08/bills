import { useMemo } from "react";
import { getLanguageLocale, translate } from "../i18n/translations.js";
import { useExpensesContext } from "./useExpensesContext.js";

export function useI18n() {
  const { language, setLanguage } = useExpensesContext();

  const value = useMemo(
    () => ({
      language,
      locale: getLanguageLocale(language),
      setLanguage,
      t: (key, variables) => translate(language, key, variables),
    }),
    [language, setLanguage],
  );

  return value;
}
