import { AnimatePresence, motion } from "motion/react";
import { useLocation, useOutlet } from "react-router-dom";
import { useI18n } from "../hooks/useI18n.js";
import { useExpenseMetrics } from "../hooks/useExpenseMetrics.js";
import { useExpensesContext } from "../hooks/useExpensesContext.js";
import { formatCurrency } from "../utils/currency.js";
import { formatMonthLabel } from "../utils/date.js";
import {
  fadeUp,
  pagePresence,
  quickStagger,
  staggerContainer,
} from "../utils/motion.js";
import AppSkeleton from "./AppSkeleton.jsx";
import BottomNav from "./BottomNav.jsx";
import LocalizedText from "./LocalizedText.jsx";

function AppLayout() {
  const {
    budgets,
    expenses,
    isHydrating,
    language,
    selectedMonth,
    warningThreshold,
  } = useExpensesContext();
  const { t } = useI18n();
  const location = useLocation();
  const outlet = useOutlet();
  const metrics = useExpenseMetrics(
    expenses,
    selectedMonth,
    budgets,
    warningThreshold,
    language,
  );
  const hasMonthlyExpenses = metrics.count > 0;
  const hasMonthlyBudget = metrics.spendingPlan.totalBudget > 0;

  if (isHydrating) {
    return <AppSkeleton pathname={location.pathname} />;
  }

  return (
    <div className="app-shell">
      <main className="app-shell__content">
        <motion.header
          className="app-shell__header"
          variants={staggerContainer}
          initial="initial"
          animate="animate"
        >
          <motion.section className="hero-card" variants={fadeUp}>
            <motion.div className="hero-card__eyebrow" variants={fadeUp}>
              <LocalizedText text={t("hero.eyebrow")} width="14ch" />
            </motion.div>
            <motion.h1 variants={fadeUp}>
              <LocalizedText text={t("hero.title")} as="span" width="24ch" />
            </motion.h1>
            <motion.p variants={fadeUp}>
              <LocalizedText
                text={t("hero.description")}
                as="span"
                width="32ch"
              />
            </motion.p>

            <motion.div className="hero-card__stats" variants={quickStagger}>
              <motion.div className="hero-stat" variants={fadeUp}>
                <LocalizedText text={t("hero.activeMonth")} />
                <strong>{formatMonthLabel(selectedMonth, language)}</strong>
              </motion.div>
              <motion.div className="hero-stat" variants={fadeUp}>
                <LocalizedText text={t("hero.monthlyTotal")} />
                <strong>
                  {hasMonthlyExpenses
                    ? formatCurrency(metrics.total, language)
                    : "-"}
                </strong>
              </motion.div>
              <motion.div className="hero-stat" variants={fadeUp}>
                <LocalizedText text={t("hero.movements")} />
                <strong>{hasMonthlyExpenses ? metrics.count : "-"}</strong>
              </motion.div>
              <motion.div className="hero-stat" variants={fadeUp}>
                <LocalizedText text={t("hero.averagePerExpense")} />
                <strong>
                  {hasMonthlyExpenses
                    ? formatCurrency(metrics.average, language)
                    : "-"}
                </strong>
              </motion.div>
              <motion.div className="hero-stat" variants={fadeUp}>
                <LocalizedText text={t("hero.dominantCategory")} />
                <strong>
                  <LocalizedText
                    text={metrics.topCategory ? metrics.topCategory.label : "-"}
                  />
                </strong>
              </motion.div>
              <motion.div className="hero-stat" variants={fadeUp}>
                <LocalizedText text={t("hero.monthBudget")} />
                <strong>
                  {hasMonthlyBudget
                    ? formatCurrency(metrics.spendingPlan.totalBudget, language)
                    : "-"}
                </strong>
              </motion.div>
            </motion.div>
          </motion.section>

          <BottomNav />
        </motion.header>

        <AnimatePresence mode="wait">
          {outlet ? (
            <motion.div key={location.pathname} {...pagePresence}>
              {outlet}
            </motion.div>
          ) : null}
        </AnimatePresence>
      </main>
    </div>
  );
}

export default AppLayout;
