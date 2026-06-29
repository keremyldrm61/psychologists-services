import { ThemeSwitcher } from "../ThemeSwitcher/ThemeSwitcher";
import { ScrollToTop } from "../ScrollToTop/ScrollToTop";
import css from "./InteractiveActions.module.css";

export const InteractiveActions = () => {
    return (
        <div className={css.container}>
            <ThemeSwitcher />
            <ScrollToTop />
        </div>
    )
};