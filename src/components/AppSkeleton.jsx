import { motion } from "motion/react";

function SkeletonBlock({ className = "" }) {
  return (
    <motion.span
      className={`skeleton-block ${className}`.trim()}
      initial={{ opacity: 0.42 }}
      animate={{ opacity: [0.42, 0.8, 0.42] }}
      transition={{ duration: 1.5, ease: "easeInOut", repeat: Infinity }}
    />
  );
}

function SkeletonTextGroup({ lines }) {
  return (
    <div className="skeleton-text-group">
      {lines.map((line, index) => (
        <SkeletonBlock key={`${line}-${index}`} className={line} />
      ))}
    </div>
  );
}

function SkeletonPanel({ children, className = "" }) {
  return (
    <section className={`panel skeleton-panel ${className}`.trim()}>
      {children}
    </section>
  );
}

function ExpensesSkeleton() {
  return (
    <div className="page-grid skeleton-page">
      <SkeletonPanel>
        <SkeletonTextGroup
          lines={[
            "skeleton-line skeleton-line--title",
            "skeleton-line skeleton-line--medium",
          ]}
        />
        <div className="chip-row skeleton-chip-row" aria-hidden="true">
          <SkeletonBlock className="skeleton-chip" />
          <SkeletonBlock className="skeleton-chip skeleton-chip--wide" />
          <SkeletonBlock className="skeleton-chip" />
          <SkeletonBlock className="skeleton-chip skeleton-chip--wide" />
        </div>
      </SkeletonPanel>

      <SkeletonPanel className="skeleton-alert-panel">
        <SkeletonTextGroup
          lines={[
            "skeleton-line skeleton-line--eyebrow",
            "skeleton-line skeleton-line--title",
            "skeleton-line skeleton-line--medium",
          ]}
        />
        <div className="skeleton-stack">
          <SkeletonBlock className="skeleton-row-card" />
          <SkeletonBlock className="skeleton-row-card" />
        </div>
      </SkeletonPanel>

      <div className="expenses-layout skeleton-layout">
        <SkeletonPanel>
          <SkeletonTextGroup
            lines={[
              "skeleton-line skeleton-line--title",
              "skeleton-line skeleton-line--medium",
            ]}
          />
          <div className="skeleton-filters" aria-hidden="true">
            <SkeletonBlock className="skeleton-input skeleton-input--full" />
            <SkeletonBlock className="skeleton-input" />
            <SkeletonBlock className="skeleton-input" />
            <SkeletonBlock className="skeleton-button" />
          </div>
          <div className="skeleton-stack" aria-hidden="true">
            <SkeletonBlock className="skeleton-list-card skeleton-list-card--tall" />
            <SkeletonBlock className="skeleton-list-card" />
            <SkeletonBlock className="skeleton-list-card" />
          </div>
        </SkeletonPanel>
      </div>

      <SkeletonPanel>
        <div className="panel__header">
          <div className="budget-panel__intro">
            <div className="budget-panel__title-row" aria-hidden="true">
              <SkeletonBlock className="skeleton-circle-button" />
              <SkeletonBlock className="skeleton-line skeleton-line--title" />
            </div>
            <SkeletonBlock className="skeleton-line skeleton-line--medium" />
          </div>
          <SkeletonBlock className="skeleton-input skeleton-input--compact" />
        </div>

        <div className="skeleton-budget-grid" aria-hidden="true">
          <SkeletonBlock className="skeleton-list-card" />
          <SkeletonBlock className="skeleton-list-card" />
          <SkeletonBlock className="skeleton-list-card" />
          <SkeletonBlock className="skeleton-list-card" />
        </div>
      </SkeletonPanel>
    </div>
  );
}

