"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { DataTable } from "@/components/users/data-table";
import { columns, type Plinc } from "./columns";
import { Search, AlignCenter, ChevronDown } from "lucide-react";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";

const mockData: Plinc[] = [
  {
    id: "00001",
    provider: {
      name: "John DOE",
      image: "/avatar.svg",
    },
    serviceTitle: "Arrosage de plantes",
    date: "12-09-2024",
    status: "En attente",
    amount: "100€",
  },
  {
    id: "00002",
    provider: {
      name: "Alice SMITH",
      image: "/avatar.svg",
    },
    serviceTitle: "Rendez-vous chez le dentiste",
    date: "15-09-2024",
    status: "Accepter",
    amount: "80€",
  },
  {
    id: "00003",
    provider: {
      name: "Michael BROWN",
      image: "/avatar.svg",
    },
    serviceTitle: "Réunion d'équipe",
    date: "18-09-2024",
    status: "Annuler",
    amount: "120€",
  },
  {
    id: "00004",
    provider: {
      name: "Sophie JOHNSON",
      image: "/avatar.svg",
    },
    serviceTitle: "Achats de fournitures",
    date: "20-09-2024",
    status: "Accepter",
    amount: "50€",
  },
  {
    id: "00005",
    provider: {
      name: "David MILLER",
      image: "/avatar.svg",
    },
    serviceTitle: "Préparation du rapport",
    date: "22-09-2024",
    status: "Accepter",
    amount: "90€",
  },
  {
    id: "00006",
    provider: {
      name: "Emma MARTINEZ",
      image: "/avatar.svg",
    },
    serviceTitle: "Analyse de marché",
    date: "25-09-2024",
    status: "Confirmé",
    amount: "110€",
  },
  {
    id: "00007",
    provider: {
      name: "Ryan GARCIA",
      image: "/avatar.svg",
    },
    serviceTitle: "Formation en ligne",
    date: "27-09-2024",
    status: "Accepter",
    amount: "70€",
  },
  {
    id: "00008",
    provider: {
      name: "Olivia LEE",
      image: "/avatar.svg",
    },
    serviceTitle: "Préparation du plan de projet",
    date: "30-09-2024",
    status: "Confirmé",
    amount: "130€",
  },
  {
    id: "00009",
    provider: {
      name: "William RODRIGUEZ",
      image: "/avatar.svg",
    },
    serviceTitle: "Révision du budget",
    date: "02-10-2024",
    status: "Terminer",
    amount: "60€",
  },
  {
    id: "00010",
    provider: {
      name: "William RODRIGUEZ",
      image: "/avatar.svg",
    },
    serviceTitle: "Révision du budget",
    date: "02-10-2024",
    status: "Terminer",
    amount: "60€",
  },
  {
    id: "00011",
    provider: {
      name: "William RODRIGUEZ",
      image: "/avatar.svg",
    },
    serviceTitle: "Révision du budget",
    date: "02-10-2024",
    status: "Terminer",
    amount: "60€",
  },
  
];

const UserPlincs = () => {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = React.useState('');

  return (
    <div className="rounded-2xl p-2">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-8">
          <button
            className="px-4 py-2 text-base text-blue border-b-2 border-blue font-medium relative after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-blue"
          >
            Achetés
          </button>
          <button
            onClick={() => router.push('plincs/vendus')}
            className="px-4 py-2 text-base text-neutral-medium font-medium hover:text-neutral-high transition-colors"
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
      <DataTable columns={columns} data={mockData} />
    </div>
  );
};

export default UserPlincs;
