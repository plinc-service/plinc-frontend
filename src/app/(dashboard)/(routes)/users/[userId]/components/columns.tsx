"use client";

import Image from "next/image";
import { ColumnDef } from "@tanstack/react-table";
import { ChevronRight } from "lucide-react";

export type Plinc = {
  id: string;
  provider: {
    name: string;
    image: string;
  };
  serviceTitle: string;
  date: string;
  status: "En attente" | "Accepter" | "Annuler" | "Confirmé" | "Terminer";
  amount: string;
};

export const columns: ColumnDef<Plinc>[] = [
  {
    accessorKey: "id",
    header: "ID",
    cell: ({ row }) => (
      <div className="min-w-[80px]">
        <span className="text-neutral-high">#{row.getValue("id")}</span>
      </div>
    ),
  },
  {
    accessorKey: "provider",
    header: "Prestataire",
    cell: ({ row }) => {
      const provider = row.getValue("provider") as { name: string; image: string };
      return (
        <div className="flex items-center gap-3 min-w-[150px]">
          <div className="h-8 w-8 rounded-full bg-neutral-100 flex items-center justify-center overflow-hidden">
            <Image
              width={32}
              height={32}
              src={provider.image}
              alt={provider.name}
              className="rounded-full"
            />
          </div>
          <span className="font-medium text-sm text-neutral-high">{provider.name}</span>
        </div>
      );
    },
  },
  {
    accessorKey: "serviceTitle",
    header: "Titre du service",
    cell: ({ row }) => (
      <div className="min-w-[200px]">
        <span className="text-neutral-high">{row.getValue("serviceTitle")}</span>
      </div>
    ),
  },
  {
    accessorKey: "date",
    header: "Date",
    cell: ({ row }) => (
      <div className="min-w-[100px]">
        <span className="text-neutral-high">{row.getValue("date")}</span>
      </div>
    ),
  },
  {
    accessorKey: "status",
    header: "Statut",
    cell: ({ row }) => {
      const status = row.getValue("status") as string;
      const getStatusStyle = (status: string) => {
        switch (status) {
          case "En attente":
            return "bg-badge-warning-bg text-white font-medium";
          case "Accepter":
            return "bg-badge-secondary-bg text-blue font-medium";
          case "Annuler":
            return "bg-badge-danger-bg text-white font-medium";
          case "Confirmé":
            return "bg-badge-success-bg text-white font-medium";
          case "Terminer":
            return "bg-badge-tertiary-bg text-[#475569] font-medium";
          default:
            return "bg-slate-100 text-neutral-high";
        }
      };

      return (
        <div className="min-w-[100px]">
          <span className={`px-3 py-1 rounded-full text-sm ${getStatusStyle(status)}`}>
            {status}
          </span>
        </div>
      );
    },
  },
  {
    accessorKey: "amount",
    header: "Montant",
    cell: ({ row }) => (
      <div className="min-w-[80px]">
        <span className="text-neutral-high">{row.getValue("amount")}</span>
      </div>
    ),
  },
  {
    id: "actions",
    cell: () => (
      <div className="flex justify-end">
        <ChevronRight className="h-4 w-4 text-neutral-high" />
      </div>
    ),
  },
];
