import { use } from "react";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import UserHeader from "../../components/UserHeader";
import UserPlincsVendus from "../../components/UserPlincsVendus";

interface PageProps {
  params: Promise<{
    userId: string;
  }>;
}

export default function Page({ params }: PageProps) {
  const { userId } = use(params);

  // Dans une vraie application, ces données viendraient d'une API
  const user = {
    username: "John DOE",
    email: "johndoe@gmail.com",
    stats: {
      acheter: 5,
      vendeurs: 2,
    },
  };

  return (
    <div className="space-y-6 p-5">
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

      <div className="bg-white rounded-2xl p-5">
        <UserHeader user={user} />
        <UserPlincsVendus />
      </div>
    </div>
  );
}
