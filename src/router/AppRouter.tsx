import { lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import { Layout } from "../components/Layout/Layout";
import { Loader } from "../components/Loader/Loader";

const HomePage = lazy(() => import("../pages/HomePage/HomePage"));
const PsychologistsPage = lazy(
  () => import("../pages/PsychologistsPage/PsychologistsPage"),
);
const FavoritesPage = lazy(
  () => import("../pages/FavoritesPage/FavoritesPage"),
);
const NotFoundPage = lazy(() => import("../pages/NotFoundPage/NotFoundPage"));

export const AppRouter = () => {
  return (
    <Suspense fallback={<Loader />}>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="psychologists" element={<PsychologistsPage />} />
          <Route path="favorites" element={<FavoritesPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </Suspense>
  );
};
