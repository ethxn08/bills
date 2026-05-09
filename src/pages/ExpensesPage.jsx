import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import {
  HiArrowRightOnRectangle,
  HiBars3,
  HiCog6Tooth,
  HiOutlineChevronDown,
  HiOutlineChevronUp,
  HiPlus,
  HiXMark,
} from "react-icons/hi2";
import BudgetPlanner from "../components/BudgetPlanner.jsx";
import AppSelect from "../components/AppSelect.jsx";
import BudgetAlerts from "../components/BudgetAlerts.jsx";
import CollapsiblePanel from "../components/CollapsiblePanel.jsx";
import ConfirmDialog from "../components/ConfirmDialog.jsx";
import ExpenseForm from "../components/ExpenseForm.jsx";
import ExpenseFilters from "../components/ExpenseFilters.jsx";
import ExpenseList from "../components/ExpenseList.jsx";
import LocalizedText from "../components/LocalizedText.jsx";
import MonthSelector from "../components/MonthSelector.jsx";
import WarningThresholdControl from "../components/WarningThresholdControl.jsx";
import { LANGUAGE_OPTIONS } from "../i18n/translations.js";
import { useExpenseFilters } from "../hooks/useExpenseFilters.js";
import { useI18n } from "../hooks/useI18n.js";
import { useExpenseMetrics } from "../hooks/useExpenseMetrics.js";
import { useExpensesContext } from "../hooks/useExpensesContext.js";
import { formatMonthLabel, getMonthKey } from "../utils/date.js";
import { fadeScale, fadeUp, staggerContainer } from "../utils/motion.js";

const EXPENSES_STORAGE_KEY = "bills.expenses";
const BUDGETS_STORAGE_KEY = "bills.budgets";
const LANGUAGE_STORAGE_KEY = "bills.language";
const WARNING_THRESHOLD_STORAGE_KEY = "bills.warning-threshold";

