"use client";

import Image from "next/image";
import { ColumnDef } from "@tanstack/react-table";
import { ChevronRight } from "lucide-react";

import type { Plinc } from '@/interfaces/plincInterface';

const getStatusLabel = (plinc: Plinc): string => {
  if (plinc.cancelled || plinc.user_cancelled || plinc.pro_cancelled) return 'Annuler';
  if (plinc.terminated_at) return 'Terminer';
  if (plinc.confirmed) return 'Confirmé';
  if (plinc.accepted) return 'Accepter';
  return 'En attente';
};

export const columns: ColumnDef<Plinc>[] = [
  {
    accessorKey: "id",
    header: "ID",
    cell: ({ row }) => (
      <div className="min-w-[80px]">
        <span className="text-neutral-high">#{String(row.getValue("id")).padStart(5, '0')}</span>
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
    header: "Titre du service",
    cell: ({ row }) => {
      const service = row.original.service;
      return (
        <div className="min-w-[200px]">
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
      const getStatusStyle = (status: string): { bg: string; dot: string; text: string } => {
        switch (status) {
          case "En attente":
            return {
              bg: "bg-badge-warning-bg",
              dot: "bg-orange-300",
              text: "text-white"
            };
          case "Accepter":
            return {
              bg: "bg-badge-secondary-bg",
              dot: "bg-blue-300",
              text: "text-blue"
            };
          case "Annuler":
            return {
              bg: "bg-badge-danger-bg",
              dot: "bg-red-300",
              text: "text-white"
            };
          case "Confirmé":
            return {
              bg: "bg-badge-success-bg",
              dot: "bg-green-300",
              text: "text-white"
            };
          case "Terminer":
            return {
              bg: "bg-badge-tertiary-bg",
              dot: "bg-slate-400",
              text: "text-[#475569]"
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
    cell: () => (
      <div className="flex justify-end">
        <ChevronRight className="h-4 w-4 text-neutral-high" />
      </div>
    ),
  },
];
