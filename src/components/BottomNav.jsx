import { motion } from "motion/react";
import { NavLink } from "react-router-dom";
import LocalizedText from "./LocalizedText.jsx";
import { useI18n } from "../hooks/useI18n.js";
import { fadeUp, quickStagger } from "../utils/motion.js";

function BottomNav() {
  const { t } = useI18n();

  return (
    <motion.nav
      className="bottom-nav"
      aria-label={t("app.primaryNavigation")}
      variants={fadeUp}
    >
      <motion.div
        className="bottom-nav__inner"
        variants={quickStagger}
        initial="initial"
        animate="animate"
      >
        <motion.div variants={fadeUp}>
          <NavLink
            to="/gastos"
            className={({ isActive }) =>
              `bottom-nav__link${isActive ? " bottom-nav__link--active" : ""}`
            }
          >
            <span>01</span>
            <LocalizedText as="span" text={t("nav.expenses")} />
          </NavLink>
        </motion.div>
        <motion.div variants={fadeUp}>
          <NavLink
            to="/metricas"
            className={({ isActive }) =>
              `bottom-nav__link${isActive ? " bottom-nav__link--active" : ""}`
            }
          >
            <span>02</span>
            <LocalizedText as="span" text={t("nav.analytics")} />
          </NavLink>
        </motion.div>
      </motion.div>
    </motion.nav>
  );
}

export default BottomNav;
