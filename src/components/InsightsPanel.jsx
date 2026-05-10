import { motion } from "motion/react";
import EmptyState from "./EmptyState.jsx";
import LocalizedText from "./LocalizedText.jsx";
import { useI18n } from "../hooks/useI18n.js";
import { formatCurrency } from "../utils/currency.js";
import { formatMonthLabel } from "../utils/date.js";
import { fadeScale, fadeUp, quickStagger } from "../utils/motion.js";

function formatDelta(delta, language) {
  const formattedDelta = formatCurrency(delta, language);

  if (delta > 0) {
    return `+${formattedDelta}`;
  }

  return formattedDelta;
}

function InsightsPanel({
  count,
  monthlyTrend,
  total,
  selectedMonth,
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
  const categoriesWithBudget = spendingPlan.entries.filter(
    (entry) => entry.budget > 0,
  );
  const categoriesNearLimit = categoriesWithBudget.filter(
    (entry) => !entry.isOverBudget && entry.percentageUsed >= 85,
  );
  const categoriesOverBudget = spendingPlan.entries.filter(
    (entry) => entry.isOverBudget,
  );
  const busiestMonth = monthlyTrend.reduce(
    (currentPeak, month) =>
      !currentPeak || month.total > currentPeak.total ? month : currentPeak,
    null,
  );
  const monthDate = new Date(`${selectedMonth}-01T12:00:00`);
  const daysInMonth = new Date(
    monthDate.getFullYear(),
    monthDate.getMonth() + 1,
    0,
  ).getDate();
  const today = new Date();
  const isCurrentMonth = selectedMonth === today.toISOString().slice(0, 7);
  const elapsedDays = isCurrentMonth
    ? Math.min(today.getDate(), daysInMonth)
    : daysInMonth;
  const projectedTotal =
    elapsedDays > 0 ? (total / elapsedDays) * daysInMonth : 0;
  const projectionDelta = projectedTotal - total;
  const projectionTone =
    projectionDelta > 0
      ? "insight-tile--alert"
      : projectionDelta < 0
        ? "insight-tile--positive"
        : "";

  return (
    <motion.div
      className="insight-grid"
      variants={quickStagger}
      initial="initial"
      animate="animate"
    >
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
        <small>
          {hasMonthlyComparison ? (
            <LocalizedText
              text={t("insights.previousMonthTotal", {
                amount: formatCurrency(previousMonth.total, language),
              })}
            />
          ) : null}
        </small>
      </motion.article>
      <motion.article {...fadeScale} className="insight-tile">
        <LocalizedText text={t("insights.projectedClose")} />
        <strong>{formatCurrency(projectedTotal, language)}</strong>
        <small>
          <LocalizedText
            text={
              isCurrentMonth
                ? t("insights.projectedDelta", {
                    amount: formatDelta(projectionDelta, language),
                  })
                : t("insights.closedMonth")
            }
          />
        </small>
      </motion.article>
      <motion.article
        {...fadeScale}
        className={`insight-tile ${projectionTone}`.trim()}
      >
        <LocalizedText text={t("insights.budgetPressure")} />
        <strong>
          <LocalizedText
            text={t("insights.budgetPressureValue", {
              over: categoriesOverBudget.length,
              near: categoriesNearLimit.length,
            })}
          />
        </strong>
        <small>
          {categoriesWithBudget.length > 0 ? (
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
      <motion.article {...fadeScale} className="insight-tile">
        <LocalizedText text={t("insights.peakMonth")} />
        <strong>
          {busiestMonth
            ? formatMonthLabel(busiestMonth.month, language)
            : t("insights.noReference")}
        </strong>
        <small>
          {busiestMonth ? (
            <LocalizedText
              text={t("insights.peakMonthAmount", {
                amount: formatCurrency(busiestMonth.total, language),
              })}
            />
          ) : (
            <LocalizedText text={t("insights.noReference")} />
          )}
        </small>
      </motion.article>
      <motion.article {...fadeScale} className="insight-tile">
        <LocalizedText text={t("insights.movementDensity")} />
        <strong>
          <LocalizedText
            text={t("insights.movementsPerDay", {
              value: (count / daysInMonth).toFixed(1),
            })}
          />
        </strong>
        <small>
          <LocalizedText text={t("insights.registeredThisMonth", { count })} />
        </small>
      </motion.article>
    </motion.div>
  );
}

export default InsightsPanel;
