import { motion } from "motion/react";
import EmptyState from "./EmptyState.jsx";
import { useI18n } from "../hooks/useI18n.js";
import { formatCurrency } from "../utils/currency.js";
import { fadeScale, fadeUp, quickStagger } from "../utils/motion.js";

const DONUT_RADIUS = 66;
const DONUT_CIRCUMFERENCE = 2 * Math.PI * DONUT_RADIUS;

function getDonutSegments(items) {
  let offset = 0;

  return items.map((item) => {
    const segmentLength = (item.percentage / 100) * DONUT_CIRCUMFERENCE;
    const segment = {
      ...item,
      strokeDasharray: `${segmentLength} ${DONUT_CIRCUMFERENCE - segmentLength}`,
      strokeDashoffset: -offset,
    };

    offset += segmentLength;
    return segment;
  });
}

function CategoryChart({ items }) {
  const { language, t } = useI18n();

  if (items.length === 0) {
    return (
      <motion.div {...fadeUp}>
        <EmptyState
          title={t("charts.noCategoryBreakdownTitle")}
          description={t("charts.noCategoryBreakdownDescription")}
        />
      </motion.div>
    );
  }

  const total = items.reduce((sum, item) => sum + item.amount, 0);
  const segments = getDonutSegments(items);

  return (
    <motion.div
      className="category-chart"
      variants={quickStagger}
      initial="initial"
      animate="animate"
    >
      <motion.div {...fadeScale} className="category-chart__donut-wrap">
        <div className="category-chart__donut" aria-hidden="true">
          <svg viewBox="0 0 180 180" className="category-chart__svg">
            <circle
              className="category-chart__track"
              cx="90"
              cy="90"
              r={DONUT_RADIUS}
            />
            {segments.map((item) => (
              <circle
                key={item.category}
                className="category-chart__segment"
                cx="90"
                cy="90"
                r={DONUT_RADIUS}
                stroke={item.color}
                strokeDasharray={item.strokeDasharray}
                strokeDashoffset={item.strokeDashoffset}
              />
            ))}
          </svg>

          <div className="category-chart__center">
            <span>{t("charts.monthTotal")}</span>
            <strong>{formatCurrency(total, language)}</strong>
          </div>
        </div>
      </motion.div>

      <div className="category-chart__legend" role="list">
        {items.map((item) => (
          <motion.div
            {...fadeScale}
            className="category-chart__legend-item"
            key={item.category}
            role="listitem"
          >
            <div className="category-chart__legend-main">
              <span
                className="category-chart__swatch"
                style={{ background: item.color }}
                aria-hidden="true"
              />
              <div>
                <strong>{item.label}</strong>
                <span>
                  {t("charts.ofTotal", { value: item.percentage.toFixed(1) })}
                </span>
              </div>
            </div>
            <strong>{formatCurrency(item.amount, language)}</strong>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}

export default CategoryChart;
