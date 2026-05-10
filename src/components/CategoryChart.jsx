import { motion } from "motion/react";
import EmptyState from "./EmptyState.jsx";
import { useI18n } from "../hooks/useI18n.js";
import { formatCurrency } from "../utils/currency.js";
import { fadeScale, fadeUp, quickStagger } from "../utils/motion.js";

const DONUT_RADIUS = 66;
const DONUT_CIRCUMFERENCE = 2 * Math.PI * DONUT_RADIUS;

function getDonutSegments(items) {
  let offset = 0;
  let elapsed = 0.1;

  return items.map((item) => {
    const segmentLength = (item.percentage / 100) * DONUT_CIRCUMFERENCE;
    const duration = Math.max(
      0.28,
      Math.min(0.62, 0.24 + item.percentage * 0.006),
    );
    const segment = {
      ...item,
      segmentLength,
      strokeDasharray: `${segmentLength} ${DONUT_CIRCUMFERENCE - segmentLength}`,
      strokeDashoffset: -offset,
      transition: {
        duration,
        delay: elapsed,
        ease: "linear",
      },
    };

    offset += segmentLength;
    elapsed += duration + 0.02;
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
              <motion.circle
                key={item.category}
                className="category-chart__segment"
                cx="90"
                cy="90"
                r={DONUT_RADIUS}
                stroke={item.color}
                strokeDashoffset={item.strokeDashoffset}
                initial={{
                  opacity: 0,
                  strokeDasharray: `0 ${DONUT_CIRCUMFERENCE}`,
                }}
                animate={{
                  opacity: 1,
                  strokeDasharray: item.strokeDasharray,
                }}
                transition={{
                  strokeDasharray: item.transition,
                  opacity: {
                    duration: 0.14,
                    delay: item.transition.delay,
                    ease: "easeOut",
                  },
                }}
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
