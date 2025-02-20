"use client";

import { ColumnDef } from "@tanstack/react-table";

import type { Plinc } from "@/interfaces/plincInterface";

const getStatusLabel = (plinc: Plinc): string => {
  if (plinc.cancelled || plinc.user_cancelled || plinc.pro_cancelled)
    return "Annuler";
  if (plinc.terminated_at) return "Terminer";
  if (plinc.confirmed) return "Confirmé";
  if (plinc.accepted) return "Accepter";
  return "En attente";
};

export const columns: ColumnDef<Plinc>[] = [
  {
    id: "serviceName",
    header: "Service",
    cell: ({ row }) => {
      return (
        <div className="min-w-[200px]">
          <span className="text-neutral-high">
            {row.original.service.name}
          </span>
        </div>
      );
    },
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
      const plinc = row.original;
      const status = getStatusLabel(plinc);
      const getStatusStyle = (
        status: string
      ): { bg: string; text: string } => {
        switch (status) {
          case "En attente":
            return {
              bg: "bg-badge-warning-bg",
              text: "text-white",
            };
          case "Accepter":
            return {
              bg: "bg-badge-secondary-bg",
              text: "text-white",
            };
          case "Annuler":
            return {
              bg: "bg-badge-danger-bg",
              text: "text-white",
            };
          case "Confirmé":
            return {
              bg: "bg-badge-success-bg",
              text: "text-white",
            };
          case "Terminer":
            return {
              bg: "bg-badge-tertiary-bg",
              text: "text-white",
            };
          default:
            return {
              bg: "bg-slate-100",
              text: "text-white",
            };
        }
      };

      const style = getStatusStyle(status);

      return (
        <div className="min-w-[100px]">
          <span
            className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${style.bg} ${style.text}`}
          >
            {status}
          </span>
        </div>
      );
    },
  },
  {
    id: "price",
    header: "Prix",
    cell: ({ row }) => {
      return (
        <div className="min-w-[80px]">
          <span className="text-neutral-high">
            {row.original.service.hour_price}€/h
          </span>
        </div>
      );
    },
  }
];
