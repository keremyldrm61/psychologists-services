import { Outlet } from "react-router-dom";
import { Header } from "../Header/Header";
import { InteractiveActions } from "../InteractiveActions/InteractiveActions";
import css from "./Layout.module.css";

export const Layout = () => {
  return (
    <div className={css.container}>
      <Header />
      <main>
        <Outlet />
      </main>
      <InteractiveActions />
    </div>
  );
};
