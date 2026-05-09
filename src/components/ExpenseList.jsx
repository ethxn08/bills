import { AnimatePresence, motion } from "motion/react";
import CategoryPill from "./CategoryPill.jsx";
import EmptyState from "./EmptyState.jsx";
import { useI18n } from "../hooks/useI18n.js";
import { formatCurrency } from "../utils/currency.js";
import { formatShortDate } from "../utils/date.js";
import { fadeScale, fadeUp, quickStagger } from "../utils/motion.js";

function ExpenseList({ expenses, onDelete, onEdit }) {
  const { language, t } = useI18n();

  if (expenses.length === 0) {
    return (
      <motion.div {...fadeUp}>
        <EmptyState
          title={t("expenseList.emptyTitle")}
          description={t("expenseList.emptyDescription")}
        />
      </motion.div>
    );
  }

  return (
    <motion.div
      className="expense-list"
      variants={quickStagger}
      initial="initial"
      animate="animate"
    >
      <AnimatePresence>
        {expenses.map((expense) => (
          <motion.article
            {...fadeScale}
            className="expense-item"
            key={expense.id}
          >
            <div className="expense-item__top">
              <div>
                <h3 className="expense-item__title">{expense.title}</h3>
                <CategoryPill categoryId={expense.category} />
              </div>
              <div className="expense-amount">
                {formatCurrency(expense.amount, language)}
              </div>
            </div>

            <div className="expense-item__meta">
              <span>{formatShortDate(expense.date, language)}</span>
              <span>{expense.note || t("common.noNote")}</span>
            </div>

            <div className="expense-item__actions">
              <button
                className="secondary-button"
                type="button"
                onClick={() => onEdit(expense)}
              >
                {t("expenseList.edit")}
              </button>
              <button
                className="ghost-button expense-delete"
                type="button"
                onClick={() => onDelete(expense.id)}
              >
                {t("expenseList.delete")}
              </button>
            </div>
          </motion.article>
        ))}
      </AnimatePresence>
    </motion.div>
  );
}

export default ExpenseList;
