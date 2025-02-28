import { User } from "@/interfaces/userInterface";
import { useEffect, useState } from "react";
import { AuthService } from "../services/AuthService";

export const useCurrentUser = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadUser = () => {
      try {
        const userData = AuthService.getUser();
        setUser(userData);
      } catch (error) {
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    loadUser();

    const handleStorageChange = (event: StorageEvent) => {
      if (event.key === "auth-user") {
        loadUser();
      }
    };

    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  return { user, loading };
};
