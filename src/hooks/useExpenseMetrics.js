import { useMemo } from "react";
import { CATEGORY_MAP, CATEGORIES } from "../data/categories.js";
import { getCategoryLabel } from "../i18n/translations.js";
import {
  buildMonthlyTotals,
  buildSpendingPlan,
  calculateMonthlySummary,
  getCategoryBreakdown,
  getTopCategory,
} from "../utils/expenseAnalytics.js";

export function useExpenseMetrics(
  expenses,
  selectedMonth,
  budgets = {},
  warningThreshold = 85,
  language = "es",
) {
  return useMemo(() => {
    const monthlySummary = calculateMonthlySummary(expenses, selectedMonth);
    const categoryBreakdown = getCategoryBreakdown(monthlySummary.items);
    const monthlyTrend = buildMonthlyTotals(expenses);
    const topCategory = getTopCategory(categoryBreakdown);
    const monthlyBudgets = budgets[selectedMonth] ?? {};
    const spendingPlan = buildSpendingPlan(categoryBreakdown, monthlyBudgets);
    const overBudgetEntries = spendingPlan.entries.filter(
      (entry) => entry.isOverBudget,
    );
    const nearBudgetEntries = spendingPlan.entries.filter(
      (entry) =>
        entry.budget > 0 &&
        !entry.isOverBudget &&
        entry.percentageUsed >= warningThreshold,
    );
    const overBudgetTotal = overBudgetEntries.reduce(
      (sum, entry) => sum + Math.abs(entry.remaining),
      0,
    );
    const nearBudgetCount = nearBudgetEntries.length;

    return {
      ...monthlySummary,
      categoryBreakdown: categoryBreakdown.map((entry) => ({
        ...entry,
        color: CATEGORY_MAP[entry.category]?.color ?? "#6b7280",
        label: getCategoryLabel(entry.category, language),
      })),
      monthlyTrend,
      monthlyBudgets,
      spendingPlan,
      overBudgetEntries,
      nearBudgetEntries,
      overBudgetTotal,
      nearBudgetCount,
      warningThreshold,
      hasOverBudgetAlert: overBudgetEntries.length > 0,
      hasNearBudgetAlert: nearBudgetEntries.length > 0,
      topCategory:
        topCategory && CATEGORY_MAP[topCategory.category]
          ? {
              ...topCategory,
              color: CATEGORY_MAP[topCategory.category].color,
              label: getCategoryLabel(topCategory.category, language),
            }
          : null,
      categoriesCount: CATEGORIES.length,
    };
  }, [budgets, expenses, language, selectedMonth, warningThreshold]);
}
