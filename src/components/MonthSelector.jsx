import { motion } from "motion/react";
import EmptyState from "./EmptyState.jsx";
import { useI18n } from "../hooks/useI18n.js";
import { formatMonthLabel } from "../utils/date.js";
import { fadeScale, fadeUp, quickStagger } from "../utils/motion.js";

function MonthSelector({ months, value, onChange }) {
  const { language, t } = useI18n();

  if (months.length === 0) {
    return (
      <motion.div {...fadeUp}>
        <EmptyState
          title={t("monthSelector.emptyTitle")}
          description={t("monthSelector.emptyDescription")}
        />
      </motion.div>
    );
  }

  return (
    <motion.div
      className="chip-row"
      aria-label={t("monthSelector.availableMonths")}
      variants={quickStagger}
      initial="initial"
      animate="animate"
    >
      {months.map((month) => (
        <motion.button
          {...fadeScale}
          key={month}
          type="button"
          className={`chip${month === value ? " chip--active" : ""}`}
          onClick={() => onChange(month)}
        >
          {formatMonthLabel(month, language)}
        </motion.button>
      ))}
    </motion.div>
  );
}

export default MonthSelector;
