import LocalizedText from "./LocalizedText.jsx";

function EmptyState({ title, description, className = "" }) {
  const stateClassName = ["empty-state", className].filter(Boolean).join(" ");

  return (
    <div className={stateClassName}>
      {title ? (
        <LocalizedText
          as="strong"
          className="empty-state__title"
          text={title}
          width="18ch"
        />
      ) : null}
      {description ? (
        <LocalizedText
          as="p"
          className="empty-state__description"
          text={description}
          width="28ch"
        />
      ) : null}
    </div>
  );
}

export default EmptyState;
