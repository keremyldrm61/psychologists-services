import { useEffect, useState, useCallback } from "react";
import { ref, onValue, set, remove } from "firebase/database";
import { database } from "../firebase/firebase";
import { DB_ROOT } from "../utils/constants";
import { useAuth } from "./useAuth";

export interface UseFavoritesReturn {
  favorites: string[];
  loadingFavorites: boolean;
  isToggling: boolean;
  error: Error | null;
  toggleFavorite: (psychologistId: string) => Promise<void>;
}

export const useFavorites = (): UseFavoritesReturn => {
  const { currentUser } = useAuth();

  const [favorites, setFavorites] = useState<string[]>([]);
  const [loadingFavorites, setLoadingFavorites] = useState<boolean>(!!currentUser);
  const [isToggling, setIsToggling] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);

  // Önceki kullanıcıyı takip etmek için bir state tutuyoruz
  const [prevUserId, setPrevUserId] = useState<string | undefined>(currentUser?.uid);

  // Kullanıcı değiştiyse (giriş/çıkış) state'leri render anında anında sıfırlıyoruz
  if (currentUser?.uid !== prevUserId) {
    setPrevUserId(currentUser?.uid);
    setFavorites([]); // Önceki kullanıcının favorilerini anında sil
    setLoadingFavorites(!!currentUser); // Kullanıcı varsa loading'i başlat, yoksa kapat
    setError(null);
  }

  useEffect(() => {
    if (!currentUser) return; 

    const favoritesRef = ref(
      database,
      `${DB_ROOT}/psychologists/users/${currentUser.uid}/favorites`
    );

    // Asenkron veri çekme işlemi
    const unsubscribe = onValue(
      favoritesRef,
      (snapshot) => {
        if (snapshot.exists()) {
          const data = snapshot.val();
          setFavorites(Object.keys(data));
        } else {
          setFavorites([]);
        }
        setLoadingFavorites(false);
        setError(null);
      },
      (err) => {
        console.error("Error fetching favorites:", err);
        setError(err);
        setLoadingFavorites(false);
      }
    );

    return () => unsubscribe();
  }, [currentUser]);

  const toggleFavorite = useCallback(
    async (psychologistId: string) => {
      if (!currentUser) {
        console.warn("User login is required for the Favorites feature.");
        return;
      }

      setIsToggling(true);
      setError(null);

      const favoriteRef = ref(
        database,
        `${DB_ROOT}/psychologists/users/${currentUser.uid}/favorites/${psychologistId}`
      );

      try {
        if (favorites.includes(psychologistId)) {
          await remove(favoriteRef);
        } else {
          await set(favoriteRef, true);
        }
      } catch (err) {
        const errorObj = err instanceof Error ? err : new Error("Favori işlemi başarısız oldu.");
        console.error(
          `Failed to update favorite status for psychologist (ID: ${psychologistId}).`,
          errorObj
        );
        setError(errorObj);
      } finally {
        setIsToggling(false);
      }
    },
    [currentUser, favorites]
  );

  return {
    favorites,
    loadingFavorites,
    isToggling,
    error,
    toggleFavorite,
  };
};