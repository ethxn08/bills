import { useEffect, useMemo, useState } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "motion/react";
import { HiOutlineChevronDown, HiOutlineChevronUp } from "react-icons/hi2";
import BudgetPlanner from "../components/BudgetPlanner.jsx";
import BudgetAlerts from "../components/BudgetAlerts.jsx";
import CollapsiblePanel from "../components/CollapsiblePanel.jsx";
import ConfirmDialog from "../components/ConfirmDialog.jsx";
import ExpenseComposerModal from "../components/ExpenseComposerModal.jsx";
import ExpenseFilters from "../components/ExpenseFilters.jsx";
import ExpenseList from "../components/ExpenseList.jsx";
import FloatingActionMenu from "../components/FloatingActionMenu.jsx";
import MonthSelector from "../components/MonthSelector.jsx";
import OptionsModal from "../components/OptionsModal.jsx";
import RecurringQuickActionsPanel from "../components/RecurringQuickActionsPanel.jsx";
import { useExpenseFilters } from "../hooks/useExpenseFilters.js";
import { useI18n } from "../hooks/useI18n.js";
import { useExpenseMetrics } from "../hooks/useExpenseMetrics.js";
import { useExpensesContext } from "../hooks/useExpensesContext.js";
import { getMonthKey } from "../utils/date.js";
import { fadeScale, fadeUp, staggerContainer } from "../utils/motion.js";

const EXPENSES_STORAGE_KEY = "bills.expenses";
const BUDGETS_STORAGE_KEY = "bills.budgets";
const LANGUAGE_STORAGE_KEY = "bills.language";
const WARNING_THRESHOLD_STORAGE_KEY = "bills.warning-threshold";

