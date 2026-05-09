import { motion } from "motion/react";
import EmptyState from "./EmptyState.jsx";
import { CATEGORY_MAP } from "../data/categories.js";
import { getCategoryLabel } from "../i18n/translations.js";
import { useI18n } from "../hooks/useI18n.js";
import { formatCurrency } from "../utils/currency.js";
import { fadeScale, fadeUp, quickStagger } from "../utils/motion.js";

function BudgetStatusList({ items }) {
  const { language, t } = useI18n();

  if (items.length === 0) {
    return (
      <motion.div {...fadeUp}>
        <EmptyState
          title={t("budgetStatus.emptyTitle")}
          description={t("budgetStatus.emptyDescription")}
        />
      </motion.div>
    );
  }

  return (
    <motion.div
      className="budget-status-list"
      variants={quickStagger}
      initial="initial"
      animate="animate"
    >
      {items.map((item) => {
        const category = CATEGORY_MAP[item.category];
        const toneClass = item.isOverBudget
          ? "budget-status--alert"
          : "budget-status--ok";
        const width =
          item.budget > 0 ? `${Math.min(item.percentageUsed, 100)}%` : "0%";

        return (
          <motion.article
            {...fadeScale}
            className={`budget-status ${toneClass}`}
            key={item.category}
          >
            <div className="budget-status__header">
              <span>{getCategoryLabel(item.category, language)}</span>
              <strong>
                {formatCurrency(item.spent, language)} /{" "}
                {formatCurrency(item.budget, language)}
              </strong>
            </div>
            <div className="bar-track" aria-hidden="true">
              <div
                className="bar-fill"
                style={{
                  width,
                  background: item.isOverBudget
                    ? "#b45309"
                    : (category?.color ?? "#23404a"),
                }}
              />
            </div>
            <div className="budget-status__meta">
              <span>
                {item.isOverBudget
                  ? t("budgetStatus.overBudget")
                  : t("budgetStatus.remaining")}
              </span>
              <strong>
                {item.isOverBudget
                  ? `+${formatCurrency(Math.abs(item.remaining), language)}`
                  : formatCurrency(item.remaining, language)}
              </strong>
            </div>
          </motion.article>
        );
      })}
    </motion.div>
  );
}

export default BudgetStatusList;
