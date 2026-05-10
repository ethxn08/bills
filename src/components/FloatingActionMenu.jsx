import { AnimatePresence, motion } from "motion/react";
import {
  HiArrowRightOnRectangle,
  HiBars3,
  HiCog6Tooth,
  HiPlus,
} from "react-icons/hi2";
import { fadeScale } from "../utils/motion.js";

function FloatingActionMenu({
  isOpen,
  labels,
  onOpenExpense,
  onOpenOptions,
  onRequestLogout,
  onToggle,
}) {
  const itemCount = [onOpenExpense, onOpenOptions, onRequestLogout].filter(
    Boolean,
  ).length;

  return (
    <>
      <AnimatePresence>
        {isOpen ? (
          <motion.button
            {...fadeScale}
            className="floating-action-menu__backdrop"
            type="button"
            aria-label={labels.closeMenu}
            onClick={() => onToggle(false)}
          />
        ) : null}
      </AnimatePresence>

      <div
        className={`floating-action-menu${isOpen ? " floating-action-menu--open" : ""}`}
        style={{ "--floating-action-menu-item-count": itemCount }}
      >
        <motion.button
          variants={fadeScale}
          className="add-expense-button add-expense-button--floating"
          type="button"
          aria-expanded={isOpen}
          aria-controls="floating-action-list"
          aria-label={labels.openMenu}
          onClick={() => onToggle(!isOpen)}
        >
          <span aria-hidden="true">
            <HiBars3 />
          </span>
        </motion.button>

        <AnimatePresence>
          {isOpen ? (
            <motion.div
              {...fadeScale}
              className="floating-action-menu__list"
              id="floating-action-list"
              role="menu"
              aria-label={labels.mainActions}
            >
              {onOpenExpense ? (
                <motion.button
                  variants={fadeScale}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  className="floating-action-menu__item"
                  type="button"
                  role="menuitem"
                  aria-label={labels.newExpense}
                  onClick={onOpenExpense}
                >
                  <span
                    className="floating-action-menu__icon"
                    aria-hidden="true"
                  >
                    <HiPlus />
                  </span>
                </motion.button>
              ) : null}

              {onOpenOptions ? (
                <motion.button
                  variants={fadeScale}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  className="floating-action-menu__item"
                  type="button"
                  role="menuitem"
                  aria-label={labels.options}
                  onClick={onOpenOptions}
                >
                  <span
                    className="floating-action-menu__icon"
                    aria-hidden="true"
                  >
                    <HiCog6Tooth />
                  </span>
                </motion.button>
              ) : null}

              {onRequestLogout ? (
                <motion.button
                  variants={fadeScale}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  className="floating-action-menu__item floating-action-menu__item--danger"
                  type="button"
                  role="menuitem"
                  aria-label={labels.logOut}
                  onClick={onRequestLogout}
                >
                  <span
                    className="floating-action-menu__icon"
                    aria-hidden="true"
                  >
                    <HiArrowRightOnRectangle />
                  </span>
                </motion.button>
              ) : null}
            </motion.div>
          ) : null}
        </AnimatePresence>
      </div>
    </>
  );
}

export default FloatingActionMenu;
