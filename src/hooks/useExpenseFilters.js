import { useMemo, useState } from "react";

const DEFAULT_FILTERS = {
  category: "all",
  sortBy: "date-desc",
};

export function useExpenseFilters(expenses) {
  const [filters, setFilters] = useState(DEFAULT_FILTERS);

  const filteredExpenses = useMemo(() => {
    const visibleExpenses = expenses.filter((expense) => {
      const matchesCategory =
        filters.category === "all" || expense.category === filters.category;

      return matchesCategory;
    });

    return [...visibleExpenses].sort((firstExpense, secondExpense) => {
      switch (filters.sortBy) {
        case "date-asc":
          return firstExpense.date.localeCompare(secondExpense.date);
        case "amount-desc":
          return secondExpense.amount - firstExpense.amount;
        case "amount-asc":
          return firstExpense.amount - secondExpense.amount;
        case "date-desc":
        default:
          return secondExpense.date.localeCompare(firstExpense.date);
      }
    });
  }, [expenses, filters.category, filters.sortBy]);

  return {
    filters,
    filteredExpenses,
    setCategory: (category) => {
      setFilters((currentFilters) => ({ ...currentFilters, category }));
    },
    setSortBy: (sortBy) => {
      setFilters((currentFilters) => ({ ...currentFilters, sortBy }));
    },
    resetFilters: () => {
      setFilters(DEFAULT_FILTERS);
    },
    hasActiveFilters:
      filters.category !== DEFAULT_FILTERS.category ||
      filters.sortBy !== DEFAULT_FILTERS.sortBy,
  };
}
