import { motion } from "motion/react";
import { getLocalizedCategories } from "../data/categories.js";
import { useI18n } from "../hooks/useI18n.js";
import { formatCurrency } from "../utils/currency.js";
import { fadeScale, quickStagger } from "../utils/motion.js";

function BudgetPlanner({ budgets, onSave }) {
  const { language } = useI18n();
  const categories = getLocalizedCategories(language);

  return (
    <motion.div
      className="budget-list"
      variants={quickStagger}
      initial="initial"
      animate="animate"
    >
      {categories.map((category) => {
        const budget = budgets[category.id] ?? 0;

        return (
          <motion.label
            {...fadeScale}
            className="budget-item"
            key={category.id}
          >
            <span className="budget-item__top">
              <span>{category.label}</span>
              <strong>{formatCurrency(budget, language)}</strong>
            </span>

            <input
              type="number"
              inputMode="decimal"
              min="0"
              step="0.01"
              value={budget === 0 ? "" : budget}
              onChange={(event) => {
                const nextValue = event.target.value;

                onSave(category.id, nextValue === "" ? 0 : Number(nextValue));
              }}
            />
          </motion.label>
        );
      })}
    </motion.div>
  );
}

export default BudgetPlanner;
