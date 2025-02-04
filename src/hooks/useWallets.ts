"use client";

import { Wallet } from "@/interfaces/userCardInterface";
import { useEffect, useState } from "react";
import { fetchWallets } from "../services/WalletService";

export interface Pagination {
  previous?: string | null;
  next?: string | null;
}

export const useWallets = () => {
  const [wallets, setWallets] = useState<Wallet[]>([]);
  const [pagination, setPagination] = useState<Pagination>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = async () => {
    try {
      setLoading(true);
      const data = await fetchWallets();
      setWallets(data.data);
      setPagination({ previous: data.previous, next: data.next });
      setError(null);
    } catch (err) {
      console.error("Erreur lors de la récupération des données :", err);
      setError("Une erreur est survenue lors du chargement des données.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return { wallets, pagination, loading, error, fetchData };
};
