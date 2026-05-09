import { getMonthKey, sortByDateDescending } from "./date.js";

export function calculateMonthlySummary(expenses, selectedMonth) {
  const items = sortByDateDescending(
    expenses.filter((expense) => getMonthKey(expense.date) === selectedMonth),
  );
  const total = items.reduce((sum, expense) => sum + expense.amount, 0);
  const average = items.length > 0 ? total / items.length : 0;

  return {
    items,
    total,
    average,
    count: items.length,
  };
}

export function getCategoryBreakdown(expenses) {
  const categoryTotals = expenses.reduce((accumulator, expense) => {
    accumulator[expense.category] =
      (accumulator[expense.category] ?? 0) + expense.amount;
    return accumulator;
  }, {});

  const total = expenses.reduce((sum, expense) => sum + expense.amount, 0);

  return Object.entries(categoryTotals)
    .map(([category, amount]) => ({
      category,
      amount,
      percentage: total > 0 ? (amount / total) * 100 : 0,
    }))
    .sort((firstEntry, secondEntry) => secondEntry.amount - firstEntry.amount);
}

export function buildMonthlyTotals(expenses) {
  const totalsByMonth = expenses.reduce((accumulator, expense) => {
    const monthKey = getMonthKey(expense.date);
    accumulator[monthKey] = (accumulator[monthKey] ?? 0) + expense.amount;
    return accumulator;
  }, {});

  return Object.entries(totalsByMonth)
    .map(([month, total]) => ({ month, total }))
    .sort((firstEntry, secondEntry) =>
      firstEntry.month.localeCompare(secondEntry.month),
    )
    .slice(-6);
}

export function buildSpendingPlan(categoryBreakdown, monthlyBudgets) {
  const categoryIds = new Set([
    ...Object.keys(monthlyBudgets),
    ...categoryBreakdown.map((entry) => entry.category),
  ]);

  const byCategory = new Map(
    categoryBreakdown.map((entry) => [entry.category, entry]),
  );

  const entries = [...categoryIds].map((category) => {
    const spent = byCategory.get(category)?.amount ?? 0;
    const budget = monthlyBudgets[category] ?? 0;
    const remaining = budget - spent;
    const percentageUsed = budget > 0 ? (spent / budget) * 100 : 0;

    return {
      category,
      spent,
      budget,
      remaining,
      percentageUsed,
      isOverBudget: budget > 0 && spent > budget,
    };
  });

  const totalBudget = entries.reduce((sum, entry) => sum + entry.budget, 0);
  const totalSpent = entries.reduce((sum, entry) => sum + entry.spent, 0);

  return {
    entries,
    totalBudget,
    totalSpent,
    remaining: totalBudget - totalSpent,
    overBudgetCount: entries.filter((entry) => entry.isOverBudget).length,
    usagePercentage: totalBudget > 0 ? (totalSpent / totalBudget) * 100 : 0,
  };
}

export function getTopCategory(categoryBreakdown) {
  return categoryBreakdown[0] ?? null;
}

export function getMaxValue(items, key) {
  return items.reduce((maxValue, item) => Math.max(maxValue, item[key]), 0);
}
