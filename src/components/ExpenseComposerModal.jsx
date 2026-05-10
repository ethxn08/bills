import { motion } from "motion/react";
import ExpenseForm from "./ExpenseForm.jsx";
import LocalizedText from "./LocalizedText.jsx";
import { fadeScale } from "../utils/motion.js";

function ExpenseComposerModal({
  editingExpense,
  initialValues,
  labels,
  onClose,
  onSubmit,
}) {
  return (
    <motion.div
      {...fadeScale}
      className="expense-composer-modal"
      role="dialog"
      aria-modal="true"
    >
      <button
        className="expense-composer-backdrop"
        type="button"
        aria-label={labels.closeForm}
        onClick={onClose}
      />
      <section className="panel expense-composer-panel">
        <div className="panel__header expense-composer-panel__header">
          <div>
            <LocalizedText
              as="h2"
              className="panel__title"
              text={editingExpense ? labels.edit : labels.newExpense}
              width="16ch"
            />
            <LocalizedText
              as="p"
              className="panel__subtitle"
              text={labels.subtitle}
              width="30ch"
            />
          </div>

          <button
            className="ghost-button expense-composer-close"
            type="button"
            onClick={onClose}
            aria-label={labels.close}
          >
            ×
          </button>
        </div>
        <ExpenseForm
          key={editingExpense?.id ?? initialValues?.id ?? "new-expense"}
          initialValues={initialValues}
          onCancel={onClose}
          onSubmit={onSubmit}
          submitLabel={editingExpense ? labels.saveChanges : labels.submit}
        />
      </section>
    </motion.div>
  );
}

export default ExpenseComposerModal;
