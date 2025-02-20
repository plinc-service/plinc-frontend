"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { ChevronRight } from "lucide-react";
import UserPlincs from "../components/UserPlincs";
import UserHeader from "../components/UserHeader";
import UserHeaderSkeleton from "../components/skeletons/UserHeaderSkeleton";
import { fetchUserById } from "@/services/UserService";
import type { User } from "@/interfaces/userInterface";
import { Skeleton } from "@/components/ui/Skeleton";

function Page() {
  const params = useParams();
  const userId = params.userId as string;
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        setLoading(true);
        const userData = await fetchUserById(userId);
        setUser(userData);
      } catch (err) {
        console.error("Error fetching user:", err);
        setError("Failed to load user data");
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [userId]);

  if (loading) {
    return (
      <div className="space-y-6 px-2 mx-5 mt-4">
        <div className="flex items-center gap-2 text-sm">
          <Skeleton className="h-4 w-[80px]" />
          <ChevronRight className="h-4 w-4 text-neutral-high" />
          <Skeleton className="h-4 w-[120px]" />
          <ChevronRight className="h-4 w-4 text-neutral-high" />
          <Skeleton className="h-4 w-[80px]" />
        </div>

        <div className="bg-white rounded-2xl">
          <UserHeaderSkeleton />
        </div>
      </div>
    );
  }

  if (error || !user) {
    return <div className="p-5 text-red-500">{error || "User not found"}</div>;
  }

  const headerData = {
    username: user.username,
    email: user.email,
    stats: {
      acheter: user.number_plinc_buyer,
      vendeurs: user.number_plinc_seller,
    },
  };

  return (
    <div className="space-y-6 px-2 mx-5 mt-4">
      <div className="flex items-center gap-2 text-sm">
        <Link href="/users" className="text-neutral-high text-base">
          Utilisateurs
        </Link>
        <ChevronRight className="h-4 w-4 text-neutral-high" />
        <Link href={`/users/${userId}`} className="text-neutral-high text-base">
          Détails utilisateur
        </Link>
        <ChevronRight className="h-4 w-4 text-neutral-high" />
        <span className="text-blue text-base">User PlinC</span>
      </div>

      <div className="bg-white rounded-2xl">
        <UserHeader user={headerData} />
        <UserPlincs />
      </div>
    </div>
  );
}

export default Page;
