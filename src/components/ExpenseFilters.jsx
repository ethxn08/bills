import { motion } from "motion/react";
import AppSelect from "./AppSelect.jsx";
import { getLocalizedCategories } from "../data/categories.js";
import { useI18n } from "../hooks/useI18n.js";
import { fadeUp, quickStagger } from "../utils/motion.js";

function ExpenseFilters({
  filters,
  hasActiveFilters,
  onCategoryChange,
  onReset,
  onSortChange,
}) {
  const { language, t } = useI18n();
  const categories = getLocalizedCategories(language);

  return (
    <motion.div
      className="expense-filters"
      variants={quickStagger}
      initial="initial"
      animate="animate"
    >
      <motion.div className="field" variants={fadeUp}>
        <AppSelect
          id="expense-category-filter"
          label={t("filters.category")}
          value={filters.category}
          onChange={onCategoryChange}
          options={[
            { value: "all", label: t("filters.allCategories") },
            ...categories.map((category) => ({
              value: category.id,
              label: category.label,
            })),
          ]}
        />
      </motion.div>

      <motion.div className="field" variants={fadeUp}>
        <AppSelect
          id="expense-sort"
          label={t("filters.sortBy")}
          value={filters.sortBy}
          onChange={onSortChange}
          options={[
            { value: "date-desc", label: t("filters.mostRecent") },
            { value: "date-asc", label: t("filters.oldest") },
            { value: "amount-desc", label: t("filters.highestAmount") },
            { value: "amount-asc", label: t("filters.lowestAmount") },
          ]}
        />
      </motion.div>

      <motion.div className="expense-filters__actions" variants={fadeUp}>
        <button
          className="secondary-button"
          type="button"
          onClick={onReset}
          disabled={!hasActiveFilters}
        >
          {t("filters.clear")}
        </button>
      </motion.div>
    </motion.div>
  );
}

export default ExpenseFilters;
