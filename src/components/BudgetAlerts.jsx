import { motion } from "motion/react";
import { getCategoryLabel } from "../i18n/translations.js";
import { useI18n } from "../hooks/useI18n.js";
import { formatCurrency } from "../utils/currency.js";
import { fadeScale, fadeUp, quickStagger } from "../utils/motion.js";

function BudgetAlerts({
  items,
  totalExceededAmount,
  variant = "default",
  tone = "danger",
  title,
  eyebrow,
  subtitle,
}) {
  const { language, t } = useI18n();

  if (items.length === 0) {
    return null;
  }

  const toneClass =
    variant === "hero" ? "budget-alerts--hero" : "budget-alerts--panel";
  const colorClass =
    tone === "warning" ? "budget-alerts--warning" : "budget-alerts--danger";

  const computedTitle =
    title ??
    (tone === "warning"
      ? t("budgetAlerts.warningTitle")
      : t("budgetAlerts.dangerTitle"));
  const computedEyebrow =
    eyebrow ??
    (tone === "warning"
      ? t("budgetAlerts.warningEyebrow")
      : t("budgetAlerts.dangerEyebrow"));
  const computedSubtitle =
    subtitle ??
    (tone === "warning"
      ? t("budgetAlerts.warningSubtitle", { count: items.length })
      : t("budgetAlerts.dangerSubtitle", {
          amount: formatCurrency(totalExceededAmount ?? 0, language),
          count: items.length,
        }));

  return (
    <motion.section
      {...fadeUp}
      className={`budget-alerts ${toneClass} ${colorClass}`}
    >
      <div className="budget-alerts__header">
        <div>
          <span className="budget-alerts__eyebrow">{computedEyebrow}</span>
          <h2 className="budget-alerts__title">{computedTitle}</h2>
          <p className="budget-alerts__subtitle">{computedSubtitle}</p>
        </div>
      </div>

      <motion.div
        className="budget-alerts__list"
        variants={quickStagger}
        initial="initial"
        animate="animate"
      >
        {items.map((item) => (
          <motion.article
            {...fadeScale}
            className="budget-alert"
            key={item.category}
          >
            <div>
              <strong>{getCategoryLabel(item.category, language)}</strong>
              <span>
                {t("budgetAlerts.spentBudget", {
                  spent: formatCurrency(item.spent, language),
                  budget: formatCurrency(item.budget, language),
                })}
              </span>
            </div>
            <strong className="budget-alert__delta">
              {tone === "warning"
                ? t("budgetAlerts.used", {
                    value: Math.round(item.percentageUsed),
                  })
                : `+${formatCurrency(Math.abs(item.remaining), language)}`}
            </strong>
          </motion.article>
        ))}
      </motion.div>
    </motion.section>
  );
}

export default BudgetAlerts;
