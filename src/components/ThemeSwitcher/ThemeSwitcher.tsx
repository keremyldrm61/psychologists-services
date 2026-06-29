import { useState, useEffect } from "react";
import { FaPalette, FaCheck } from "react-icons/fa";
import type { Theme } from "../../types/psychologist";
import { themes } from "../../utils/constants";
import css from "./ThemeSwitcher.module.css";
import clsx from "clsx";

export const ThemeSwitcher = () => {
  const [isOpen, setIsOpen] = useState(false);
    const [currentTheme, setCurrentTheme] = useState<Theme>(() => {
        if (typeof window !== "undefined") {
            const savedTheme = localStorage.getItem("app-theme") as Theme;
            return savedTheme || "orange";
        }
        return "orange";
  });

  useEffect(() => {
      document.documentElement.setAttribute("data-theme", currentTheme);
  }, [currentTheme]);

  const handleChangeTheme = (theme: Theme) => {
    setCurrentTheme(theme);
    localStorage.setItem("app-theme", theme);
    setIsOpen(false);
  };

  return (
    <div className={css.container}>
      <div className={clsx(css.options, { [css.open]: isOpen })}>
        {themes.map((theme) => (
          <button
            key={theme.id}
            aria-label={`Switch to ${theme.id} theme`}
            className={clsx(css.optionButton, {
              [css.active]: currentTheme === theme.id,
            })}
            style={{ backgroundColor: theme.color }}
            onClick={() => handleChangeTheme(theme.id)}
          >
            {currentTheme === theme.id && <FaCheck size={12} color="#fff" />}
          </button>
        ))}
      </div>
      <button
        aria-label="Toggle theme switcher"
        className={css.mainButton}
        onClick={() => setIsOpen((prev) => !prev)}
      >
        <FaPalette size={20} />
      </button>
    </div>
  );
};
