import { useState } from "react";
import { useAuth } from "../../hooks/useAuth";
import { Link } from "react-router-dom";
import { FaBars, FaTimes, FaUser } from "react-icons/fa";
import { Navigation } from "../Navigation/Navigation";
import { useModal } from "../../hooks/useModal";
import { LoginForm } from "../LoginForm/LoginForm";
import { RegistrationForm } from "../RegistrationForm/RegistrationForm";
import { Modal } from "../Modal/Modal";
import clsx from "clsx";
import css from "./Header.module.css";

export const Header = () => {
  const { currentUser, logOut } = useAuth();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const loginModal = useModal();
  const registerModal = useModal();

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen((prev) => !prev);
  };

  const closeMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <header className={css.header}>
      <Link
        to="/"
        className={css.logo}
        aria-label="PsychologistsServices home"
        onClick={closeMenu}
      >
        psychologists.<span>services</span>
      </Link>

      <div
        className={clsx(css.menuContainer, { [css.mobileMenuOpen]: isMobileMenuOpen })}
      >
        <Navigation onCloseMenu={closeMenu} />

        <div className={css.authContainer}>
          {!currentUser ? (
            <>
              <button
                className={css.loginButton}
                onClick={() => {
                  loginModal.open();
                  setIsMobileMenuOpen(false);
                }}
              >
                Log In
              </button>
              <button
                className={css.registerButton}
                onClick={() => {
                  registerModal.open();
                  setIsMobileMenuOpen(false);
                }}
              >
                Registration
              </button>
            </>
          ) : (
            <div className={css.userContainer}>
              <div className={css.userInfo}>
                <div className={css.userAvatar}>
                  <FaUser size={20} />
                </div>
                <span className={css.userName}>{currentUser.displayName}</span>
              </div>
              <button
                className={css.logoutButton}
                onClick={() => {
                  logOut();
                  setIsMobileMenuOpen(false);
                }}
              >
                Log out
              </button>
            </div>
          )}
        </div>
      </div>

      <button
        type="button"
        aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
        aria-expanded={isMobileMenuOpen}
        className={css.toggleButton}
        onClick={toggleMobileMenu}
      >
        {isMobileMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
      </button>

      {loginModal.isOpen && (
        <Modal onClose={loginModal.close}>
          <LoginForm onClose={loginModal.close} />
        </Modal>
      )}

      {registerModal.isOpen && (
        <Modal onClose={registerModal.close}>
          <RegistrationForm onClose={registerModal.close} />
        </Modal>
      )}
    </header>
  );
};
