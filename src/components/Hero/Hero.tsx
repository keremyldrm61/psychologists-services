import { Link } from "react-router-dom";
import heroImage from "../../assets/images/woman.png";
import {
  CheckIcon,
  PeoplesIcon,
  QuestionMarkIcon,
  UpRightArrowIcon,
} from "../../assets/icons";
import clsx from "clsx";
import css from "./Hero.module.css";

export const Hero = () => {
  return (
    <section className={css.heroSection}>
      {/* Sol Taraf İçerikleri */}
      <div className={css.content}>
        <h1 className={css.title}>
          The road to the <span className={css.italicAccent}>depths</span> of
          the human soul
        </h1>
        <p className={css.description}>
          We help you to reveal your potential, overcome challenges and find a
          guide in your own life with the help of our experienced psychologists.
        </p>
        <Link to="/psychologists" className={css.psychologistLinkButton}>
          Get started
          <UpRightArrowIcon />
        </Link>
      </div>

        {/* Sağ Taraf İçerikleri */}
      <div className={css.imageContainer}>
        <img
          src={heroImage}
          alt="Psychologist woman"
          className={css.heroImage}
        />

        <div className={clsx(css.avatar, css.usersIcon)}>
          <PeoplesIcon />
        </div>

        <div className={clsx(css.avatar, css.questionIcon)}>
          <QuestionMarkIcon />
        </div>

        <div className={clsx(css.avatar, css.experienceCheck)}>
          <div className={css.checkIconWrapper}>
            <CheckIcon />
          </div>

          <div className={css.textWrapper}>
            <span className={css.experienceText}>
              Experienced psychologists
            </span>
            <div className={css.experienceCount}>15,000</div>
          </div>
        </div>
      </div>
    </section>
  );
};
