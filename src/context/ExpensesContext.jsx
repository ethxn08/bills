import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { ExpensesContext } from "./expensesContextObject.js";
import { getCurrentMonthKey } from "../utils/date.js";
import {
  createStandaloneExpense,
  excludeOccurrence,
  expandRecurringExpenses,
  findRecurringOccurrence,
  normalizeExpense,
} from "../utils/recurringExpenses.js";

const STORAGE_KEY = "bills.expenses";
const BUDGETS_STORAGE_KEY = "bills.budgets";
const WARNING_THRESHOLD_STORAGE_KEY = "bills.warning-threshold";
const LANGUAGE_STORAGE_KEY = "bills.language";
const EMPTY_EXPENSES = [];
const EMPTY_BUDGETS = {};

function getInitialExpenses() {
  const storedExpenses = window.localStorage.getItem(STORAGE_KEY);

  if (!storedExpenses) {
    return EMPTY_EXPENSES;
  }

  try {
    const parsedExpenses = JSON.parse(storedExpenses);

    return Array.isArray(parsedExpenses) ? parsedExpenses : EMPTY_EXPENSES;
  } catch {
    return EMPTY_EXPENSES;
  }
}

function getInitialBudgets() {
  const storedBudgets = window.localStorage.getItem(BUDGETS_STORAGE_KEY);

  if (!storedBudgets) {
    return EMPTY_BUDGETS;
  }

  try {
    const parsedBudgets = JSON.parse(storedBudgets);

    return parsedBudgets && typeof parsedBudgets === "object"
      ? parsedBudgets
      : EMPTY_BUDGETS;
  } catch {
    return EMPTY_BUDGETS;
  }
}

function getInitialWarningThreshold() {
  const storedThreshold = window.localStorage.getItem(
    WARNING_THRESHOLD_STORAGE_KEY,
  );

  if (!storedThreshold) {
    return 85;
  }

  const parsedThreshold = Number(storedThreshold);

  return Number.isFinite(parsedThreshold) ? parsedThreshold : 85;
}

function getInitialLanguage() {
  const storedLanguage = window.localStorage.getItem(LANGUAGE_STORAGE_KEY);

  return storedLanguage === "en" ? "en" : "es";
}

export function ExpensesProvider({ children }) {
  const [storedExpenses, setStoredExpenses] = useState([]);
  const [budgets, setBudgets] = useState({});
  const [language, setLanguageState] = useState("es");
  const [warningThreshold, setWarningThreshold] = useState(85);
  const [selectedMonth, setSelectedMonth] = useState(getCurrentMonthKey());
  const [isHydrating, setIsHydrating] = useState(true);
  const [isLanguageChanging, setIsLanguageChanging] = useState(false);
  const languageApplyTimeoutRef = useRef(null);
  const languageTransitionTimeoutRef = useRef(null);

  useEffect(() => {
    const nextExpenses = getInitialExpenses();
    const nextBudgets = getInitialBudgets();
    const nextLanguage = getInitialLanguage();
    const nextWarningThreshold = getInitialWarningThreshold();
    const hydrationDelay = window.setTimeout(() => {
      setStoredExpenses(nextExpenses.map(normalizeExpense));
      setBudgets(nextBudgets);
      setLanguageState(nextLanguage);
      setWarningThreshold(nextWarningThreshold);
      setIsHydrating(false);
    }, 1400);

    return () => {
      window.clearTimeout(hydrationDelay);
    };
  }, []);

  useEffect(() => {
    if (isHydrating) {
      return;
    }

    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(storedExpenses));
  }, [storedExpenses, isHydrating]);

  useEffect(() => {
    if (isHydrating) {
      return;
    }

    window.localStorage.setItem(BUDGETS_STORAGE_KEY, JSON.stringify(budgets));
  }, [budgets, isHydrating]);

  useEffect(() => {
    if (isHydrating) {
      return;
    }

    window.localStorage.setItem(LANGUAGE_STORAGE_KEY, language);
  }, [isHydrating, language]);

  const setLanguage = useCallback(
    (nextLanguage) => {
      if (nextLanguage === language) {
        return;
      }

      window.clearTimeout(languageApplyTimeoutRef.current);
      window.clearTimeout(languageTransitionTimeoutRef.current);

      setIsLanguageChanging(true);

      languageApplyTimeoutRef.current = window.setTimeout(() => {
        setLanguageState(nextLanguage);
      }, 80);

      languageTransitionTimeoutRef.current = window.setTimeout(() => {
        setIsLanguageChanging(false);
      }, 520);
    },
    [language],
  );

  useEffect(() => {
    return () => {
      window.clearTimeout(languageApplyTimeoutRef.current);
      window.clearTimeout(languageTransitionTimeoutRef.current);
    };
  }, []);

  useEffect(() => {
    if (isHydrating) {
      return;
    }

    window.localStorage.setItem(
      WARNING_THRESHOLD_STORAGE_KEY,
      String(warningThreshold),
    );
  }, [isHydrating, warningThreshold]);

  const expenses = useMemo(
    () => expandRecurringExpenses(storedExpenses),
    [storedExpenses],
  );

  const value = useMemo(
    () => ({
      expenses,
      budgets,
      isHydrating,
      isLanguageChanging,
      language,
      setLanguage,
      warningThreshold,
      selectedMonth,
      setSelectedMonth,
      setWarningThreshold,
      addExpense: (expense) => {
        setStoredExpenses((currentExpenses) => [
          normalizeExpense(expense),
          ...currentExpenses,
        ]);
      },
      updateExpense: (expenseId, updatedExpense) => {
        setStoredExpenses((currentExpenses) => {
          const normalizedExpenses = currentExpenses.map(normalizeExpense);
          const recurringOccurrence = findRecurringOccurrence(
            normalizedExpenses,
            expenseId,
          );

          if (!recurringOccurrence) {
            return normalizedExpenses.map((expense) =>
              expense.id === expenseId
                ? normalizeExpense({ ...expense, ...updatedExpense })
                : expense,
            );
          }

          const { sourceExpenseId, occurrenceDate } = recurringOccurrence;

          return normalizedExpenses.flatMap((expense) => {
            if (expense.id !== sourceExpenseId) {
              return [expense];
            }

            return [
              createStandaloneExpense(updatedExpense, occurrenceDate),
              excludeOccurrence(expense, occurrenceDate),
            ];
          });
        });
      },
      deleteExpense: (expenseId) => {
        setStoredExpenses((currentExpenses) => {
          const normalizedExpenses = currentExpenses.map(normalizeExpense);
          const recurringOccurrence = findRecurringOccurrence(
            normalizedExpenses,
            expenseId,
          );

          if (!recurringOccurrence) {
            return normalizedExpenses.filter(
              (expense) => expense.id !== expenseId,
            );
          }

          const { sourceExpenseId, occurrenceDate } = recurringOccurrence;

          return normalizedExpenses.map((expense) =>
            expense.id === sourceExpenseId
              ? excludeOccurrence(expense, occurrenceDate)
              : expense,
          );
        });
      },
      setMonthlyBudget: (monthKey, category, amount) => {
        setBudgets((currentBudgets) => ({
          ...currentBudgets,
          [monthKey]: {
            ...(currentBudgets[monthKey] ?? {}),
            [category]: amount,
          },
        }));
      },
    }),
    [
      budgets,
      expenses,
      isHydrating,
      isLanguageChanging,
      language,
      setLanguage,
      selectedMonth,
      storedExpenses,
      warningThreshold,
    ],
  );

  return (
    <ExpensesContext.Provider value={value}>
      {children}
    </ExpensesContext.Provider>
  );
}
