import { motion } from "motion/react";
import LocalizedText from "./LocalizedText.jsx";
import { useI18n } from "../hooks/useI18n.js";
import { modalPresence, overlayPresence } from "../utils/motion.js";

function ConfirmDialog({
  cancelLabel,
  confirmLabel,
  description,
  onCancel,
  onConfirm,
  title,
}) {
  const { t } = useI18n();

  return (
    <motion.div
      {...overlayPresence}
      className="dialog-overlay"
      role="dialog"
      aria-modal="true"
      aria-labelledby="dialog-title"
    >
      <motion.button
        {...overlayPresence}
        className="dialog-overlay__backdrop"
        type="button"
        aria-label={t("common.closeDialog")}
        onClick={onCancel}
      />
      <motion.section {...modalPresence} className="dialog-card">
        <LocalizedText
          as="h2"
          className="dialog-card__title"
          id="dialog-title"
          text={title}
          width="18ch"
        />
        <LocalizedText
          as="p"
          className="dialog-card__description"
          text={description}
          width="30ch"
        />
        <div className="dialog-card__actions">
          <button className="secondary-button" type="button" onClick={onCancel}>
            <LocalizedText text={cancelLabel ?? t("common.cancel")} />
          </button>
          <button
            className="primary-button dialog-card__confirm"
            type="button"
            onClick={onConfirm}
          >
            <LocalizedText text={confirmLabel ?? t("common.delete")} />
          </button>
        </div>
      </motion.section>
    </motion.div>
  );
}

export default ConfirmDialog;
