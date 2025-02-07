"use client";

import React from "react";
import { MoveDiagonal, MoveDownRight, MoveUpRight } from "lucide-react";

interface Transaction {
  id: number;
  type: "retrait" | "payment";
  amount: number;
  description: string;
  date: string;
  reference?: string;
}

const UserTransactions: React.FC = () => {
  const transactions: Transaction[] = [
    {
      id: 1,
      type: "retrait",
      amount: 75,
      description: "Contrôle de l'arrosage des plantes, des fleurs et des gazons pour maintenir une croissance saine.",
      date: "Lundi 30 Septembre à 09:00",
    },
    {
      id: 2,
      type: "payment",
      amount: 75,
      description: "Contrôle de l'arrosage des plantes, des fleurs et des gazons pour maintenir une croissance saine.",
      date: "Lundi 30 Septembre à 09:00",
      reference: "PlinC 12345",
    },
    {
      id: 3,
      type: "payment",
      amount: 75,
      description: "Contrôle de l'arrosage des plantes, des fleurs et des gazons pour maintenir une croissance saine.",
      date: "Lundi 30 Septembre à 09:00",
      reference: "PlinC 12345",
    },
    {
      id: 4,
      type: "payment",
      amount: 75,
      description: "Contrôle de l'arrosage des plantes, des fleurs et des gazons pour maintenir une croissance saine.",
      date: "Lundi 30 Septembre à 09:00",
      reference: "PlinC 12345",
    },
    {
      id: 5,
      type: "payment",
      amount: 75,
      description: "Contrôle de l'arrosage des plantes, des fleurs et des gazons pour maintenir une croissance saine.",
      date: "Lundi 30 Septembre à 09:00",
      reference: "PlinC 12345",
    },
  ];

  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

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
        {transactions.map((transaction) => (
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
                  {transaction.type === "retrait" ? 
                    <MoveUpRight className="h-4 w-4" /> : 
                    <MoveDownRight className="h-4 w-4" />
                  }
                </span>
              </div>
              <div className="flex-1">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="font-medium text-neutral-high">
                      {transaction.type === "retrait"
                        ? "Retrait"
                        : `Payement ${transaction.reference}`}
                    </h3>
                    <p className="text-sm text-neutral-medium mt-1">
                      {transaction.description}
                    </p>
                    <p className="text-xs text-neutral-high mt-1">
                      {transaction.date}
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
        ))}
      </div>
    </div>
  );
};

export default UserTransactions;
