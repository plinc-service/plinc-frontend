"use client";

import Image from "next/image";
import { ColumnDef } from "@tanstack/react-table";
import { ChevronRight } from "lucide-react";

import type { Plinc } from "@/interfaces/plincInterface";

export const getStatusLabel = (plinc: number): string => {
  switch (plinc) {
    case 0:
      return "En attente";
    case 1:
      return "Accepter";
    case 2:
      return "Rejeter";
    case 3:
      return "Confirmer";
    case 4:
      return "Annuler";
    case 5:
      return "En cours";
    case 6:
      return "Livré";
    case 7:
      return "Litigé";
    case 8:
      return "Terminer";
    default:
      return "En attente";
  }
};

export const columns = (): ColumnDef<Plinc>[] => {

  return [
    {
      accessorKey: "id",
      header: "ID",
      cell: ({ row }) => {
        const id = row.getValue("id");

        return (
          <div className="min-w-[80px]">
            <span className="text-neutral-high">#{String(id)}</span>
          </div>
        );
      },
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
        const dateValue = row.getValue("date");

        try {
          const date = new Date(dateValue as string);
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
        } catch (error) {
          console.error("[columns] Error formatting date:", error);
          return (
            <div className="min-w-[100px]">
              <span className="text-neutral-high">Date invalide</span>
            </div>
          );
        }
      },
    },
    {
      id: "status",
      header: "Statut",
      cell: ({ row }) => {
        const plinc = row.original;

        const status = getStatusLabel(plinc.status);
        const getStatusStyle = (
          status: string
        ): { bg: string; dot: string; text: string } => {
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
        void row; 
        return (
          <div className="flex justify-end">
            <ChevronRight className="h-4 w-4 text-neutral-high" />
          </div>
        );
      },
    },
  ];
};

export const enhanceColumnsWithRowClick = (
  columns: ColumnDef<Plinc>[],
  onRowClick: (id: number) => void
): ColumnDef<Plinc>[] => {

  return columns.map((column) => ({
    ...column,
    cell: (props) => {
      const cellContent =
        typeof column.cell === "function"
          ? column.cell(props)
          : props.getValue();

      return (
        <div
          className="cursor-pointer"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            const id = props.row.getValue("id") as number;

            onRowClick(id);
          }}
        >
          {cellContent}
        </div>
      );
    },
  }));
};
