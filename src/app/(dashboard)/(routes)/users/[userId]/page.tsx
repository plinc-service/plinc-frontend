"use client";

import Link from "next/link";
import { ChevronRight } from "lucide-react";
import UserProfile from "./components/UserProfile";
import UserServices from "./components/UserServices";
import UserRevenue from "./components/UserRevenue";
import UserTransactions from "./components/UserTransactions";
import { useUser } from "@/hooks/useUser";

import { UserProfileSkeleton } from "./components/skeletons/UserProfileSkeleton";
import { UserServicesSkeleton } from "./components/skeletons/UserServicesSkeleton";
import { UserRevenueSkeleton } from "./components/skeletons/UserRevenueSkeleton";
import { UserTransactionsSkeleton } from "./components/skeletons/UserTransactionsSkeleton";

import { useParams } from "next/navigation";

export default function Page() {
  const params = useParams();
  const userId = params.userId as string;

  const { user, loading, error } = useUser(userId);

  if (loading) {
    return (
      <div className="p-5">
        <div className="flex items-center gap-2 text-sm mb-6">
          <Link href="/users" className="text-neutral-high text-base">
            Utilisateurs
          </Link>
          <ChevronRight className="h-4 w-4 text-neutral-high" />
          <div className="h-5 w-32 bg-neutral-200 rounded animate-pulse" />
        </div>

        <div className="flex gap-6">
          <div className="w-[620px] flex flex-col space-y-6">
            <div className="bg-white rounded-2xl overflow-hidden">
              <UserProfileSkeleton />
            </div>
            <div className="bg-white rounded-2xl overflow-hidden">
              <UserServicesSkeleton />
            </div>
          </div>

          <div className="flex-1 flex flex-col space-y-6">
            <div className="bg-white rounded-2xl overflow-hidden">
              <UserRevenueSkeleton />
            </div>
            <div className="bg-white rounded-2xl overflow-hidden">
              <UserTransactionsSkeleton />
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-5">
        <div className="text-red-500">Une erreur est survenue : {error}</div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="p-5">
        <div className="text-neutral-500">Utilisateur non trouvé</div>
      </div>
    );
  }

  return (
    <div className="p-5">
      <div className="flex items-center gap-2 text-sm mb-6">
        <Link href="/users" className="text-neutral-high text-base">
          Utilisateurs
        </Link>
        <ChevronRight className="h-4 w-4 text-neutral-high" />
        <span className="text-blue text-base">Détails utilisateur</span>
      </div>

      <div className="flex gap-6">
        <div className="w-[620px] flex flex-col space-y-6">
          <div className="bg-white rounded-2xl overflow-hidden">
            <UserProfile user={user} />
          </div>
          <div className="bg-white rounded-2xl overflow-hidden">
            <UserServices />
          </div>
        </div>

        <div className="flex-1 flex flex-col space-y-6">
          <div className="bg-white rounded-2xl overflow-hidden">
            <UserRevenue />
          </div>
          <div className="bg-white rounded-2xl overflow-hidden">
            <UserTransactions />
          </div>
        </div>
      </div>
    </div>
  );
};


