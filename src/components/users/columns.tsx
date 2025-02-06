"use client";
import Image from "next/image";
import { ColumnDef } from "@tanstack/react-table";
import { ChevronRight } from "lucide-react";
import { User } from "@/interfaces/userInterface";

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
              src={user.image_url || "/avatar.svg"}
              alt={user.username}
              className="rounded-full"
            />
          </div>
          <div className="flex flex-col">
            <span className="font-medium text-sm text-neutral-high">{user.username}</span>
            {user.profession && (
              <span className="text-xs text-neutral-medium">{user.profession}</span>
            )}
          </div>
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
    id: "address",
    header: "Adresse",
    cell: ({ row }) => {
      const user = row.original;
      const address = user.address_client || user.address_prestataire;
      return (
        <div className="min-w-[200px]">
          <span className="text-muted-foreground">{address || "-"}</span>
        </div>
      );
    },
  },
  {
    accessorKey: "date_joined",
    header: "Inscrit le",
    cell: ({ row }) => {
      const date = new Date(row.getValue("date_joined"));
      return (
        <div className="min-w-[120px]">
          <span className="text-muted-foreground">
            {date.toLocaleDateString("fr-FR")}
          </span>
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
