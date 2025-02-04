import { use } from "react";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import UserPlincs from "../components/UserPlincs";

interface PageProps {
  params: Promise<{
    userId: string;
  }>;
}

const Page = ({ params }: PageProps) => {
  const { userId } = use(params);

  return (
    <div className="space-y-8 mt-6 mx-5">
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

      <UserPlincs />
    </div>
  );
};

export default Page;