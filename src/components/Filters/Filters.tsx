import { useState, useRef, useEffect } from "react";
import { FaChevronDown } from "react-icons/fa";
import { PSYCHOLOGIST_FILTERS } from "../../utils/constants"; 
import { type PsychologistFilterOption } from "../../types/psychologist";
import clsx from "clsx";
import css from "./Filters.module.css";

interface FiltersProps {
  onFilterChange: (filter: PsychologistFilterOption) => void;
}

const filterOptions = Object.values(PSYCHOLOGIST_FILTERS);

export const Filters = ({ onFilterChange }: FiltersProps) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [selected, setSelected] = useState<PsychologistFilterOption>(PSYCHOLOGIST_FILTERS.SHOW_ALL);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleSelect = (option: PsychologistFilterOption) => {
    setSelected(option);
    onFilterChange(option);
    setIsOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleKeyDown);
    
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <div className={css.filtersContainer}>
      <label id="filters-label" className={css.label}>Filters</label>
      <div className={css.selectWrapper} ref={dropdownRef}>
        <button
          className={css.triggerButton}
          onClick={() => setIsOpen((prev) => !prev)}
          type="button"
          aria-expanded={isOpen}
          aria-haspopup="listbox"
          aria-labelledby="filters-label"
        >
          {selected}
          <FaChevronDown
            className={clsx(css.chevron, {
              [css.chevronOpen]: isOpen,
            })}
            size={14}
            aria-hidden="true"
          />
        </button>

        {isOpen && (
          <ul 
            className={css.dropdownMenu} 
            role="listbox" 
            aria-labelledby="filters-label"
          >
            {filterOptions.map((option) => (
              <li key={option} role="none">
                <button
                  type="button"
                  role="option"
                  aria-selected={selected === option}
                  className={clsx(css.option, {
                    [css.selectedOption]: selected === option,
                  })}
                  onClick={() => handleSelect(option)}
                >
                  {option}
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};