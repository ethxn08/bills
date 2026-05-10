function RecurringQuickActionsPanel({ options, subtitle, title, onSelect }) {
  return (
    <div className="panel">
      <div className="panel__header panel__header--compact">
        <div>
          <h2 className="panel__title">{title}</h2>
          <p className="panel__subtitle">{subtitle}</p>
        </div>
      </div>

      <div className="chip-row recurring-chip-row" role="list">
        {options.map((option) => (
          <button
            key={option.id}
            className="chip recurring-chip"
            type="button"
            role="listitem"
            onClick={() => onSelect(option)}
          >
            {option.title}
          </button>
        ))}
      </div>
    </div>
  );
}

export default RecurringQuickActionsPanel;
