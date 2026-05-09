import { useEffect, useMemo, useRef, useState } from "react";
import { HiCheck, HiOutlineChevronDown } from "react-icons/hi2";
import LocalizedText from "./LocalizedText.jsx";

const MENU_VIEWPORT_GAP = 12;
const MENU_MIN_HEIGHT = 120;
const MENU_PREFERRED_MAX_HEIGHT = 320;

function getSelectedIndex(options, value) {
  return options.findIndex((option) => option.value === value);
}

function AppSelect({ id, label, options, value, onChange, disabled = false }) {
  const [isOpen, setIsOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(() =>
    Math.max(getSelectedIndex(options, value), 0),
  );
  const [menuPlacement, setMenuPlacement] = useState("bottom");
  const [menuMaxHeight, setMenuMaxHeight] = useState(MENU_PREFERRED_MAX_HEIGHT);
  const rootRef = useRef(null);
  const triggerRef = useRef(null);
  const optionRefs = useRef([]);
  const selectedIndex = useMemo(
    () => getSelectedIndex(options, value),
    [options, value],
  );
  const selectedOption =
    selectedIndex >= 0 ? options[selectedIndex] : options[0];
  const labelId = `${id}-label`;
  const menuId = `${id}-menu`;

  useEffect(() => {
    if (!isOpen) {
      return undefined;
    }

    function handlePointerDown(event) {
      if (rootRef.current?.contains(event.target)) {
        return;
      }

      setIsOpen(false);
    }

    function handleDocumentKeyDown(event) {
      if (event.key !== "Escape") {
        return;
      }

      setIsOpen(false);
      requestAnimationFrame(() => triggerRef.current?.focus());
    }

    document.addEventListener("pointerdown", handlePointerDown);
    document.addEventListener("keydown", handleDocumentKeyDown);

    return () => {
      document.removeEventListener("pointerdown", handlePointerDown);
      document.removeEventListener("keydown", handleDocumentKeyDown);
    };
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    optionRefs.current[activeIndex]?.focus();
  }, [activeIndex, isOpen]);

  useEffect(() => {
    if (!isOpen) {
      return undefined;
    }

    function updateMenuPosition() {
      const rootRect = rootRef.current?.getBoundingClientRect();

      if (!rootRect) {
        return;
      }

      const spaceBelow =
        window.innerHeight - rootRect.bottom - MENU_VIEWPORT_GAP;
      const spaceAbove = rootRect.top - MENU_VIEWPORT_GAP;
      const shouldOpenUpwards = spaceBelow < 220 && spaceAbove > spaceBelow;
      const availableSpace = shouldOpenUpwards ? spaceAbove : spaceBelow;

      setMenuPlacement(shouldOpenUpwards ? "top" : "bottom");
      setMenuMaxHeight(
        Math.max(
          MENU_MIN_HEIGHT,
          Math.min(availableSpace - 8, MENU_PREFERRED_MAX_HEIGHT),
        ),
      );
    }

    updateMenuPosition();

    window.addEventListener("resize", updateMenuPosition);
    window.addEventListener("scroll", updateMenuPosition, true);

    return () => {
      window.removeEventListener("resize", updateMenuPosition);
      window.removeEventListener("scroll", updateMenuPosition, true);
    };
  }, [isOpen]);

  function openMenu(nextIndex = Math.max(selectedIndex, 0)) {
    if (disabled || options.length === 0) {
      return;
    }

    setActiveIndex(nextIndex);
    setIsOpen(true);
  }

  function closeMenu(returnFocus = true) {
    setIsOpen(false);

    if (!returnFocus) {
      return;
    }

    requestAnimationFrame(() => triggerRef.current?.focus());
  }

  function selectOption(nextValue) {
    onChange(nextValue);
    closeMenu();
  }

  function moveActiveIndex(step) {
    if (options.length === 0) {
      return;
    }

    setActiveIndex((currentIndex) => {
      const nextIndex = currentIndex + step;

      if (nextIndex < 0) {
        return options.length - 1;
      }

      if (nextIndex >= options.length) {
        return 0;
      }

      return nextIndex;
    });
  }

  function handleTriggerKeyDown(event) {
    switch (event.key) {
      case "ArrowDown":
        event.preventDefault();
        openMenu(Math.max(selectedIndex, 0));
        break;
      case "ArrowUp":
        event.preventDefault();
        openMenu(selectedIndex >= 0 ? selectedIndex : options.length - 1);
        break;
      case "Enter":
      case " ":
        event.preventDefault();

        if (isOpen) {
          closeMenu(false);
          return;
        }

        openMenu(Math.max(selectedIndex, 0));
        break;
      default:
        break;
    }
  }

  function handleOptionKeyDown(event, index) {
    switch (event.key) {
      case "ArrowDown":
        event.preventDefault();
        moveActiveIndex(1);
        break;
      case "ArrowUp":
        event.preventDefault();
        moveActiveIndex(-1);
        break;
      case "Home":
        event.preventDefault();
        setActiveIndex(0);
        break;
      case "End":
        event.preventDefault();
        setActiveIndex(options.length - 1);
        break;
      case "Enter":
      case " ":
        event.preventDefault();
        selectOption(options[index].value);
        break;
      case "Tab":
        closeMenu(false);
        break;
      default:
        break;
    }
  }

  return (
    <div
      ref={rootRef}
      className={`app-select${isOpen ? " app-select--open" : ""}${disabled ? " app-select--disabled" : ""}${menuPlacement === "top" ? " app-select--top" : ""}`}
    >
      {label ? (
        <LocalizedText
          as="label"
          id={labelId}
          className="app-select__label"
          text={label}
        />
      ) : null}

      <button
        ref={triggerRef}
        id={id}
        className="app-select__trigger"
        type="button"
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        aria-controls={menuId}
        aria-labelledby={label ? `${labelId} ${id}` : id}
        disabled={disabled}
        onClick={() => {
          if (isOpen) {
            closeMenu(false);
            return;
          }

          openMenu(Math.max(selectedIndex, 0));
        }}
        onKeyDown={handleTriggerKeyDown}
      >
        <LocalizedText
          as="span"
          className="app-select__value"
          text={selectedOption?.label ?? ""}
        />
        <span className="app-select__icon" aria-hidden="true">
          <HiOutlineChevronDown />
        </span>
      </button>

      {isOpen ? (
        <div
          className="app-select__menu"
          id={menuId}
          role="listbox"
          style={{ maxHeight: `${menuMaxHeight}px` }}
        >
          {options.map((option, index) => {
            const isSelected = option.value === value;

            return (
              <button
                key={String(option.value)}
                ref={(element) => {
                  optionRefs.current[index] = element;
                }}
                className={`app-select__option${index === activeIndex ? " app-select__option--active" : ""}${isSelected ? " app-select__option--selected" : ""}`}
                type="button"
                role="option"
                aria-selected={isSelected}
                onClick={() => selectOption(option.value)}
                onKeyDown={(event) => handleOptionKeyDown(event, index)}
                onMouseEnter={() => setActiveIndex(index)}
              >
                <LocalizedText as="span" text={option.label} />
                {isSelected ? (
                  <span className="app-select__check" aria-hidden="true">
                    <HiCheck />
                  </span>
                ) : null}
              </button>
            );
          })}
        </div>
      ) : null}
    </div>
  );
}

export default AppSelect;
