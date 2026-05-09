import EmptyState from "./EmptyState.jsx";
import LocalizedText from "./LocalizedText.jsx";
import { useI18n } from "../hooks/useI18n.js";
import { formatCurrency } from "../utils/currency.js";

function SummaryCards({ total, average, count, topCategory, totalBudget }) {
  const { language, t } = useI18n();

  if (count === 0) {
    return (
      <EmptyState
        title={t("summary.emptyTitle")}
        description={t("summary.emptyDescription")}
      />
    );
  }

  return (
    <div className="summary-grid">
      <article className="summary-card">
        <LocalizedText text={t("summary.monthlyTotal")} />
        <strong>{formatCurrency(total, language)}</strong>
      </article>
      <article className="summary-card">
        <LocalizedText text={t("summary.averagePerExpense")} />
        <strong>{formatCurrency(average, language)}</strong>
      </article>
      <article className="summary-card">
        <LocalizedText text={t("summary.movementCount")} />
        <strong>{count}</strong>
      </article>
      <article className="summary-card">
        <LocalizedText text={t("summary.dominantCategory")} />
        <strong>
          <LocalizedText
            text={topCategory ? topCategory.label : t("summary.noData")}
          />
        </strong>
      </article>
      <article className="summary-card">
        <LocalizedText text={t("summary.monthBudget")} />
        <strong>{formatCurrency(totalBudget, language)}</strong>
      </article>
    </div>
  );
}

export default SummaryCards;
