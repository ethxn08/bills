import { motion } from "motion/react";
import LocalizedText from "./LocalizedText.jsx";
import { CATEGORY_MAP } from "../data/categories.js";
import { getCategoryLabel } from "../i18n/translations.js";
import { useI18n } from "../hooks/useI18n.js";
import { fadeScale } from "../utils/motion.js";

function CategoryPill({ categoryId }) {
  const { language } = useI18n();
  const category = CATEGORY_MAP[categoryId];

  if (!category) {
    return null;
  }

  return (
    <motion.span
      {...fadeScale}
      className="category-pill"
      style={{
        color: category.color,
        backgroundColor: `${category.color}18`,
      }}
    >
      <span className="category-pill__dot" aria-hidden="true" />
      <LocalizedText text={getCategoryLabel(category.id, language)} />
    </motion.span>
  );
}

export default CategoryPill;
