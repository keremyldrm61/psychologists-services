import { useState, useEffect, useCallback } from "react";
import { onAuthStateChanged, signOut, type User } from "firebase/auth";
import { auth } from "../firebase/firebase";

export interface UseAuthReturn {
  currentUser: User | null;
  loading: boolean;
  logOut: () => Promise<void>;
}

export const useAuth = (): UseAuthReturn => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(
      auth,
      (user) => {
        setCurrentUser(user);
        setLoading(false);
      },
      (error) => {
        console.error("An error occurred while checking the authentication status:", error);
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, []);

  // logOut fonksiyonunu her render'da yeniden oluşturmamak için useCallback kullanıyoruz
  // Çıkış işlemi asenkron olduğu için try-catch bloğu ile sarmalıyoruz
  const logOut = useCallback(async (): Promise<void> => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error("An error occurred while logging out:", error);
      // Hatayı UI tarafında (örneğin bir Toast mesajı ile) göstermek istersek diye fırlatıyoruz
      throw error; 
    }
  }, []);

  return {
    currentUser,
    loading,
    logOut,
  };
};