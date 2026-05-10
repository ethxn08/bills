import { addDays, addMonths, addWeeks, getTodayDateKey } from "./date.js";

const RECURRING_ID_SEPARATOR = "::";

export function normalizeExpense(expense) {
  return {
    ...expense,
    repeat: expense.repeat ?? "never",
    recurrenceExclusions: Array.isArray(expense.recurrenceExclusions)
      ? expense.recurrenceExclusions
      : [],
  };
}

export function excludeOccurrence(expense, occurrenceDate) {
  if (expense.recurrenceExclusions.includes(occurrenceDate)) {
    return expense;
  }

  return {
    ...expense,
    recurrenceExclusions: [...expense.recurrenceExclusions, occurrenceDate],
  };
}

export function createStandaloneExpense(expense, fallbackDate) {
  return normalizeExpense({
    ...expense,
    id: crypto.randomUUID(),
    date: expense.date ?? fallbackDate,
    repeat: "never",
    recurrenceExclusions: [],
  });
}

export function findRecurringOccurrence(expenses, expenseId) {
  const parsedRecurringExpenseId = parseRecurringExpenseId(expenseId);

  if (parsedRecurringExpenseId) {
    return parsedRecurringExpenseId;
  }

  const matchingExpense = expenses.find((expense) => expense.id === expenseId);

  if (!matchingExpense || matchingExpense.repeat === "never") {
    return null;
  }

  return {
    sourceExpenseId: matchingExpense.id,
    occurrenceDate: matchingExpense.date,
  };
}

export function expandRecurringExpenses(expenses, endDate = getTodayDateKey()) {
  return expenses.flatMap((expense) => {
    const normalizedExpense = normalizeExpense(expense);

    if (normalizedExpense.repeat === "never") {
      return [normalizedExpense];
    }

    const exclusions = new Set(normalizedExpense.recurrenceExclusions);
    const occurrences = [];
    const expansionEndDate =
      normalizedExpense.date > endDate ? normalizedExpense.date : endDate;
    let occurrenceDate = normalizedExpense.date;

    while (occurrenceDate && occurrenceDate <= expansionEndDate) {
      if (!exclusions.has(occurrenceDate)) {
        occurrences.push({
          ...normalizedExpense,
          id:
            occurrenceDate === normalizedExpense.date
              ? normalizedExpense.id
              : buildRecurringExpenseId(normalizedExpense.id, occurrenceDate),
          sourceExpenseId: normalizedExpense.id,
          originalDate: occurrenceDate,
          date: occurrenceDate,
          isRecurringExpense: true,
        });
      }

      occurrenceDate = getNextRecurringDate(
        occurrenceDate,
        normalizedExpense.repeat,
      );
    }

    return occurrences;
  });
}

function buildRecurringExpenseId(sourceExpenseId, occurrenceDate) {
  return `${sourceExpenseId}${RECURRING_ID_SEPARATOR}${occurrenceDate}`;
}

function parseRecurringExpenseId(expenseId) {
  const separatorIndex = expenseId.indexOf(RECURRING_ID_SEPARATOR);

  if (separatorIndex === -1) {
    return null;
  }

  return {
    sourceExpenseId: expenseId.slice(0, separatorIndex),
    occurrenceDate: expenseId.slice(
      separatorIndex + RECURRING_ID_SEPARATOR.length,
    ),
  };
}

function getNextRecurringDate(dateString, repeat) {
  switch (repeat) {
    case "daily":
      return addDays(dateString, 1);
    case "weekly":
      return addWeeks(dateString, 1);
    case "monthly":
      return addMonths(dateString, 1);
    default:
      return null;
  }
}
