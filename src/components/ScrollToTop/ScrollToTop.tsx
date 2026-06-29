import clsx from "clsx";
import { useEffect, useState } from "react";
import css from "./ScrollToTop.module.css";
import { FaArrowUp } from "react-icons/fa";

export const ScrollToTop = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };
    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <button
      className={clsx(css.scrollToTopButton, {
        [css.visible]: isVisible,
      })}
      onClick={scrollToTop}
      aria-label="Scroll to top"
    >
      <FaArrowUp size={20} />
    </button>
  );
};
