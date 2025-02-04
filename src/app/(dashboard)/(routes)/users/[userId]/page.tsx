"use client";

import Link from "next/link";
import { ChevronRight } from "lucide-react";
import UserProfile from "./components/UserProfile";
import UserServices from "./components/UserServices";
import UserRevenue from "./components/UserRevenue";
import UserTransactions from "./components/UserTransactions";

interface UserDetailsProps {
  params: {
    userId: string;
  };
}

const UserDetailsPage: React.FC<UserDetailsProps> = () => {
  const user = {
    id: "#3324553",
    username: "John DOE",
    email: "johndoe@gmail.com",
    company: "PlinC",
    profession: "Technicien",
    phone: "10 12 12 30 30",
    city: "Paris",
    address: "23 Rue des lias",
    siret: "123 456 789 00012",
    iban: "1234 5678 9012 3456 7890 189",
    stats: {
      acheter: 5,
      vendeurs: 2,
    },
    revenue: {
      current: 280,
      total: 1000,
    },
  };

  return (
    <div className="p-5">
      <div className="flex items-center gap-2 text-sm mb-6">
        <Link href="/users" className="text-neutral-high text-base">
          Utilisateurs
        </Link>
        <ChevronRight className="h-4 w-4 text-neutral-high" />
        <span className="text-blue text-base">Détails utilisateur</span>
      </div>

      <div className="flex gap-4">
        <div className="space-y-6 max-w-[620px]">
          <div className="rounded-2xl">
            <UserProfile user={user} />
          </div>
          <div className="border border-brand-lower rounded-3xl">
            <UserServices />
          </div>
        </div>

        <div className="space-y-6">
          <div className="rounded-2xl">
            <UserRevenue
              current={user.revenue.current}
              total={user.revenue.total}
            />
          </div>
          <div className="rounded-2xl">
            <UserTransactions />
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDetailsPage;
