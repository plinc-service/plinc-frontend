"use client";

import { DataTable } from "@/components/users/data-table";
import { columns, type Plinc } from "./columns";

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
  }
];

const UserPlincs = () => {
  return (
    <div className="rounded-2xl p-5">
      <div className="flex items-center justify-between mb-4">
        <div className="flex gap-4">
          <button className="px-4 py-2 text-sm text-blue border-b-2 border-blue">
            Achetés
          </button>
          <button className="px-4 py-2 text-sm text-neutral-high">
            Vendus
          </button>
        </div>
      </div>
      <DataTable columns={columns} data={mockData} />
    </div>
  );
};

export default UserPlincs;
