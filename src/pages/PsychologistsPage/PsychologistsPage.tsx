import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { ref, get } from "firebase/database";
import { database } from "../../firebase/firebase";
import {
  ITEMS_PER_PAGE,
  PSYCHOLOGIST_FILTERS,
} from "../../utils/constants";
import type {
  Psychologist,
  PsychologistFilterOption,
} from "../../types/psychologist";
import { PsychologistCard } from "../../components/PsychologistCard/PsychologistCard";
import { Filters } from "../../components/Filters/Filters";
import { Loader } from "../../components/Loader/Loader";
import { useFavorites } from "../../hooks/useFavorites";
import { useAuth } from "../../hooks/useAuth";
import { usePsychologistFilter } from "../../hooks/usePsychologistFilter";
import css from "./PsychologistsPage.module.css";

const PsychologistsPage = () => {
  const [allPsychologists, setAllPsychologists] = useState<Psychologist[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [filter, setFilter] = useState<PsychologistFilterOption>(
    PSYCHOLOGIST_FILTERS.SHOW_ALL,
  );
  const [visibleCount, setVisibleCount] = useState<number>(ITEMS_PER_PAGE);

  const { favorites, toggleFavorite } = useFavorites();
  const { currentUser } = useAuth();

  const filteredPsychologists = usePsychologistFilter(allPsychologists, filter);

  useEffect(() => {
    const fetchPsychologists = async () => {
      setLoading(true);
      try {
        const rootRef = ref(database, "psychologists");
        const rootSnapshot = await get(rootRef);

        if (rootSnapshot.exists()) {
          const data = rootSnapshot.val();

          const list: Psychologist[] = Object.keys(data)
            .map((key) => ({
              id: key,
              ...data[key],
            }))
            .filter((item) => item.name && item.price_per_hour);

          setAllPsychologists(list);
        } else {
          // Veri yoksa array'i boşalt
          setAllPsychologists([]);
        }
      } catch (error) {
        console.error("Error fetching psychologists:", error);
        toast.error("An error occurred while loading the list of psychologists.");
      } finally {
        setLoading(false);
      }
    };

    fetchPsychologists();
  }, []);

  const visiblePsychologists = filteredPsychologists.slice(0, visibleCount);

  const handleLoadMore = () => {
    setVisibleCount((prev) => prev + ITEMS_PER_PAGE);
  };

  const handleFavoriteToggle = async (id: string) => {
    if (!currentUser) {
      toast.error("Please log in to add to favorites");
      return;
    }
    await toggleFavorite(id);
  };

  return (
    <section className={css.section}>
      <div className={css.container}>
        <Filters onFilterChange={setFilter} />

        {loading ? (
          <Loader />
        ) : (
          <>
            <div className={css.list}>
              {visiblePsychologists.length > 0 ? (
                visiblePsychologists.map((psychologist) => (
                  <PsychologistCard
                    key={psychologist.id}
                    psychologist={psychologist}
                    isFavorite={favorites.includes(psychologist.id)}
                    onToggleFavorite={() =>
                      handleFavoriteToggle(psychologist.id)
                    }
                  />
                ))
              ) : (
                <p className={css.noResults}>
                  No psychologists matching your search criteria were found.
                </p>
              )}
            </div>

            {visibleCount < filteredPsychologists.length && (
              <button className={css.loadMoreButton} onClick={handleLoadMore}>
                Load more
              </button>
            )}
          </>
        )}
      </div>
    </section>
  );
};

export default PsychologistsPage;
