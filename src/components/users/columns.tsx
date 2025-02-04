"use client";
import Image from "next/image";
import { ColumnDef } from "@tanstack/react-table";
import { ChevronRight } from "lucide-react";

export type User = {
  id: string;
  username: string;
  email: string;
  address: string;
  createdAt: string;
};

export const columns: ColumnDef<User>[] = [
  {
    accessorKey: "id",
    header: "ID",
    cell: ({ row }) => (
      <div className="min-w-[100px]">
        <span className="text-muted-foreground">{row.getValue("id")}</span>
      </div>
    ),
  },
  {
    accessorKey: "username",
    header: "Nom d'utilisateur",
    cell: ({ row }) => {
      const user = row.original;
      return (
        <div className="flex items-center gap-3 min-w-[200px]">
          <div className="rounded-full bg-neutral-100 flex items-center justify-center overflow-hidden">
            <Image
              width={36}
              height={36}
              src="/avatar.svg"
              alt={user.username}
              className="rounded-full"
            />
          </div>
          <span className="font-medium text-sm text-neutral-high">{user.username}</span>
        </div>
      );
    },
  },
  {
    accessorKey: "email",
    header: "Email",
    cell: ({ row }) => (
      <div className="min-w-[200px]">
        <span className="text-muted-foreground">{row.getValue("email")}</span>
      </div>
    ),
  },
  {
    accessorKey: "address",
    header: "Adresse",
    cell: ({ row }) => (
      <div className="min-w-[120px]">
        <span className="text-muted-foreground">{row.getValue("address")}</span>
      </div>
    ),
  },
  {
    accessorKey: "createdAt",
    header: "Inscrit le",
    cell: ({ row }) => (
      <div className="min-w-[120px]">
        <span className="text-muted-foreground">
          {row.getValue("createdAt")}
        </span>
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
