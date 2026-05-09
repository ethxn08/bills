import { motion } from "motion/react";
import EmptyState from "./EmptyState.jsx";
import LocalizedText from "./LocalizedText.jsx";
import { useI18n } from "../hooks/useI18n.js";
import { formatCurrency } from "../utils/currency.js";
import { fadeScale, fadeUp, quickStagger } from "../utils/motion.js";

function formatDelta(delta, language) {
  const formattedDelta = formatCurrency(delta, language);

  if (delta > 0) {
    return `+${formattedDelta}`;
  }

  return formattedDelta;
}

function InsightsPanel({
  average,
  count,
  monthlyTrend,
  topCategory,
  total,
  spendingPlan,
}) {
  const { language, t } = useI18n();

  if (count === 0) {
    return (
      <motion.div {...fadeUp}>
        <EmptyState
          title={t("insights.emptyTitle")}
          description={t("insights.emptyDescription")}
        />
      </motion.div>
    );
  }

  const currentMonth = monthlyTrend.at(-1);
  const previousMonth = monthlyTrend.at(-2);
  const hasMonthlyComparison = Boolean(currentMonth && previousMonth);
  const monthlyDelta = hasMonthlyComparison
    ? currentMonth.total - previousMonth.total
    : 0;
  const monthlyDeltaTone =
    monthlyDelta > 0
      ? "insight-tile--alert"
      : monthlyDelta < 0
        ? "insight-tile--positive"
        : "";

  return (
    <motion.div
      className="insight-grid"
      variants={quickStagger}
      initial="initial"
      animate="animate"
    >
      <motion.article {...fadeScale} className="insight-tile">
        <LocalizedText text={t("insights.totalMonth")} />
        <strong>{formatCurrency(total, language)}</strong>
      </motion.article>
      <motion.article
        {...fadeScale}
        className={`insight-tile ${monthlyDeltaTone}`.trim()}
      >
        <LocalizedText text={t("insights.variationVsPrevious")} />
        <strong>
          {hasMonthlyComparison ? (
            formatDelta(monthlyDelta, language)
          ) : (
            <LocalizedText text={t("insights.noReference")} />
          )}
        </strong>
      </motion.article>
      <motion.article {...fadeScale} className="insight-tile">
        <LocalizedText text={t("insights.movementCount")} />
        <strong>{count}</strong>
      </motion.article>
      <motion.article {...fadeScale} className="insight-tile">
        <LocalizedText text={t("insights.topCategory")} />
        <strong>
          <LocalizedText
            text={
              topCategory ? topCategory.label : t("insights.noDominantCategory")
            }
          />
        </strong>
        <small>
          {topCategory ? (
            <LocalizedText
              text={`${topCategory.percentage.toFixed(1)}% · ${formatCurrency(topCategory.amount, language)}`}
              width="18ch"
            />
          ) : (
            <LocalizedText
              text={t("insights.registeredThisMonth", { count })}
            />
          )}
        </small>
      </motion.article>
      <motion.article {...fadeScale} className="insight-tile">
        <LocalizedText text={t("insights.averagePerMovement")} />
        <strong>{formatCurrency(average, language)}</strong>
        <small>
          {spendingPlan.totalBudget > 0 ? (
            <LocalizedText
              text={t("insights.remainingBudget", {
                amount: formatCurrency(spendingPlan.remaining, language),
              })}
            />
          ) : (
            <LocalizedText text={t("insights.noBudget")} />
          )}
        </small>
      </motion.article>
    </motion.div>
  );
}

export default InsightsPanel;
