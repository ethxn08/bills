import { motion } from "motion/react";
import AppSelect from "./AppSelect.jsx";
import LocalizedText from "./LocalizedText.jsx";
import WarningThresholdControl from "./WarningThresholdControl.jsx";
import { LANGUAGE_OPTIONS } from "../i18n/translations.js";
import { formatMonthLabel } from "../utils/date.js";
import { fadeScale } from "../utils/motion.js";

function OptionsModal({
  labels,
  language,
  selectedMonth,
  warningThreshold,
  onClose,
  onSetLanguage,
  onSetWarningThreshold,
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
        aria-label={labels.closeOptions}
        onClick={onClose}
      />
      <section className="panel expense-composer-panel options-panel">
        <div className="panel__header expense-composer-panel__header">
          <div>
            <LocalizedText
              as="h2"
              className="panel__title"
              text={labels.title}
              width="14ch"
            />
            <LocalizedText
              as="p"
              className="panel__subtitle"
              text={labels.subtitle}
              width="32ch"
            />
          </div>

          <button
            className="ghost-button expense-composer-close"
            type="button"
            onClick={onClose}
            aria-label={labels.closeOptions}
          >
            ×
          </button>
        </div>

        <div className="options-panel__content">
          <div className="options-panel__grid">
            <div className="options-panel__card">
              <AppSelect
                id="language-select"
                label={labels.language}
                value={language}
                onChange={onSetLanguage}
                options={LANGUAGE_OPTIONS.map((value) => ({
                  value,
                  label: value === "es" ? labels.spanish : labels.english,
                }))}
              />
              <LocalizedText
                as="p"
                className="options-panel__help"
                text={labels.languageHelp}
                width="28ch"
              />
            </div>

            <div className="options-panel__card">
              <WarningThresholdControl
                value={warningThreshold}
                onChange={onSetWarningThreshold}
              />
              <LocalizedText
                as="p"
                className="options-panel__help"
                text={labels.warningHelp}
                width="28ch"
              />
            </div>

            <div className="options-panel__card">
              <LocalizedText
                as="span"
                className="options-panel__label"
                text={labels.activeMonth}
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
                text={labels.monthHelp}
                width="28ch"
              />
            </div>
          </div>
        </div>

        <div className="options-panel__footer">
          <button
            className="primary-button options-panel__done"
            type="button"
            onClick={onClose}
          >
            <LocalizedText text={labels.done} width="8ch" />
          </button>
        </div>
      </section>
    </motion.div>
  );
}

export default OptionsModal;
