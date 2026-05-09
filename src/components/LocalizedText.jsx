import { useExpensesContext } from "../hooks/useExpensesContext.js";

const BLOCK_TAGS = new Set([
  "div",
  "p",
  "h1",
  "h2",
  "h3",
  "h4",
  "h5",
  "h6",
  "label",
]);

function buildSkeletonWidth(text, width) {
  if (width) {
    return width;
  }

  const contentLength = typeof text === "string" ? text.trim().length : 0;
  const clampedLength = Math.max(7, Math.min(contentLength || 12, 28));

  return `${clampedLength}ch`;
}

function LocalizedText({
  as: Component = "span",
  className = "",
  text,
  width,
  ...props
}) {
  const { isLanguageChanging } = useExpensesContext();
  const isBlockElement =
    typeof Component === "string" && BLOCK_TAGS.has(Component);

  if (isLanguageChanging) {
    return (
      <Component
        className={[className, "localized-text", "localized-text--skeleton"]
          .filter(Boolean)
          .join(" ")}
        style={{
          "--localized-text-width": buildSkeletonWidth(text, width),
          "--localized-text-display": isBlockElement ? "block" : "inline-block",
          ...props.style,
        }}
        {...props}
      >
        <span className="localized-text__content">{text}</span>
        <span className="localized-text__overlay" aria-hidden="true" />
      </Component>
    );
  }

  return (
    <Component className={className} {...props}>
      {text}
    </Component>
  );
}

export default LocalizedText;