function ExpensesPage() {
  const [editingExpense, setEditingExpense] = useState(null);
  const [composerDraft, setComposerDraft] = useState(null);
  const [isActionMenuOpen, setIsActionMenuOpen] = useState(false);
  const [isComposerOpen, setIsComposerOpen] = useState(false);
  const [isBudgetPlannerOpen, setIsBudgetPlannerOpen] = useState(false);
  const [isOptionsOpen, setIsOptionsOpen] = useState(false);
  const [isLogoutConfirmOpen, setIsLogoutConfirmOpen] = useState(false);
  const [pendingDeleteExpenseId, setPendingDeleteExpenseId] = useState(null);
  const {
    expenses,
    addExpense,
    budgets,
    deleteExpense,
    language,
    selectedMonth,
    setLanguage,
    setMonthlyBudget,
    setSelectedMonth,
    setWarningThreshold,
    updateExpense,
    warningThreshold,
  } = useExpensesContext();
  const { t } = useI18n();
  const metrics = useExpenseMetrics(
    expenses,
    selectedMonth,
    budgets,
    warningThreshold,
    language,
  );
  const {
    filters,
    filteredExpenses,
    hasActiveFilters,
    resetFilters,
    setCategory,
    setSortBy,
  } = useExpenseFilters(metrics.items);

  const availableMonths = useMemo(() => {
    return [
      ...new Set(expenses.map((expense) => getMonthKey(expense.date))),
    ].sort((a, b) => b.localeCompare(a));
  }, [expenses]);

  const quickExpenseOptions = useMemo(
    () => [
      {
        id: "coffee",
        category: "alimentacion",
        title: t("expensesPage.quickExpenseCoffee"),
      },
      {
        id: "gas",
        category: "transporte",
        title: t("expensesPage.quickExpenseGas"),
      },
      {
        id: "groceries",
        category: "alimentacion",
        title: t("expensesPage.quickExpenseGroceries"),
      },
      {
        id: "lunch",
        category: "ocio",
        title: t("expensesPage.quickExpenseLunch"),
      },
    ],
    [t],
  );

  useEffect(() => {
    const shouldLockScroll =
      pendingDeleteExpenseId !== null ||
      isComposerOpen ||
      isLogoutConfirmOpen ||
      isOptionsOpen;

    if (!shouldLockScroll) {
      return undefined;
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [
    isComposerOpen,
    isLogoutConfirmOpen,
    isOptionsOpen,
    pendingDeleteExpenseId,
  ]);

  function handleExpenseSubmit(expense) {
    if (editingExpense) {
      updateExpense(editingExpense.id, expense);
      setEditingExpense(null);
      setComposerDraft(null);
      setIsComposerOpen(false);
      return;
    }

    addExpense(expense);
    setComposerDraft(null);
    setIsComposerOpen(false);
  }

  function handleCreateExpense() {
    setIsActionMenuOpen(false);
    setEditingExpense(null);
    setComposerDraft(null);
    setIsComposerOpen(true);
  }

  function handleCreateQuickExpense(option) {
    setIsActionMenuOpen(false);
    setEditingExpense(null);
    setComposerDraft({
      id: crypto.randomUUID(),
      title: option.title,
      amount: "",
      category: option.category,
      date: `${selectedMonth}-01`,
      repeat: "never",
      note: "",
    });
    setIsComposerOpen(true);
  }

  function handleEditExpense(expense) {
    setComposerDraft(null);
    setEditingExpense(expense);
    setIsComposerOpen(true);
  }

  function handleDeleteExpense(expenseId) {
    setPendingDeleteExpenseId(expenseId);
  }

  function handleConfirmDeleteExpense() {
    if (pendingDeleteExpenseId === null) {
      return;
    }

    if (editingExpense?.id === pendingDeleteExpenseId) {
      handleCloseComposer();
    }

    deleteExpense(pendingDeleteExpenseId);
    setPendingDeleteExpenseId(null);
  }

  function handleCancelDeleteExpense() {
    setPendingDeleteExpenseId(null);
  }

  function handleCloseComposer() {
    setEditingExpense(null);
    setComposerDraft(null);
    setIsComposerOpen(false);
  }

  function handleOpenOptions() {
    setIsActionMenuOpen(false);
    setIsOptionsOpen(true);
  }

  function handleCloseOptions() {
    setIsOptionsOpen(false);
  }

  function handleRequestLogout() {
    setIsActionMenuOpen(false);
    setIsLogoutConfirmOpen(true);
  }

  function handleCancelLogout() {
    setIsLogoutConfirmOpen(false);
  }

  function handleConfirmLogout() {
    window.localStorage.removeItem(EXPENSES_STORAGE_KEY);
    window.localStorage.removeItem(BUDGETS_STORAGE_KEY);
    window.localStorage.removeItem(LANGUAGE_STORAGE_KEY);
    window.localStorage.removeItem(WARNING_THRESHOLD_STORAGE_KEY);
    window.location.reload();
  }

  return (
    <>
      {typeof document !== "undefined"
        ? createPortal(
            <FloatingActionMenu
              isOpen={isActionMenuOpen}
              labels={{
                closeMenu: t("expensesPage.closeMainMenu"),
                openMenu: t("expensesPage.openMainMenu"),
                mainActions: t("expensesPage.mainActions"),
                newExpense: t("expensesPage.menuNewExpense"),
                options: t("expensesPage.menuOptions"),
                logOut: t("expensesPage.menuLogOut"),
              }}
              onOpenExpense={handleCreateExpense}
              onOpenOptions={handleOpenOptions}
              onRequestLogout={handleRequestLogout}
              onToggle={setIsActionMenuOpen}
            />,
            document.body,
          )
        : null}

      <motion.section
        className="page-grid"
        variants={staggerContainer}
        initial="initial"
        animate="animate"
      >
        <motion.div variants={fadeUp}>
          <RecurringQuickActionsPanel
            options={quickExpenseOptions}
            subtitle={t("expensesPage.quickExpensesSubtitle")}
            title={t("expensesPage.quickExpensesTitle")}
            onSelect={handleCreateQuickExpense}
          />
        </motion.div>

        <motion.div className="panel" variants={fadeUp}>
          <div className="panel__header">
            <div>
              <h2 className="panel__title">
                {t("expensesPage.monthlyViewTitle")}
              </h2>
              <p className="panel__subtitle">
                {t("expensesPage.monthlyViewSubtitle")}
              </p>
            </div>
          </div>

          <MonthSelector
            months={availableMonths}
            value={selectedMonth}
            onChange={setSelectedMonth}
          />
        </motion.div>

        <AnimatePresence mode="wait">
          {metrics.hasOverBudgetAlert ? (
            <BudgetAlerts
              key="over-budget-alert"
              items={metrics.overBudgetEntries}
              totalExceededAmount={metrics.overBudgetTotal}
            />
          ) : null}

          {!metrics.hasOverBudgetAlert && metrics.hasNearBudgetAlert ? (
            <BudgetAlerts
              key="near-budget-alert"
              items={metrics.nearBudgetEntries}
              tone="warning"
              title={t("expensesPage.overBudgetTitle")}
              eyebrow={t("expensesPage.trackingEyebrow")}
              subtitle={t("expensesPage.nearBudgetSubtitle", {
                threshold: warningThreshold,
                count: metrics.nearBudgetCount,
              })}
            />
          ) : null}
        </AnimatePresence>

        <motion.div className="expenses-layout" variants={fadeUp}>
          <CollapsiblePanel
            title={t("expensesPage.movementsTitle")}
            subtitle={t("expensesPage.movementsSubtitle", {
              visible: filteredExpenses.length,
              total: metrics.count,
            })}
            variants={fadeUp}
          >
            <ExpenseFilters
              filters={filters}
              hasActiveFilters={hasActiveFilters}
              onCategoryChange={setCategory}
              onReset={resetFilters}
              onSortChange={setSortBy}
            />

            <ExpenseList
              expenses={filteredExpenses}
              onDelete={handleDeleteExpense}
              onEdit={handleEditExpense}
            />
          </CollapsiblePanel>

          <AnimatePresence>
            {isComposerOpen ? (
              <ExpenseComposerModal
                editingExpense={editingExpense}
                initialValues={editingExpense ?? composerDraft}
                labels={{
                  close: t("common.close"),
                  closeForm: t("expensesPage.closeExpenseForm"),
                  edit: t("common.edit"),
                  newExpense: t("common.newExpense"),
                  saveChanges: t("common.saveChanges"),
                  submit: t("expenseForm.newSubmit"),
                  subtitle: t("expensesPage.composeSubtitle"),
                }}
                onClose={handleCloseComposer}
                onSubmit={handleExpenseSubmit}
              />
            ) : null}
          </AnimatePresence>
        </motion.div>

        <motion.section className="panel" variants={fadeUp}>
          <div className="panel__header">
            <div className="budget-panel__intro">
              <div className="budget-panel__title-row">
                <h2 className="panel__title">
                  {t("expensesPage.budgetPlannerTitle")}
                </h2>
              </div>

              <p className="panel__subtitle">
                {t("expensesPage.budgetPlannerSubtitle")}
              </p>
            </div>

            <button
              className="ghost-button panel-toggle budget-panel__toggle"
              type="button"
              aria-expanded={isBudgetPlannerOpen}
              aria-controls="budget-planner-panel"
              aria-label={
                isBudgetPlannerOpen
                  ? t("collapsible.collapse", {
                      title: t("expensesPage.budgetPlannerTitle"),
                    })
                  : t("collapsible.expand", {
                      title: t("expensesPage.budgetPlannerTitle"),
                    })
              }
              onClick={() => setIsBudgetPlannerOpen((current) => !current)}
            >
              <span className="budget-panel__toggle-icon" aria-hidden="true">
                {isBudgetPlannerOpen ? (
                  <HiOutlineChevronUp />
                ) : (
                  <HiOutlineChevronDown />
                )}
              </span>
            </button>
          </div>

          {isBudgetPlannerOpen ? (
            <div id="budget-planner-panel">
              <BudgetPlanner
                budgets={metrics.monthlyBudgets}
                onSave={(category, amount) =>
                  setMonthlyBudget(selectedMonth, category, amount)
                }
              />
            </div>
          ) : null}
        </motion.section>

        <AnimatePresence>
          {isOptionsOpen ? (
            <OptionsModal
              labels={{
                activeMonth: t("common.activeMonth"),
                closeOptions: t("common.closeOptions"),
                done: t("common.done"),
                english: t("common.english"),
                language: t("common.language"),
                languageHelp: t("expensesPage.optionsLanguageHelp"),
                monthHelp: t("expensesPage.optionsMonthHelp"),
                spanish: t("common.spanish"),
                subtitle: t("expensesPage.optionsSubtitle"),
                title: t("expensesPage.optionsTitle"),
                warningHelp: t("expensesPage.optionsWarningHelp"),
              }}
              language={language}
              selectedMonth={selectedMonth}
              warningThreshold={warningThreshold}
              onClose={handleCloseOptions}
              onSetLanguage={setLanguage}
              onSetWarningThreshold={setWarningThreshold}
            />
          ) : null}

          {pendingDeleteExpenseId !== null ? (
            <ConfirmDialog
              title={t("expensesPage.deleteExpenseTitle")}
              description={t("expensesPage.deleteExpenseDescription")}
              confirmLabel={t("expensesPage.deleteExpenseConfirm")}
              onCancel={handleCancelDeleteExpense}
              onConfirm={handleConfirmDeleteExpense}
            />
          ) : null}

          {isLogoutConfirmOpen ? (
            <ConfirmDialog
              title={t("expensesPage.logOutTitle")}
              description={t("expensesPage.logOutDescription")}
              confirmLabel={t("expensesPage.logOutConfirm")}
              cancelLabel={t("common.cancel")}
              onCancel={handleCancelLogout}
              onConfirm={handleConfirmLogout}
            />
          ) : null}
        </AnimatePresence>
      </motion.section>
    </>
  );
}

export default ExpensesPage;
