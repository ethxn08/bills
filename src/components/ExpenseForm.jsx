import { useState } from "react";
import { motion } from "motion/react";
import AppSelect from "./AppSelect.jsx";
import { getLocalizedCategories } from "../data/categories.js";
import { useI18n } from "../hooks/useI18n.js";
import { getCurrentMonthKey } from "../utils/date.js";
import { fadeUp, quickStagger } from "../utils/motion.js";

const initialFormState = {
  title: "",
  amount: "",
  category: "vivienda",
  date: `${getCurrentMonthKey()}-01`,
  repeat: "never",
  note: "",
};

function getFormState(initialValues) {
  if (!initialValues) {
    return initialFormState;
  }

  return {
    title: initialValues.title,
    amount: String(initialValues.amount),
    category: initialValues.category,
    date: initialValues.date,
    repeat: initialValues.repeat ?? "never",
    note: initialValues.note,
  };
}

function ExpenseForm({ initialValues, onCancel, onSubmit, submitLabel }) {
  const { language, t } = useI18n();
  const categories = getLocalizedCategories(language);
  const repeatOptions = [
    { value: "never", label: t("expenseForm.repeatNever") },
    { value: "daily", label: t("expenseForm.repeatDaily") },
    { value: "weekly", label: t("expenseForm.repeatWeekly") },
    { value: "monthly", label: t("expenseForm.repeatMonthly") },
  ];
  const [formState, setFormState] = useState(() => getFormState(initialValues));

  function handleChange(event) {
    const { name, value } = event.target;

    updateField(name, value);
  }

  function updateField(name, value) {
    setFormState((currentState) => ({
      ...currentState,
      [name]: value,
    }));
  }

  function handleSubmit(event) {
    event.preventDefault();

    onSubmit({
      id: initialValues?.id ?? crypto.randomUUID(),
      title: formState.title.trim(),
      amount: Number(formState.amount),
      category: formState.category,
      date: formState.date,
      repeat: formState.repeat,
      note: formState.note.trim(),
    });

    if (initialValues) {
      return;
    }

    setFormState((currentState) => ({
      ...initialFormState,
      date:
        currentState.date.slice(0, 7) === getCurrentMonthKey()
          ? currentState.date
          : `${getCurrentMonthKey()}-01`,
    }));
  }

  return (
    <motion.form
      className="expense-form"
      onSubmit={handleSubmit}
      variants={quickStagger}
      initial="initial"
      animate="animate"
    >
      <motion.div className="form-grid" variants={quickStagger}>
        <motion.div className="field" variants={fadeUp}>
          <label htmlFor="title">{t("expenseForm.title")}</label>
          <input
            id="title"
            name="title"
            value={formState.title}
            onChange={handleChange}
            placeholder={t("expenseForm.titlePlaceholder")}
            required
          />
        </motion.div>

        <motion.div className="field" variants={fadeUp}>
          <label htmlFor="amount">{t("expenseForm.amount")}</label>
          <input
            id="amount"
            name="amount"
            value={formState.amount}
            onChange={handleChange}
            type="number"
            inputMode="decimal"
            min="0"
            step="0.01"
            placeholder="0.00"
            required
          />
        </motion.div>

        <motion.div className="field" variants={fadeUp}>
          <AppSelect
            id="category"
            label={t("expenseForm.category")}
            value={formState.category}
            onChange={(nextValue) => updateField("category", nextValue)}
            options={categories.map((category) => ({
              value: category.id,
              label: category.label,
            }))}
          />
        </motion.div>

        <motion.div className="field" variants={fadeUp}>
          <label htmlFor="date">{t("expenseForm.date")}</label>
          <input
            id="date"
            name="date"
            type="date"
            value={formState.date}
            onChange={handleChange}
            required
          />
        </motion.div>

        <motion.div className="field" variants={fadeUp}>
          <AppSelect
            id="repeat"
            label={t("expenseForm.repeat")}
            value={formState.repeat}
            onChange={(nextValue) => updateField("repeat", nextValue)}
            options={repeatOptions}
          />
        </motion.div>

        <motion.div className="field field--full" variants={fadeUp}>
          <label htmlFor="note">{t("expenseForm.note")}</label>
          <textarea
            id="note"
            name="note"
            value={formState.note}
            onChange={handleChange}
            placeholder={t("expenseForm.notePlaceholder")}
          />
        </motion.div>
      </motion.div>

      <motion.div className="form-actions" variants={fadeUp}>
        {onCancel ? (
          <button className="ghost-button" type="button" onClick={onCancel}>
            {t("expenseForm.cancel")}
          </button>
        ) : null}
        <button className="primary-button" type="submit">
          {submitLabel ?? t("expenseForm.newSubmit")}
        </button>
      </motion.div>
    </motion.form>
  );
}

export default ExpenseForm;
