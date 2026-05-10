import { motion } from "motion/react";
import { useI18n } from "../hooks/useI18n.js";
import { formatCurrency } from "../utils/currency.js";

const DONUT_RADIUS = 52;
const DONUT_CIRCUMFERENCE = 2 * Math.PI * DONUT_RADIUS;

function getSegments(items) {
  let offset = 0;
  let elapsed = 0.08;

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

function HeroDonutChart({ items, total }) {
  const { language, t } = useI18n();
  const segments = getSegments(items);
  const topCategory = items[0] ?? null;
  const remainingCategories = Math.max(items.length - 1, 0);

  return (
    <div className="hero-donut" aria-label={t("charts.monthTotal")}>
      <div className="hero-donut__chart" aria-hidden="true">
        <svg viewBox="0 0 144 144" className="hero-donut__svg">
          <circle
            className="hero-donut__track"
            cx="72"
            cy="72"
            r={DONUT_RADIUS}
          />
          {segments.map((item) => (
            <motion.circle
              key={item.category}
              className="hero-donut__segment"
              cx="72"
              cy="72"
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

        <div className="hero-donut__center">
          <span>{t("charts.monthTotal")}</span>
          <strong>{formatCurrency(total, language)}</strong>
        </div>
      </div>

      <div className="hero-donut__summary" role="list">
        <div className="hero-donut__summary-pill" role="listitem">
          <span
            className="hero-donut__legend-swatch"
            style={{ backgroundColor: topCategory?.color }}
            aria-hidden="true"
          />
          <div className="hero-donut__summary-copy">
            <strong>{topCategory ? topCategory.label : "-"}</strong>
            <span>
              {topCategory
                ? t("charts.ofTotal", {
                    value: topCategory.percentage.toFixed(1),
                  })
                : t("charts.ofTotal", { value: "0.0" })}
            </span>
          </div>
        </div>

        {remainingCategories > 0 ? (
          <div
            className="hero-donut__summary-pill hero-donut__summary-pill--muted"
            role="listitem"
          >
            <strong>+{remainingCategories}</strong>
            <span>
              {remainingCategories === 1 ? "categoria" : "categorias"}
            </span>
          </div>
        ) : null}
      </div>
    </div>
  );
}

export default HeroDonutChart;