function ExpensesPage() {
  const [editingExpense, setEditingExpense] = useState(null);
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
      setIsComposerOpen(false);
      return;
    }

    addExpense(expense);
    setIsComposerOpen(false);
  }

  function handleCreateExpense() {
    setIsActionMenuOpen(false);
    setEditingExpense(null);
    setIsComposerOpen(true);
  }

  function handleEditExpense(expense) {
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
    <motion.section
      className="page-grid"
      variants={staggerContainer}
      initial="initial"
      animate="animate"
    >
      <AnimatePresence>
        {isActionMenuOpen ? (
          <motion.button
            {...fadeScale}
            className="floating-action-menu__backdrop"
            type="button"
            aria-label={t("expensesPage.closeMainMenu")}
            onClick={() => setIsActionMenuOpen(false)}
          />
        ) : null}
      </AnimatePresence>

      <div
        className={`floating-action-menu${isActionMenuOpen ? " floating-action-menu--open" : ""}`}
      >
        <motion.button
          variants={fadeScale}
          className="add-expense-button add-expense-button--floating"
          type="button"
          aria-expanded={isActionMenuOpen}
          aria-controls="floating-action-list"
          aria-label={
            isActionMenuOpen
              ? t("expensesPage.closeMainMenu")
              : t("expensesPage.openMainMenu")
          }
          onClick={() => setIsActionMenuOpen((current) => !current)}
        >
          <span aria-hidden="true">
            {isActionMenuOpen ? <HiXMark /> : <HiBars3 />}
          </span>
        </motion.button>

        <AnimatePresence>
          {isActionMenuOpen ? (
            <motion.div
              {...fadeScale}
              className="floating-action-menu__list"
              id="floating-action-list"
              role="menu"
              aria-label={t("expensesPage.mainActions")}
            >
              <motion.button
                variants={fadeScale}
                initial="initial"
                animate="animate"
                exit="exit"
                className="floating-action-menu__item"
                type="button"
                role="menuitem"
                aria-label={t("expensesPage.menuNewExpense")}
                onClick={handleCreateExpense}
              >
                <span className="floating-action-menu__icon" aria-hidden="true">
                  <HiPlus />
                </span>
              </motion.button>

              <motion.button
                variants={fadeScale}
                initial="initial"
                animate="animate"
                exit="exit"
                className="floating-action-menu__item"
                type="button"
                role="menuitem"
                aria-label={t("expensesPage.menuOptions")}
                onClick={handleOpenOptions}
              >
                <span className="floating-action-menu__icon" aria-hidden="true">
                  <HiCog6Tooth />
                </span>
              </motion.button>

              <motion.button
                variants={fadeScale}
                initial="initial"
                animate="animate"
                exit="exit"
                className="floating-action-menu__item floating-action-menu__item--danger"
                type="button"
                role="menuitem"
                aria-label={t("expensesPage.menuLogOut")}
                onClick={handleRequestLogout}
              >
                <span className="floating-action-menu__icon" aria-hidden="true">
                  <HiArrowRightOnRectangle />
                </span>
              </motion.button>
            </motion.div>
          ) : null}
        </AnimatePresence>
      </div>

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
            <motion.div
              {...fadeScale}
              className="expense-composer-modal"
              role="dialog"
              aria-modal="true"
            >
              <button
                className="expense-composer-backdrop"
                type="button"
                aria-label={t("expensesPage.closeExpenseForm")}
                onClick={handleCloseComposer}
              />
              <section className="panel expense-composer-panel">
                <div className="panel__header expense-composer-panel__header">
                  <div>
                    <LocalizedText
                      as="h2"
                      className="panel__title"
                      text={
                        editingExpense
                          ? t("common.edit")
                          : t("common.newExpense")
                      }
                      width="16ch"
                    />
                    <LocalizedText
                      as="p"
                      className="panel__subtitle"
                      text={t("expensesPage.composeSubtitle")}
                      width="30ch"
                    />
                  </div>

                  <button
                    className="ghost-button expense-composer-close"
                    type="button"
                    onClick={handleCloseComposer}
                    aria-label={t("common.close")}
                  >
                    ×
                  </button>
                </div>
                <ExpenseForm
                  key={editingExpense?.id ?? "new-expense"}
                  initialValues={editingExpense}
                  onCancel={handleCloseComposer}
                  onSubmit={handleExpenseSubmit}
                  submitLabel={
                    editingExpense
                      ? t("common.saveChanges")
                      : t("expenseForm.newSubmit")
                  }
                />
              </section>
            </motion.div>
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
          <motion.div
            {...fadeScale}
            className="expense-composer-modal"
            role="dialog"
            aria-modal="true"
          >
            <button
              className="expense-composer-backdrop"
              type="button"
              aria-label={t("common.closeOptions")}
              onClick={handleCloseOptions}
            />
            <section className="panel expense-composer-panel options-panel">
              <div className="panel__header expense-composer-panel__header">
                <div>
                  <LocalizedText
                    as="h2"
                    className="panel__title"
                    text={t("expensesPage.optionsTitle")}
                    width="14ch"
                  />
                  <LocalizedText
                    as="p"
                    className="panel__subtitle"
                    text={t("expensesPage.optionsSubtitle")}
                    width="32ch"
                  />
                </div>

                <button
                  className="ghost-button expense-composer-close"
                  type="button"
                  onClick={handleCloseOptions}
                  aria-label={t("common.closeOptions")}
                >
                  ×
                </button>
              </div>

              <div className="options-panel__content">
                <div className="options-panel__grid">
                  <div className="options-panel__card">
                    <AppSelect
                      id="language-select"
                      label={t("common.language")}
                      value={language}
                      onChange={setLanguage}
                      options={LANGUAGE_OPTIONS.map((value) => ({
                        value,
                        label:
                          value === "es"
                            ? t("common.spanish")
                            : t("common.english"),
                      }))}
                    />
                    <LocalizedText
                      as="p"
                      className="options-panel__help"
                      text={t("expensesPage.optionsLanguageHelp")}
                      width="28ch"
                    />
                  </div>

                  <div className="options-panel__card">
                    <WarningThresholdControl
                      value={warningThreshold}
                      onChange={setWarningThreshold}
                    />
                    <LocalizedText
                      as="p"
                      className="options-panel__help"
                      text={t("expensesPage.optionsWarningHelp")}
                      width="28ch"
                    />
                  </div>

                  <div className="options-panel__card">
                    <LocalizedText
                      as="span"
                      className="options-panel__label"
                      text={t("common.activeMonth")}
                      width="12ch"
                    />
                    <LocalizedText
                      as="strong"
                      text={formatMonthLabel(selectedMonth, language)}
                      width="14ch"
                    />
                    <LocalizedText
                      as="p"
                      className="options-panel__help"
                      text={t("expensesPage.optionsMonthHelp")}
                      width="28ch"
                    />
                  </div>
                </div>
              </div>

              <div className="options-panel__footer">
                <button
                  className="primary-button options-panel__done"
                  type="button"
                  onClick={handleCloseOptions}
                >
                  <LocalizedText text={t("common.done")} width="8ch" />
                </button>
              </div>
            </section>
          </motion.div>
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
  );
}

export default ExpensesPage;
