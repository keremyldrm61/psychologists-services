import css from "./Loader.module.css";

export const Loader = () => {
  return (
    <div className={css.loaderContainer} role="status" aria-label="Loading...">
      <div className={css.spinner}></div>
    </div>
  );
};
