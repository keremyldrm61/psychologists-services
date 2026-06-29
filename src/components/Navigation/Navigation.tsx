import { NavLink } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import clsx from "clsx";
import css from "./Navigation.module.css";

interface NavigationProps {
  onCloseMenu?: () => void;
}

export const Navigation = ({ onCloseMenu }: NavigationProps) => {
  const { currentUser } = useAuth();
  const buildLinkClass = ({ isActive }: { isActive: boolean }) =>
    clsx(css.navLink, isActive && css.navLinkActive);

  return (
    <nav className={css.nav}>
      <NavLink to="/" className={buildLinkClass} onClick={onCloseMenu}>
        Home
      </NavLink>
      <NavLink
        to="/psychologists"
        className={buildLinkClass}
        onClick={onCloseMenu}
      >
        Psychologists
      </NavLink>
      {currentUser && (
        <NavLink
          to="/favorites"
          className={buildLinkClass}
          onClick={onCloseMenu}
        >
          Favorites
        </NavLink>
      )}
    </nav>
  );
};
