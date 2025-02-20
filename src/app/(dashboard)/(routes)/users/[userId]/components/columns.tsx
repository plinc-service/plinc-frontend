"use client";

import type { Plinc } from "@/interfaces/plincInterface";
import { ColumnDef } from "@tanstack/react-table";
import { ChevronRight } from "lucide-react";
import Image from "next/image";

const getStatusLabel = (plinc: Plinc): string => {
  if (plinc.cancelled || plinc.user_cancelled || plinc.pro_cancelled)
    return "Annuler";
  if (plinc.terminated_at) return "Terminer";
  if (plinc.confirmed) return "Confirmer";
  if (plinc.accepted) return "Accepter";
  return "En attente";
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
    id: "provider",
    header: "Prestataire",
    cell: ({ row }) => {
      const service = row.original.service;
      return (
        <div className="flex items-center gap-3 min-w-[150px]">
          <div className="h-8 w-8 rounded-full bg-neutral-100 flex items-center justify-center overflow-hidden">
            <Image
              width={32}
              height={32}
              src={service.owner.image_url || "/avatar.svg"}
              alt={service.owner.username}
              className="rounded-full"
            />
          </div>
          <span className="font-medium text-sm text-neutral-high">
            {service.owner.username}
          </span>
        </div>
      );
    },
  },
  {
    id: "serviceName",
    header: "Titre du service",
    cell: ({ row }) => {
      const service = row.original.service;
      return (
        <div className="min-w-[150px]">
          <span className="text-neutral-high">{service.name}</span>
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
      ): { bg: string; text: string; dot: string } => {
        switch (status) {
          case "En attente":
            return {
              bg: "bg-badge-warning-bg",
              dot: "bg-badge-warning-text",
              text: "text-badge-warning-text",
            };
          case "Accepter":
            return {
              bg: "bg-button-secondary-bg",
              dot: "bg-badge-secondary-text",
              text: "text-badge-secondary-text",
            };
          case "Annuler":
            return {
              bg: "bg-badge-danger-bg",
              dot: "bg-danger-background",
              text: "text-danger-background",
            };
          case "Confirmer":
            return {
              bg: "bg-badge-success-bg",
              dot: "bg-success-background",
              text: "text-success-background",
            };
          case "Terminer":
            return {
              bg: "bg-badge-tertiary-bg",
              dot: "bg-neutral-high",
              text: "text-neutral-high",
            };
          case "Rejeter":
            return {
              bg: "bg-badge-danger-bg",
              dot: "bg-danger-background",
              text: "text-danger-background",
            };
          case "En cours":
            return {
              bg: "bg-badge-primary-bg",
              dot: "bg-badge-primary",
              text: "text-badge-primary",
            };
          default:
            return {
              bg: "bg-slate-100",
              dot: "bg-slate-400",
              text: "text-neutral-high",
            };
        }
      };

      const style = getStatusStyle(status);

      return (
        <div className="min-w-[100px]">
          <span
            className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium ${style.bg} ${style.text}`}
          >
            <span className={`w-1.5 h-1.5 rounded-full ${style.dot}`} />
            {status}
          </span>
        </div>
      );
    },
  },
  {
    id: "price",
    header: "Montant",
    cell: ({ row }) => {
      return (
        <div className="min-w-[80px]">
          <span className="text-neutral-high">
            {row.original.service.hour_price}€
          </span>
        </div>
      );
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      void row; // Keep the row parameter for potential future use
      return (
        <div className="flex justify-end">
          <ChevronRight className="h-4 w-4 text-neutral-high" />
        </div>
      );
    },
  },
];