function AnalyticsSkeleton() {
  return (
    <section className="analytics-layout skeleton-page">
      <SkeletonPanel className="chart-card">
        <SkeletonTextGroup
          lines={[
            "skeleton-line skeleton-line--title",
            "skeleton-line skeleton-line--medium",
          ]}
        />
        <div className="skeleton-stack" aria-hidden="true">
          <SkeletonBlock className="skeleton-chart-row" />
          <SkeletonBlock className="skeleton-chart-row" />
          <SkeletonBlock className="skeleton-chart-row" />
        </div>
      </SkeletonPanel>

      <SkeletonPanel className="chart-card">
        <SkeletonTextGroup
          lines={[
            "skeleton-line skeleton-line--title",
            "skeleton-line skeleton-line--medium",
          ]}
        />
        <div className="skeleton-stack" aria-hidden="true">
          <SkeletonBlock className="skeleton-chart-row" />
          <SkeletonBlock className="skeleton-chart-row" />
          <SkeletonBlock className="skeleton-chart-row" />
        </div>
      </SkeletonPanel>

      <SkeletonPanel>
        <SkeletonTextGroup
          lines={[
            "skeleton-line skeleton-line--title",
            "skeleton-line skeleton-line--medium",
          ]}
        />
        <div className="insight-grid" aria-hidden="true">
          <SkeletonBlock className="skeleton-tile" />
          <SkeletonBlock className="skeleton-tile" />
          <SkeletonBlock className="skeleton-tile" />
          <SkeletonBlock className="skeleton-tile" />
          <SkeletonBlock className="skeleton-tile" />
          <SkeletonBlock className="skeleton-tile" />
        </div>
      </SkeletonPanel>

      <SkeletonPanel className="chart-card">
        <SkeletonTextGroup
          lines={[
            "skeleton-line skeleton-line--title",
            "skeleton-line skeleton-line--medium",
          ]}
        />
        <div className="skeleton-stack" aria-hidden="true">
          <SkeletonBlock className="skeleton-list-card" />
          <SkeletonBlock className="skeleton-list-card" />
          <SkeletonBlock className="skeleton-list-card" />
        </div>
      </SkeletonPanel>
    </section>
  );
}

function AppSkeleton({ pathname }) {
  const isAnalyticsRoute = pathname === "/metricas";

  return (
    <div className="app-shell">
      <main className="app-shell__content">
        <header className="app-shell__header">
          <section className="hero-card skeleton-hero-card">
            <div className="hero-card__layout skeleton-hero-layout">
              <div className="hero-card__copy skeleton-hero-copy">
                <SkeletonTextGroup
                  lines={[
                    "skeleton-line skeleton-line--hero",
                    "skeleton-line skeleton-line--hero-short",
                    "skeleton-line skeleton-line--medium",
                    "skeleton-line skeleton-line--medium skeleton-line--hero-copy-short",
                  ]}
                />
              </div>

              <div
                className="hero-card__visual skeleton-hero-visual"
                aria-hidden="true"
              >
                <SkeletonBlock className="skeleton-donut" />
                <div className="skeleton-hero-summary">
                  <SkeletonBlock className="skeleton-hero-pill skeleton-hero-pill--primary" />
                  <SkeletonBlock className="skeleton-hero-pill skeleton-hero-pill--secondary" />
                </div>
              </div>
            </div>

            <div className="hero-card__stats" aria-hidden="true">
              <SkeletonBlock className="skeleton-stat-card" />
              <SkeletonBlock className="skeleton-stat-card" />
              <SkeletonBlock className="skeleton-stat-card" />
              <SkeletonBlock className="skeleton-stat-card" />
            </div>
          </section>

          <nav className="bottom-nav skeleton-bottom-nav" aria-hidden="true">
            <div className="bottom-nav__inner">
              <SkeletonBlock className="skeleton-nav-link" />
              <SkeletonBlock className="skeleton-nav-link" />
            </div>
          </nav>
        </header>

        {isAnalyticsRoute ? <AnalyticsSkeleton /> : <ExpensesSkeleton />}
      </main>
    </div>
  );
}

export default AppSkeleton;
