import { motion } from "motion/react";
import BarChart from "../components/BarChart.jsx";
import BudgetStatusList from "../components/BudgetStatusList.jsx";
import CategoryChart from "../components/CategoryChart.jsx";
import CollapsiblePanel from "../components/CollapsiblePanel.jsx";
import InsightsPanel from "../components/InsightsPanel.jsx";
import { useI18n } from "../hooks/useI18n.js";
import { useExpenseMetrics } from "../hooks/useExpenseMetrics.js";
import { useExpensesContext } from "../hooks/useExpensesContext.js";
import { fadeUp, staggerContainer } from "../utils/motion.js";

function AnalyticsPage() {
  const { budgets, expenses, language, selectedMonth, warningThreshold } =
    useExpensesContext();
  const { t } = useI18n();
  const metrics = useExpenseMetrics(
    expenses,
    selectedMonth,
    budgets,
    warningThreshold,
    language,
  );

  return (
    <motion.section
      className="analytics-layout"
      variants={staggerContainer}
      initial="initial"
      animate="animate"
    >
      <CollapsiblePanel
        className="chart-card"
        title={t("analyticsPage.trendTitle")}
        subtitle={t("analyticsPage.trendSubtitle")}
        variants={fadeUp}
      >
        <BarChart items={metrics.monthlyTrend} />
      </CollapsiblePanel>

      <CollapsiblePanel
        className="chart-card"
        title={t("analyticsPage.categoryTitle")}
        subtitle={t("analyticsPage.categorySubtitle")}
        variants={fadeUp}
      >
        <CategoryChart items={metrics.categoryBreakdown} />
      </CollapsiblePanel>

      <CollapsiblePanel
        title={t("analyticsPage.insightsTitle")}
        subtitle={t("analyticsPage.insightsSubtitle")}
        variants={fadeUp}
      >
        <InsightsPanel
          total={metrics.total}
          average={metrics.average}
          count={metrics.count}
          topCategory={metrics.topCategory}
          monthlyTrend={metrics.monthlyTrend}
          spendingPlan={metrics.spendingPlan}
        />
      </CollapsiblePanel>

      <CollapsiblePanel
        className="chart-card"
        title={t("analyticsPage.budgetTitle")}
        subtitle={t("analyticsPage.budgetSubtitle")}
        variants={fadeUp}
      >
        <BudgetStatusList items={metrics.spendingPlan.entries} />
      </CollapsiblePanel>
    </motion.section>
  );
}

export default AnalyticsPage;
