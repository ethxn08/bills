import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "motion/react";
import BarChart from "../components/BarChart.jsx";
import BudgetStatusList from "../components/BudgetStatusList.jsx";
import CategoryChart from "../components/CategoryChart.jsx";
import CollapsiblePanel from "../components/CollapsiblePanel.jsx";
import ConfirmDialog from "../components/ConfirmDialog.jsx";
import FloatingActionMenu from "../components/FloatingActionMenu.jsx";
import InsightsPanel from "../components/InsightsPanel.jsx";
import OptionsModal from "../components/OptionsModal.jsx";
import { useI18n } from "../hooks/useI18n.js";
import { useExpenseMetrics } from "../hooks/useExpenseMetrics.js";
import { useExpensesContext } from "../hooks/useExpensesContext.js";
import { fadeUp, staggerContainer } from "../utils/motion.js";

const EXPENSES_STORAGE_KEY = "bills.expenses";
const BUDGETS_STORAGE_KEY = "bills.budgets";
const LANGUAGE_STORAGE_KEY = "bills.language";
const WARNING_THRESHOLD_STORAGE_KEY = "bills.warning-threshold";

function AnalyticsPage() {
  const [isActionMenuOpen, setIsActionMenuOpen] = useState(false);
  const [isOptionsOpen, setIsOptionsOpen] = useState(false);
  const [isLogoutConfirmOpen, setIsLogoutConfirmOpen] = useState(false);
  const {
    budgets,
    expenses,
    language,
    selectedMonth,
    setLanguage,
    setWarningThreshold,
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

  useEffect(() => {
    const shouldLockScroll = isOptionsOpen || isLogoutConfirmOpen;

    if (!shouldLockScroll) {
      return undefined;
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [isLogoutConfirmOpen, isOptionsOpen]);

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
                options: t("expensesPage.menuOptions"),
                logOut: t("expensesPage.menuLogOut"),
              }}
              onOpenOptions={handleOpenOptions}
              onRequestLogout={handleRequestLogout}
              onToggle={setIsActionMenuOpen}
            />,
            document.body,
          )
        : null}

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
            count={metrics.count}
            monthlyTrend={metrics.monthlyTrend}
            selectedMonth={selectedMonth}
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

export default AnalyticsPage;
