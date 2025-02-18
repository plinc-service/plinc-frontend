// eslint-disable-next-line @typescript-eslint/no-unused-vars
"use client";

import Image from "next/image";
import { ColumnDef } from "@tanstack/react-table";
import { ChevronRight } from "lucide-react";

import type { Plinc } from '@/interfaces/plincInterface';

export const getStatusLabel = (plinc: Plinc): string => {
  if (plinc.rejected) return "Rejeté";
  if (plinc.cancelled || plinc.user_cancelled || plinc.pro_cancelled) return "Annulé";
  if (plinc.terminated_at) return "Terminé";
  if (plinc.started_at) return "En cours";
  if (plinc.confirmed) return "Confirmé";
  if (plinc.accepted) return "Accepté";
  return "En attente";
};

export const columns = (): ColumnDef<Plinc>[] => [
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
          <span className="font-medium text-sm text-neutral-high">{service.owner.username}</span>
        </div>
      );
    },
  },
  {
    id: "serviceName",
    header: "Service",
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
    cell: ({ row }) => {
      const date = new Date(row.getValue("date"));
      return (
        <div className="min-w-[100px]">
          <span className="text-neutral-high">
            {date.toLocaleDateString("fr-FR", {
              year: "numeric",
              month: "2-digit",
              day: "2-digit",
            })}
          </span>
        </div>
      );
    },
  },
  {
    id: "status",
    header: "Statut",
    cell: ({ row }) => {
      const plinc = row.original;
      const status = getStatusLabel(plinc);
      const getStatusStyle = (status: string): { bg: string; dot: string; text: string } => {
        switch (status) {
          case "En attente":
            return {
              bg: "bg-badge-warning-bg",
              dot: "bg-badge-warning",
              text: "text-badge-warning"
            };
          case "Accepté":
            return {
              bg: "bg-badge-success-bg",
              dot: "bg-badge-success",
              text: "text-badge-success"
            };
          case "Annulé":
            return {
              bg: "bg-badge-error-bg",
              dot: "bg-badge-error",
              text: "text-badge-error"
            };
          case "Confirmé":
            return {
              bg: "bg-badge-primary-bg",
              dot: "bg-badge-primary",
              text: "text-badge-primary"
            };
          case "Terminé":
            return {
              bg: "bg-badge-tertiary-bg",
              dot: "bg-slate-400",
              text: "text-[#475569]"
            };
          case "Rejeté":
            return {
              bg: "bg-badge-error-bg",
              dot: "bg-badge-error",
              text: "text-badge-error"
            };
          case "En cours":
            return {
              bg: "bg-badge-primary-bg",
              dot: "bg-badge-primary",
              text: "text-badge-primary"
            };
          default:
            return {
              bg: "bg-slate-100",
              dot: "bg-slate-400",
              text: "text-neutral-high"
            };
        }
      };

      const style = getStatusStyle(status);

      return (
        <div className="min-w-[100px]">
          <span className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium ${style.bg} ${style.text}`}>
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
      const service = row.original.service;
      return (
        <div className="min-w-[80px]">
          <span className="text-neutral-high">{service.hour_price}€</span>
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

export const enhanceColumnsWithRowClick = (
  columns: ColumnDef<Plinc>[],
  onRowClick: (id: number) => void
): ColumnDef<Plinc>[] => {
  return columns.map(column => ({
    ...column,
    cell: (props) => {
      const cellContent = typeof column.cell === 'function' 
        ? column.cell(props)
        : props.getValue();

      return (
        <div
          className="cursor-pointer"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            onRowClick(props.row.getValue("id") as number);
          }}
        >
          {cellContent}
        </div>
      );
    },
  }));
};
