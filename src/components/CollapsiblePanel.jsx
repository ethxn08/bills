import { useId, useState } from "react";
import { motion } from "motion/react";
import LocalizedText from "./LocalizedText.jsx";
import { useI18n } from "../hooks/useI18n.js";
import { HiOutlineChevronDown, HiOutlineChevronUp } from "react-icons/hi2";
import { fadeUp } from "../utils/motion.js";

const collapseMotion = {
  open: {
    opacity: 1,
    height: "auto",
    visibility: "visible",
    transition: {
      duration: 0.2,
      ease: [0.22, 1, 0.36, 1],
    },
  },
  collapsed: {
    opacity: 0,
    height: 0,
    transition: {
      duration: 0.14,
      ease: "easeOut",
    },
    transitionEnd: {
      visibility: "hidden",
    },
  },
};

function CollapsiblePanel({
  children,
  className = "",
  defaultOpen = false,
  subtitle,
  title,
  variants,
}) {
  const { t } = useI18n();
  const [isOpen, setIsOpen] = useState(defaultOpen);
  const panelId = useId();
  const sectionClassName = ["panel", className].filter(Boolean).join(" ");

  return (
    <motion.section className={sectionClassName} variants={variants ?? fadeUp}>
      <div className="panel__header collapsible-panel__header">
        <div>
          <LocalizedText as="h2" className="panel__title" text={title} />
          {subtitle ? (
            <LocalizedText
              as="p"
              className="panel__subtitle"
              text={subtitle}
              width="28ch"
            />
          ) : null}
        </div>

        <button
          className="ghost-button panel-toggle budget-panel__toggle"
          type="button"
          aria-expanded={isOpen}
          aria-controls={panelId}
          aria-label={
            isOpen
              ? t("collapsible.collapse", { title })
              : t("collapsible.expand", { title })
          }
          onClick={() => setIsOpen((current) => !current)}
        >
          <span className="budget-panel__toggle-icon" aria-hidden="true">
            {isOpen ? <HiOutlineChevronUp /> : <HiOutlineChevronDown />}
          </span>
        </button>
      </div>

      <motion.div
        id={panelId}
        className="collapsible-panel__content"
        initial={false}
        animate={isOpen ? "open" : "collapsed"}
        variants={collapseMotion}
        aria-hidden={!isOpen}
        style={{ overflow: "hidden" }}
      >
        {children}
      </motion.div>
    </motion.section>
  );
}

export default CollapsiblePanel;
