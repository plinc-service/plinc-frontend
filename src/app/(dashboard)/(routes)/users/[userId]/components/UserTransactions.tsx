"use client";

import React, { useEffect, useState } from "react";
import { MoveDiagonal, MoveDownRight, MoveUpRight } from "lucide-react";
import { fetchUserTransactionsHistory } from "@/services/UserService";
import { useParams } from "next/navigation";
import { Transaction } from "@/interfaces/transactionInterface";


const UserTransactions: React.FC = () => {
 
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const { userId } = useParams();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = {
      day: "2-digit",
      month: "long",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    };
    const date = new Date(dateString);
    return date.toLocaleDateString("fr-FR", options);
  };

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        if (!userId) return;
        const data = await fetchUserTransactionsHistory(userId.toString());
        setTransactions(data);
        console.log(data);
      } catch (error) {
        console.error(
          "Erreur lors de la récupération des transactions :",
          error
        );
      }
    };

    fetchTransactions();
  }, [userId]);

  if (!mounted) {
    return null;
  }

  return (
    <div className="p-5 rounded-3xl border border-brand-lower">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg text-neutral-high font-semibold">
          Historique des transactions
        </h2>
        <button className="text-neutral-high hover:text-blue transition-colors">
          <MoveDiagonal className="h-5 w-5" />
        </button>
      </div>
      <div className="divide-y divide-brand-lower">
        {transactions.length === 0 ? (
          <div className="py-4 text-center text-neutral-high text-base">
            Aucune donnée pour le moment
          </div>
        ) : (
          transactions.map((transaction) => (
            <div key={transaction.id} className="py-4 first:pt-0 last:pb-0">
              <div className="flex items-start gap-3">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    transaction.type === "retrait" ? "bg-red-50" : "bg-green-50"
                  }`}
                >
                  <span
                    className={`${
                      transaction.type === "retrait"
                        ? "text-red-500"
                        : "text-green-500"
                    }`}
                  >
                    {transaction.type === "retrait" ? (
                      <MoveUpRight className="h-4 w-4" />
                    ) : (
                      <MoveDownRight className="h-4 w-4" />
                    )}
                  </span>
                </div>
                <div className="flex-1">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="font-medium text-neutral-high">
                        {transaction.type === "retrait"
                          ? "Retrait"
                          : `Payement`}
                      </h3>
                      <p className="text-sm text-neutral-medium mt-1">
                        {transaction.description || 'Aucune description disponible'}
                      </p>
                      <p className="text-xs text-neutral-high mt-1">
                        {
                          formatDate(transaction.created_at)
                        }
                      </p>
                    </div>
                    <span
                      className={`font-medium ${
                        transaction.type === "retrait"
                          ? "text-red-500"
                          : "text-green-500"
                      }`}
                    >
                      {transaction.type === "retrait" ? "-" : "+"}
                      {transaction.amount}€
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default UserTransactions;
