"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { DataTable } from "@/components/users/data-table";
import { Search, AlignCenter, ChevronDown } from "lucide-react";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { columns } from "./columns";

const mockDataVendus = [
  {
    id: "00001",
    provider: {
      name: "John DOE",
      image: "/avatar.svg",
    },
    serviceTitle: "Cours de mathématiques",
    date: "15-09-2024",
    status: "Confirmé",
    amount: "150€",
  },
  {
    id: "00002",
    provider: {
      name: "John DOE",
      image: "/avatar.svg",
    },
    serviceTitle: "Cours de physique",
    date: "18-09-2024",
    status: "En attente",
    amount: "120€",
  },
  {
    id: "00003",
    provider: {
      name: "John DOE",
      image: "/avatar.svg",
    },
    serviceTitle: "Tutorat en anglais",
    date: "20-09-2024",
    status: "Terminé",
    amount: "90€",
  },
];

const UserPlincsVendus = () => {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = React.useState("");

  return (
    <div className="rounded-2xl p-2">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-8">
          <button
            onClick={() => router.push(".")}
            className="px-4 py-2 text-base text-neutral-medium font-medium hover:text-neutral-high transition-colors"
          >
            Achetés
          </button>
          <button
            className="px-4 py-2 text-base text-blue border-b-2 border-blue font-medium relative after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-blue"
          >
            Vendus
          </button>
        </div>
        <div className="flex items-center gap-2">
          <div className="relative w-[280px]">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-neutral-high" />
            <Input
              placeholder="Rechercher"
              className="pl-9 h-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <Button
            variant="outline"
            className="h-10 px-4 flex items-center gap-2 border border-neutral-low rounded-full"
          >
            <AlignCenter className="h-4 w-4" />
            <span>Trier par</span>
            <ChevronDown className="h-4 w-4 text-neutral-high" />
          </Button>
        </div>
      </div>
      <DataTable columns={columns} data={mockDataVendus} />
    </div>
  );
};

export default UserPlincsVendus;
