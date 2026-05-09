import { motion } from "motion/react";
import EmptyState from "./EmptyState.jsx";
import { useI18n } from "../hooks/useI18n.js";
import { formatCurrency } from "../utils/currency.js";
import { formatMonthLabel } from "../utils/date.js";
import { getMaxValue } from "../utils/expenseAnalytics.js";
import { fadeScale, fadeUp, quickStagger } from "../utils/motion.js";

function BarChart({ items }) {
  const { language, t } = useI18n();
  const maxValue = getMaxValue(items, "total");

  if (items.length === 0) {
    return (
      <motion.div {...fadeUp}>
        <EmptyState
          title={t("charts.insufficientHistoryTitle")}
          description={t("charts.insufficientHistoryDescription")}
        />
      </motion.div>
    );
  }

  return (
    <motion.div
      className="bar-chart"
      variants={quickStagger}
      initial="initial"
      animate="animate"
    >
      {items.map((item) => {
        const width = maxValue > 0 ? `${(item.total / maxValue) * 100}%` : "0%";

        return (
          <motion.div {...fadeScale} className="bar-row" key={item.month}>
            <div className="bar-row__label">
              <span>{formatMonthLabel(item.month, language)}</span>
              <strong>{formatCurrency(item.total, language)}</strong>
            </div>
            <div className="bar-track" aria-hidden="true">
              <div
                className="bar-fill"
                style={{
                  width,
                  background:
                    "linear-gradient(90deg, #23404a 0%, #f3a652 100%)",
                }}
              />
            </div>
          </motion.div>
        );
      })}
    </motion.div>
  );
}

export default BarChart;
