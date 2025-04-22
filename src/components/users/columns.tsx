"use client";
import { User } from "@/interfaces/userInterface";
import { ColumnDef } from "@tanstack/react-table";
import { ChevronRight } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/Avatar";

export const columns: ColumnDef<User>[] = [
  {
    accessorKey: "id",
    header: "ID",
    cell: ({ row }) => (
      <div className="w-32 min-w-[100px] truncate">
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
            <Avatar className="w-9 h-9">
              <AvatarImage src={user.image_url || undefined} alt={user.username} />
              <AvatarFallback>
                {user.username
                  ? user.username
                    .trim()
                    .split(" ")
                    .map((part) => part[0])
                    .join("")
                    .slice(0, 2)
                    .toUpperCase()
                  : "AD"}
              </AvatarFallback>
            </Avatar>
          </div>
          <div className="flex flex-col">
            <span className="text-sm text-neutral-high">
              {user.username}
            </span>
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
